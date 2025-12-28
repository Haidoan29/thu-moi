import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyA2gJDrHafaJKtkIEwwwlpLiGMKjCbFzyo",
  authDomain: "web-tempalte.firebaseapp.com",
  projectId: "web-tempalte",
  storageBucket: "web-tempalte.appspot.com",
  messagingSenderId: "395001912754",
  appId: "1:395001912754:web:29658224f21f987d57d8ab"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
