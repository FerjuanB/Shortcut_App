import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore/lite";

export const firebaseConfig = {
  apiKey: "AIzaSyDsXCH5fKgl9Lc45Cr8hEoVyTw8OQs7G00",
  authDomain: "fir-learn-e247f.firebaseapp.com",
  projectId: "fir-learn-e247f",
  storageBucket: "fir-learn-e247f.appspot.com",
  messagingSenderId: "800753712329",
  appId: "1:800753712329:web:ba077b6bc50ae6b6922118"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)