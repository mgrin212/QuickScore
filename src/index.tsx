/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import App from "./App";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWF6dZp4JBF0wIHPyVqOMr_v43TEVG2Zw",
  authDomain: "quickscore-f3702.firebaseapp.com",
  projectId: "quickscore-f3702",
  storageBucket: "quickscore-f3702.appspot.com",
  messagingSenderId: "16868751480",
  appId: "1:16868751480:web:6046a5c2b388179969158d",
  measurementId: "G-041MKWLFTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

render(() => <App />, document.getElementById("root") as HTMLElement);
