import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAkm6NSUsOV1G0Fr_ZaAT68Xc5Do4Z2bVM",
  authDomain: "ai-mediclaim.firebaseapp.com",
  projectId: "ai-mediclaim",
  storageBucket: "ai-mediclaim.appspot.com",
  messagingSenderId: "714497089071",
  appId: "1:714497089071:web:xxxxxxxxxxxxx"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
