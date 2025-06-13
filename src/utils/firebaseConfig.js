// utils/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCmYiSucTeGCisSJ2rbQP6kNCPx5oyyk0o",
  authDomain: "ai-disease-predictor1-d2cd4.firebaseapp.com",
  projectId: "ai-disease-predictor1-d2cd4",
  storageBucket: "ai-disease-predictor1-d2cd4.appspot.com", // ✅ must end in .appspot.com
  messagingSenderId: "543943962657",
  appId: "1:543943962657:web:505d61e9a7b2a4513bf360"
};

// ✅ Initialize Firebase and Storage
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
