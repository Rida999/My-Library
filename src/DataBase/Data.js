import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA9QNqVQWXNZttqd-CuN19VVHEgOq3ElxE",
    authDomain: "my-library-2000.firebaseapp.com",
    projectId: "my-library-2000",
    storageBucket: "my-library-2000.appspot.com",
    messagingSenderId: "79233261202",
    appId: "1:79233261202:web:6d93a8c1a87fa8dd26504b"
  };

const app=initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const db=getFirestore(app);
export const storage=getStorage(app);
export const storage_bucket=storage;
