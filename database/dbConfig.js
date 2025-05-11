import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCQhxnDhU5Phc0hXDympkxRr31j9Ova3nI",
    authDomain: "skillswap-44c4a.firebaseapp.com",
    projectId: "skillswap-44c4a",
    storageBucket: "skillswap-44c4a.firebasestorage.app",
    messagingSenderId: "1044264480545",
    appId: "1:1044264480545:web:678075e82223f9d55a9860"
  };

  // Initialize Firebase
export const app = initializeApp(firebaseConfig);
export  const db = getFirestore(app);

