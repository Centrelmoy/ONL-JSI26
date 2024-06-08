import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDyM_6rhocBcbPZXO2xzl9P2_O5v26I6cA",
  authDomain: "blalala-b2e6a.firebaseapp.com",
  projectId: "blalala-b2e6a",
  storageBucket: "blalala-b2e6a.appspot.com",
  messagingSenderId: "1013736602529",
  appId: "1:1013736602529:web:8a2bfd0dda99eb04b7e9e0",
  measurementId: "G-1PKEWYRE38"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

