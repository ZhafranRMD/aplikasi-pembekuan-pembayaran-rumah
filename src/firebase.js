import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp
} from "firebase/firestore";

// Konfigurasi Baku Firebase Firestore: D:\devproject\configuration\Firebasefirestore.txt
export const firebaseConfig = {
  apiKey: "AIzaSyCJp4hqii2wB7iKSyHUsBF05WtVKprZEEg",
  authDomain: "zhafran-firebase.firebaseapp.com",
  projectId: "zhafran-firebase",
  storageBucket: "zhafran-firebase.firebasestorage.app",
  messagingSenderId: "47163102320",
  appId: "1:47163102320:web:dd8e6228507bf26d3fd0b5"
};

// Inisialisasi Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Inisialisasi Firestore dengan Offline Persistent Cache & Multi-Tab Support (Hemat Kuota)
let dbInstance = null;
try {
  dbInstance = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager()
    })
  });
} catch (error) {
  console.warn("Firestore persistent cache fallback:", error);
  dbInstance = initializeFirestore(app, {});
}

export const db = dbInstance;

// Standard Root Path Namespace: /apps/pembekuan-rumah/{collectionName}
export const APP_ID = "pembekuan-rumah";
export const FREEZE_COLLECTION = `apps/${APP_ID}/pengajuan`;
export const SETTINGS_DOC = `apps/${APP_ID}/config/general`;

export {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp
};
