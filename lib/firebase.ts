import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "Your-api-key",
  authDomain: "threeangle-studio.firebaseapp.com",
  projectId: "threeangle-studio",
  storageBucket: "Your-storage-Bucket",
  messagingSenderId: "427088620543",
  appId: "1:427088620543:web:e5c275e28c4a0ed48c55ca",
  measurementId: "G-31T0EKZL8B",
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)
const db = getFirestore(app)

export { db, auth }

