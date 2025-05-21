// import React, { useContext, useState } from 'react';
// import { Link, useNavigate } from 'react-router'; 
// import { AuthContext } from './AuthContext';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { updateProfile } from 'firebase/auth'; 

// const Register = () => {
//     const { createUser } = useContext(AuthContext);
//     const [errormsge, seterrormsge] = useState("");
//     const navigate = useNavigate();
//     console.log(errormsge);

//     const handleregister = async (e) => {
//         e.preventDefault();
//         const email = e.target.email.value;
//         const password = e.target.password.value;
//         const name = e.target.name.value;
//         const photoURL = e.target.photo.value; 
//         const checked = e.target.checkbox.checked;
//         console.log({ email, password, name, photoURL, checked });

//         createUser(email, password)
//             .then(async (res) => { 
//                 console.log("Registration successful for:", res.user.email);
//                 try {
//                     await updateProfile(res.user, {
//                         displayName: name,
//                         photoURL: photoURL,
//                     });
//                     toast.success('Registration Successful! Profile updated.', { 
//                         position: "top-right",
//                         autoClose: 2000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                         progress: undefined,
//                         theme: "light",
//                         onClose: () => {
//                             navigate('/');
//                         },
//                     });
//                 } catch (updateError) {
//                     console.error("Error updating profile:", updateError);
//                     toast.error('Registration successful, but error updating profile.', { 
//                         position: "top-right",
//                         autoClose: 3000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                         progress: false,
//                         theme: "light",
//                     });
//                     navigate('/');
//                 }
//             })
//             .catch(error => {
//                 console.error("Registration Error:", error);
//                 let errorMessage = "Registration failed";
//                 if (error.code === 'auth/email-already-in-use') {
//                     errorMessage = "This email address is already in use.";
//                 } else if (error.code === 'auth/invalid-email') {
//                     errorMessage = "The email address is not valid.";
//                 } else if (error.code === 'auth/weak-password') {
//                     errorMessage = "The password is too weak. Please choose a stronger password.";
//                 } else {
//                     errorMessage = "An unexpected error occurred during registration. Please try again later.";
//                 }
//                 toast.error(errorMessage, {
//                     position: "top-right",
//                     autoClose: 3000, 
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: false,
//                     theme: "light",
//                 });
//                 seterrormsge(errorMessage);
//             });
//     };

//     return (
//         <div className="bg-gray-900  bg-[url('https://images.unsplash.com/photo-1692197275441-40c874f40385?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center h-screen flex justify-start md:justify-end items-center font-sans">
//             <div className="bg-white/10 rounded-xl mr-8 md:mr-10 shadow-lg backdrop-filter backdrop-blur-md border border-white/30 py-6 lg:px-10 md:px-8 px-6   w-96 max-w-md text-center mx-8">
//                 <h2 className="text-3xl font-bold text-[#804AC4] mb-4">Register</h2>
//                 <form onSubmit={handleregister}>
//                     <input
//                         type="text"
//                         name="name"
//                         placeholder="Full Name"
//                         className="bg-white/20 border border-white/50 rounded-lg font-bold py-3 px-4 mb-4 w-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#A85CCD]"
//                         required
//                     />
//                     <input
//                         type="url"
//                         name="photo"
//                         placeholder="photo url"
//                         className="bg-white/20 border border-white/50 rounded-lg font-bold py-3 px-4 mb-4 w-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#A85CCD]"
//                         required
//                     />
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         className="bg-white/20 border border-white/50 rounded-lg py-3 px-4 mb-4 w-full text-white font-bold placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#A85CCD]"
//                         required
//                     />
//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Password"
//                         className="bg-white/20 border border-white/50 rounded-lg py-3 px-4 font-bold mb-4 w-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#A85CCD]"
//                         required
//                     />
//                     <div className='flex gap-2 items-center mb-2 '>
//                         <input type="checkbox" name="checkbox" required />
//                         <label className="text-[#804AC4] font-semibold text-sm">Accept Terms & Condition</label>
//                     </div>

//                     <button
//                         type="submit"
//                         className="bg-[#804AC4] hover:bg-[#A85CCD] text-white font-bold py-3 px-6 rounded-lg w-full focus:outline-none focus:shadow-outline"
//                     >
//                         Register
//                     </button>
//                 </form>
//                 <p className="mt-3 text-white text-sm font-semibold">
//                     Already have an account?
//                     <Link to="/login" className="text-[#2F24AD] hover:underline ml-1">
//                         Login
//                     </Link>
//                 </p>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default Register;


