// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQoswg5pqvXxkQPN46P-kxCKSB88oVHmI",
  authDomain: "recruiter-8f03d.firebaseapp.com",
  projectId: "recruiter-8f03d",
  storageBucket: "recruiter-8f03d.appspot.com",
  messagingSenderId: "663716924177",
  appId: "1:663716924177:web:b1fc739e959cca4f7a1ab0",
  measurementId: "G-3MD646XDDR",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
