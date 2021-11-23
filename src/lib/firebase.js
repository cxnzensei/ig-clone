import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";
import "firebase/compat/auth";
import config from "../config";
import { getFirestore } from "firebase/firestore";

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
const auth = Firebase.auth();
const storage = getStorage();
const db = getFirestore();

export { auth, firebase, FieldValue, storage, db };
