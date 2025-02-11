import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAerrzTDyyHkcJHnw48L7KIwBokDIoOl9s",
  authDomain: "threeangle-studio.firebaseapp.com",
  projectId: "threeangle-studio",
  storageBucket: "threeangle-studio.firebasestorage.app",
  messagingSenderId: "427088620543",
  appId: "1:427088620543:web:e5c275e28c4a0ed48c55ca",
  measurementId: "G-31T0EKZL8B",
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)
const db = getFirestore(app)

export { db, auth }

