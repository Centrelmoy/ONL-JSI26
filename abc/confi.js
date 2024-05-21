import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDVYlTGCW7y4OiMnhUP30NgxwXAtGSbQjA",
  authDomain: "onl-jsi26.firebaseapp.com",
  projectId: "onl-jsi26",
  storageBucket: "onl-jsi26.appspot.com",
  messagingSenderId: "1083840212072",
  appId: "1:1083840212072:web:cf57506f2cc61aaf12dfdd",
  measurementId: "G-WH1HFCM2XK",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
