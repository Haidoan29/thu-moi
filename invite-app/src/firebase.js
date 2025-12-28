// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2gJDrHafaJKtkIEwwwlpLiGMKjCbFzyo",
  authDomain: "web-tempalte.firebaseapp.com",
  projectId: "web-tempalte",
  storageBucket: "web-tempalte.firebasestorage.app",
  messagingSenderId: "395001912754",
  appId: "1:395001912754:web:29658224f21f987d57d8ab",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

