// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDVfel4D_2IdnjF2chaJHha80R0ydOeabU",
    authDomain: "vite-contact-c4c22.firebaseapp.com",
    projectId: "vite-contact-c4c22",
    storageBucket: "vite-contact-c4c22.appspot.com",
    messagingSenderId: "1024114277208",
    appId: "1:1024114277208:web:2da6d0f8d324f7071a832d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);