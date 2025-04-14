import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBa9bmYo-HjX1aGWcF3m2YDZbH995hFi0A",
  authDomain: "afk-dev-8cc2f.firebaseapp.com",
  projectId: "afk-dev-8cc2f",
  storageBucket: "afk-dev-8cc2f.firebasestorage.app",
  messagingSenderId: "512716650001",
  appId: "1:512716650001:web:5432350c763f65a2f323b0",
  measurementId: "G-R1JEN7SE7K",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);

export { db, auth };
