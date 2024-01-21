import { API_BASE_URL } from "./config";
export async function sendRequest(url, options = {}) {
    const defaultHeaders = {
        "Content-Type": "application/json",
    };

    const headers = { ...defaultHeaders, ...options.headers };
    const fetchOptions = {
        method: options.method || "GET",
        headers,
        credentials: "include",
        body: options.body ? JSON.stringify(options.body) : undefined,
    };

    try {
        const response = await fetch(API_BASE_URL + url, fetchOptions);

        const responseBody = await response.text();
        const contentType = response.headers.get("content-type");

        if (!response.ok) {
            // Handle non-OK responses without throwing an error
            console.error(`HTTP error! status: ${response.status}`, responseBody);
            return { success: false, error: `HTTP error! status: ${response.status}`, data: null };
        }

        if (!contentType || !contentType.includes("application/json")) {
            console.error("Non-JSON response received", responseBody);
            return { success: false, error: `Expected JSON, received ${contentType}`, data: null };
        }

        // If the response is okay and is JSON, return the parsed JSON
        return JSON.parse(responseBody); } catch (error) {
        // Handle fetch errors (network issues, etc.)
        console.error("Request error:", error);
        return { success: false, error: error.message, data: null };
    }
}





// import { API_BASE_URL } from "./config";
// export async function sendRequest(url, options = {}) {
//   // Define default headers
//   const defaultHeaders = {
//     "Content-Type": "application/json",
//   };
//   console.log(url, options);
//   // Merge custom headers with default heaaders
//   const headers = { ...defaultHeaders, ...options.headers };

//   // Construct the final fetch options
//   const fetchOptions = {
//     method: options.method || "GET",
//     headers,
//     credentials: "include",
//     body: options.body ? JSON.stringify(options.body) : undefined,
//   };
//   console.log(fetchOptions);
//   try {
//     const response = await fetch(API_BASE_URL + url, fetchOptions);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       const errorText = await response.text();
//       console.error("Non-JSON response received", errorText);
//       throw new Error(`Expected JSON, received ${contentType}`);
//     }

//     const responseBody = await response.text();
//     console.log(JSON.parse(responseBody));
//     return JSON.parse(responseBody);
//   } catch (error) {
//     console.error("Request error:", error);
//     throw error;
//   }
// }