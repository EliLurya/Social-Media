import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./Firebase-config";

const uploadImage = (file, onProgress) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `images/${encodeURIComponent(file.name)}`);
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
