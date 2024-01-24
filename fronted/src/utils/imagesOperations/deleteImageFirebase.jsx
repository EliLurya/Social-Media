import { ref, deleteObject } from "firebase/storage";
import { storage } from "./Firebase-config";

export const deleteImageFirebase = async (imagePath, refreshFirebaseToken) => {
  if (!imagePath) {
    console.error("Invalid image path:", imagePath);
    return;
  }

  // Create a reference to the file to delete
  const imageRef = ref(storage, imagePath);

  try {
    // Refresh Firebase token before attempting to delete the image
    await refreshFirebaseToken();

    // Delete the file
    await deleteObject(imageRef);
    console.log("Image deleted successfully");
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};
