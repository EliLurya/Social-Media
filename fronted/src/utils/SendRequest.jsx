import { API_BASE_URL } from "./config";
export async function sendRequest(url, options = {}) {
  // Define default headers
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  // Merge custom headers with default heaaders
  const headers = { ...defaultHeaders, ...options.headers };

  // Construct the final fetch options
  const fetchOptions = {
    method: options.method || "GET",
    headers,
    credentials: "include", 
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  try {
    const response = await fetch(API_BASE_URL + url, fetchOptions);
    const responseBody = await response.text();
    const responseData = responseBody ? JSON.parse(responseBody) : {};

    return await responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
