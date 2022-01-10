import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyCb39kpSllCoZBJqdJ28Phi6k4i5KDVAss",
    authDomain: "ecommerce-udemy-25f39.firebaseapp.com",
    projectId: "ecommerce-udemy-25f39",
    storageBucket: "ecommerce-udemy-25f39.appspot.com",
    messagingSenderId: "913498943843",
    appId: "1:913498943843:web:2e5052213fa414667ea356",
    measurementId: "G-TR51Y30ZJB"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            })
        } catch (error) {
            console.log('error create user', error.message);
        }
    }

    return userRef;
}

export default firebase;