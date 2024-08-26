import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_rVEn4ImOdNFGoUPNCj-UrXE3tygWIEY",
  authDomain: "golden-bee-651eb.firebaseapp.com",
  databaseURL:
    "https://golden-bee-651eb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "golden-bee-651eb",
  storageBucket: "golden-bee-651eb.appspot.com",
  messagingSenderId: "616914078130",
  appId: "1:616914078130:web:602db051750307802ebcab",
  measurementId: "G-NWK8EZ7GQX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
