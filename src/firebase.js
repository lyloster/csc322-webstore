// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpvZoJEw03b00kjzNt_VK2azot1hWlcb4",
  authDomain: "csc322-website.firebaseapp.com",
  databaseURL: "https://csc322-website-default-rtdb.firebaseio.com",
  projectId: "csc322-website",
  storageBucket: "csc322-website.appspot.com",
  messagingSenderId: "494618185549",
  appId: "1:494618185549:web:21b8e1db310c7851e7b104"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
