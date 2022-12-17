import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyD0HNHBA8ZH2Af_9JF8xs-6baqBas7kzlk',
	authDomain: 'kasachat-64199.firebaseapp.com',
	projectId: 'kasachat-64199',
	storageBucket: 'kasachat-64199.appspot.com',
	messagingSenderId: '950767583185',
	appId: '1:950767583185:web:bc98c0431b43d2300eaaf0',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
