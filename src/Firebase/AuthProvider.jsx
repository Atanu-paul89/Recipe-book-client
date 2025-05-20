import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth } from './firebase.config';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(true);


    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signinuser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const PasswordReset = (email) => {
        return sendPasswordResetEmail(auth, email);

    };

    const userinfo = {
        user,
        loading,
        createUser,
        signinuser,
        PasswordReset,
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
            setloading(false);
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