import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router'; // Changed to react-router-dom for useNavigate/Link consistency
import { AuthContext } from './AuthContext'; // Ensure this path is correct relative to Register.jsx
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfile } from 'firebase/auth';

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const [errormsge, seterrormsge] = useState(""); // State to hold validation/Firebase errors
    const navigate = useNavigate();
    // console.log(errormsge); // You can keep this for debugging if needed

    const handleregister = async (e) => {
        e.preventDefault();
        // Clear previous error messages before new validation
        seterrormsge("");

        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photoURL = e.target.photo.value;
        const checked = e.target.checkbox.checked;
        console.log({ email, password, name, photoURL, checked });

        // --- Password Validation ---
        // At least one uppercase letter
        const hasUppercase = /[A-Z]/.test(password);
        // At least one lowercase letter
        const hasLowercase = /[a-z]/.test(password);
        // At least one special character (using common special characters)
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
        // Length must be at least 8 characters
        const isLongEnough = password.length >= 8;

        if (!hasUppercase) {
            seterrormsge('Password must contain at least one uppercase letter.');
            toast.error('Password must contain at least one uppercase letter.', { theme: "dark" }); // Use toast for immediate feedback
            return; // Stop form submission
        }
        if (!hasLowercase) {
            seterrormsge('Password must contain at least one lowercase letter.');
            toast.error('Password must contain at least one lowercase letter.', { theme: "dark" });
            return; // Stop form submission
        }
        if (!hasSpecialChar) {
            seterrormsge('Password must contain at least one special character (e.g., !@#$%^&*).');
            toast.error('Password must contain at least one special character (e.g., !@#$%^&*).', { theme: "dark" });
            return; // Stop form submission
        }
        if (!isLongEnough) {
            seterrormsge('Password must be at least 8 characters long.');
            toast.error('Password must be at least 8 characters long.', { theme: "dark" });
            return; // Stop form submission
        }
        if (!checked) {
            seterrormsge('You must accept the terms and conditions to register.');
            toast.error('You must accept the terms and conditions to register.', { theme: "dark" });
            return;
        }
        // --- End Password Validation ---


        try {
            const res = await createUser(email, password);
            console.log("Registration successful for:", res.user.email);

            // Update profile with name and photoURL
            await updateProfile(res.user, {
                displayName: name,
                photoURL: photoURL,
            });

            toast.success('Registration Successful! Profile updated. Redirecting...', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark", // Changed to dark theme for consistency
                onClose: () => {
                    navigate('/');
                },
            });

        } catch (error) {
            console.error("Registration Error:", error);
            let errorMessage = "An unexpected error occurred during registration. Please try again later.";
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "This email address is already in use.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "The email address is not valid.";
            } else if (error.code === 'auth/weak-password') {
                // This error might still occur if Firebase has its own password policy
                // and the client-side validation wasn't strict enough or Firebase's is stricter.
                errorMessage = "The password is too weak. Please choose a stronger password.";
            }
            seterrormsge(errorMessage); // Set the error message for display below input
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: false,
                theme: "dark", // Changed to dark theme for consistency
            });
        }
    };

    return (
        <div className="bg-gray-900 bg-[url('https://images.unsplash.com/photo-1692197275441-40c874f40385?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center h-screen flex justify-start md:justify-end items-center font-sans">
            <div className="bg-white/10 rounded-xl mr-8 md:mr-10 shadow-lg backdrop-filter backdrop-blur-md border border-white/30 py-6 lg:px-10 md:px-8 px-6 w-96 max-w-md text-center mx-8">
                <h2 className="text-3xl font-bold text-[#804AC4] mb-4">Register</h2>
                <form onSubmit={handleregister}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="bg-white/20 border border-white/50 rounded-lg font-bold py-3 px-4 mb-4 w-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#A85CCD]"
                        required
                    />
                    <input
                        type="url"
                        name="photo"
                        placeholder="photo url"
                        className="bg-white/20 border border-white/50 rounded-lg font-bold py-3 px-4 mb-4 w-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#A85CCD]"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="bg-white/20 border border-white/50 rounded-lg py-3 px-4 mb-4 w-full text-white font-bold placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#A85CCD]"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="bg-white/20 border border-white/50 rounded-lg py-3 px-4 font-bold mb-2 w-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#A85CCD]"
                        required
                    />
                    {/* Display password validation error here */}
                    {errormsge && (
                        <p className="text-red-400 text-sm mb-4">{errormsge}</p>
                    )}

                    <div className='flex gap-2 items-center mb-2 '>
                        <input type="checkbox" name="checkbox" required />
                        <label className="text-[#804AC4] font-semibold text-sm">Accept Terms & Condition</label>
                    </div>

                    <button
                        type="submit"
                        className="bg-[#804AC4] hover:bg-[#A85CCD] text-white font-bold py-3 px-6 rounded-lg w-full focus:outline-none focus:shadow-outline"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-3 text-white text-sm font-semibold">
                    Already have an account?
                    <Link to="/login" className="text-[#2F24AD] hover:underline ml-1">
                        Login
                    </Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
