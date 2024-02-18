import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: 'AIzaSyAAWTjGKl-ECx0NIOmP25y7kfk355zWpL8',
  authDomain:'quickhire-auth.firebaseapp.com',
  projectId:'quickhire-auth',
  storageBucket: 'quickhire-auth.appspot.com',
  messagingSenderId: '139664479415',
  appId:'1:139664479415:web:f020f4eebf74494a432932'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
