import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./Firebase-config";

const uploadImage = async (file, onProgress, refreshFirebaseToken) => {
  await refreshFirebaseToken();

  return new Promise((resolve, reject) => {
    const uniqueFileName = `images/${Date.now()}-${file.name}`;
    const storageRef = ref(storage, uniqueFileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Calculate the upload progress
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress);
      },
      (error) => {
        console.error("Error in uploadImage function:", error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
      }
    );
  });
};

export default uploadImage;
