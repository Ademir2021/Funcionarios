import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // ← FALTAVA ISSO

const firebaseConfig = {
  apiKey: "AIzaSyB_oBjO3JR3Lr3uzwdnAXt1M0hrGBtfh20",
  authDomain: "colaboradores-d4751.firebaseapp.com",
  databaseURL: "https://colaboradores-d4751-default-rtdb.firebaseio.com",
  projectId: "colaboradores-d4751",
  storageBucket: "colaboradores-d4751.firebasestorage.app",
  messagingSenderId: "316652119255",
  appId: "1:316652119255:web:358becaeae6b2858fcbc92",
  measurementId: "G-KLNS8NKNK6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db, analytics };