// import React, { useEffect, useState } from 'react';
// import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
// import { AuthContext } from './AuthContext';
// import { auth } from './firebase.config';

// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setloading] = useState(true);


//     const createUser = (email, password) => {
//         return createUserWithEmailAndPassword(auth, email, password);
//     };

//     const signinuser = (email, password) => {
//         return signInWithEmailAndPassword(auth, email, password);
//     };

//     const PasswordReset = (email) => {
//         return sendPasswordResetEmail(auth, email);

//     };

//     const userinfo = {
//         user,
//         loading,
//         createUser,
//         signinuser,
//         PasswordReset,
//     };

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (authUser) => {
//             setUser(authUser);
//             setloading(false);
//         });
//         return () => {
//             unsubscribe();
//         };
//     }, []);

//     return (
//         <AuthContext.Provider value={userinfo}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;


// new code // 

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


const googleProvider = new GoogleAuthProvider(); // NEW

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Renamed from setloading for consistency

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signinuser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
        .finally(() => setLoading(false));
    };

    const googleSignIn = () => { // NEW - for social login
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
        .finally(() => setLoading(false));
    };

    const updateUserProfile = (name, photoURL) => { // NEW - for updating display name/photo
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        });
    };

    const logOut = () => { // NEW - for logout functionality
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
        googleSignIn,   // NEW
        updateUserProfile, // NEW
        logOut,         // NEW
        PasswordReset,
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
            setLoading(false); // Use setLoading
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