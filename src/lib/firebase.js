import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";

const config = {
	apiKey: "AIzaSyBjQynIJfbg2cnlWqJzSfalwbSJsSke6n8",
	authDomain: "finstagram-82ec3.firebaseapp.com",
	projectId: "finstagram-82ec3",
	storageBucket: "finstagram-82ec3.appspot.com",
	messagingSenderId: "813946363613",
	appId: "1:813946363613:web:b219099cbc478d7e820534",
	measurementId: "G-8RT62BPCKV",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
const auth = Firebase.auth();
const storage = getStorage();
const db = getFirestore();

export { auth, firebase, FieldValue, storage, db };
