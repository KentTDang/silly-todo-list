import { initializeApp } from "firebase/app";
import * as firebaseConfig from "./.firebase.json";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);

export default app; 
export const firestore = getFirestore(app);