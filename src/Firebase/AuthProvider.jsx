import React, { useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    GoogleAuthProvider, 
    signInWithPopup,    
    signOut,            
    updateProfile       
} from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth } from './firebase.config';


const googleProvider = new GoogleAuthProvider(); 

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
        .finally(() => setLoading(false));
    };

    const signinuser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
        .finally(() => setLoading(false));
    };

    const googleSignIn = () => { 
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
        .finally(() => setLoading(false));
    };

    const updateUserProfile = (name, photoURL) => { 
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        });
    };

    const logOut = () => { 
        setLoading(true);
        return signOut(auth);
    };

    const PasswordReset = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    const userinfo = {
        user,
        loading,
        createUser,
        signinuser,
        googleSignIn,   
        updateUserProfile, 
        logOut,         
        PasswordReset,
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
            setLoading(false); 
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={userinfo}>     
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;