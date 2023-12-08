// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQYeYeQyZbZw1ZiSwjYAApN-WMGWjvrwQ",
  authDomain: "social-media-34ad7.firebaseapp.com",
  projectId: "social-media-34ad7",
  storageBucket: "social-media-34ad7.appspot.com",
  messagingSenderId: "881271366118",
  appId: "1:881271366118:web:4f7a5dcb68a6d8ae8f3627",
  measurementId: "G-09XYW6M3GT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage and get a reference to the service
const storage = getStorage(app);
console.log(storage);
export { storage };
