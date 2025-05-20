import React, { useState, useContext } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router';
import { AuthContext } from './AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from './firebase.config';


const Login = () => {
    const { signinuser, PasswordReset } = useContext(AuthContext);
    const [errormsge, seterrormsge] = useState("");
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
    const [resetEmail, setResetEmail] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password, errormsge);
        signinuser(email, password)
            .then(res => {
                console.log("login done", res.user.email);
                toast.success('Login Successful!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    onClose: () => {
                        navigate('/');
                    },
                });
            })
            .catch(error => {
                console.error("Login Error:", error);
                let errorMessage = "Login failed";
                if (error.code === 'auth/user-not-found') {
                    errorMessage = "User not found. Please check your email.";
                } else if (error.code === 'auth/wrong-password') {
                    errorMessage = "Incorrect password. Please try again.";
                } else if (error.code === 'auth/invalid-credential') {
                    errorMessage = "Invalid login credentials. Please check your email and password.";
                } else {
                    errorMessage = "An unexpected error occurred. Please try again later.";
                }
                toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: false,
                    theme: "light",
                });
                seterrormsge(errorMessage);
            });
    };

    const handlegooglesignin = () => {
        signInWithPopup(auth, provider)
            .then(res => {
                console.log(res);
                toast.success('Login with Google Successful!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    onClose: () => {
                        navigate('/');
                    },
                });
            })
            .catch(error => {
                console.log(error);
                let errorMessage = "Google sign-in failed.";
                if (error.code === 'auth/popup-closed-by-user') {
                    errorMessage = "Google sign-in was cancelled by the user.";
                } else if (error.code === 'auth/network-request-failed') {
                    errorMessage = "Network error during Google sign-in. Please check your connection.";
                } else {
                    errorMessage = error.message;
                }
                toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: false,
                    theme: "light",
                });
            });
    };

    const openForgotPasswordModal = () => {
        setIsForgotPasswordModalOpen(true);
    };

    const closeForgotPasswordModal = () => {
        setIsForgotPasswordModalOpen(false);
        setResetEmail('');
    };

    const handleResetPassword = () => {
        if (!resetEmail) {
            toast.error('Please enter your email address.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        PasswordReset(resetEmail) 
            .then(() => {
                toast.success('Password reset email sent! Please check your inbox.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                closeForgotPasswordModal();
            })
            .catch((error) => {
                toast.error(`Failed to send reset email: ${error.message}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
    };

    return (
        <div className="bg-gray-900 mb-0  mt-0  bg-[url('https://plus.unsplash.com/premium_photo-1669557209110-34d9a507d1f9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center h-screen flex justify-center md:justify-end items-center font-sans">
            <div className="bg-white/10 rounded-xl mr-8 lg:mr-10 shadow-lg backdrop-filter backdrop-blur-md border border-white/30 p-5 md:p-10 w-96 max-w-md text-center mx-8">
                <h2 className="text-3xl font-bold text-[#804AC4] mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="bg-white/20 border border-white/50 rounded-lg py-3 px-4 mb-4 w-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#A85CCD] font-bold"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="bg-white/20 border border-white/50 rounded-lg py-3 px-4 mb-4 w-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#A85CCD] font-bold"
                        required
                    />
                    <div className="flex justify-start mb-4 text-sm text-gray-300">
                        <button type="button" onClick={openForgotPasswordModal} className="hover:underline text-[#804AC4] focus:outline-none cursor-pointer">
                            Forgot Password?
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="bg-[#804AC4] hover:bg-[#A85CCD] text-white cursor-pointer font-bold py-3 px-6 rounded-lg w-full focus:outline-none focus:shadow-outline"
                    >
                        Login
                    </button>

                    <button onClick={handlegooglesignin} className='mt-2 justify-center cursor-pointer flex gap-1 items-center bg-[#804AC4] hover:bg-[#A85CCD] text-white font-bold py-3 px-6 rounded-lg w-full focus:outline-none focus:shadow-outline '><FcGoogle size={24} />Login with Google</button>
                </form>
                <p className="mt-3 text-white text-sm font-semibold">
                    Don't have an account?
                    <Link to="/register" className="text-[#804AC4] hover:underline ml-1">
                        Register
                    </Link>
                </p>
            </div>
            {/* Forgot Password Modal */}
            {isForgotPasswordModalOpen && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-8 shadow-lg z-50">
                    <h2 className="text-xl font-bold mb-4 text-[#804AC4]">Reset Password</h2>
                    <p className="mb-4 text-gray-700">Enter your email address to receive a password reset link.</p>
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                    />
                    <div className="flex justify-end gap-4">
                        <button onClick={closeForgotPasswordModal} className="btn bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Cancel
                        </button>
                        <button onClick={handleResetPassword} className="btn bg-[#804AC4] hover:bg-[#A85CCD] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Send Reset Email
                        </button>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default Login;











