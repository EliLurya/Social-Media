import { ref, deleteObject } from "firebase/storage";
import { storage } from "./Firebase-config";

export const deleteImageFirebase = async (imagePath) => {
  const imageRef = ref(storage, imagePath);
  console.log(imageRef + "imageRef");
  try {
    await deleteObject(imageRef);
    console.log("Image deleted successfully");
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};
