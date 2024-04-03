// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTiQm1655XwxiX8w3kF9K6FcMRdHshuis",
  authDomain: "blog-mern-765e3.firebaseapp.com",
  projectId: "blog-mern-765e3",
  storageBucket: "blog-mern-765e3.appspot.com",
  messagingSenderId: "215476637804",
  appId: "1:215476637804:web:397209f6c8af9dafb10849"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app