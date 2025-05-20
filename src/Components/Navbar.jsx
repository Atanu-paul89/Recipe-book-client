
import React, { useContext, useState } from 'react';
import logo from "/NavLogo.png";
import { NavLink, useNavigate } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../Firebase/AuthContext';
import { auth } from '../Firebase/firebase.config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget to import the CSS!
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    // Common styling for NavLinks
    const linkClasses = ({ isActive }) =>
        `font-bold transition-colors duration-300 ${isActive
            ? 'text-blue-400 border-b-2 border-blue-400' // Brighter blue for active link
            : 'text-gray-300 hover:text-blue-300 hover:border-b-2 hover:border-blue-300' // Lighter gray for inactive, hover effect
        }`;

    const links = (
        <div className='flex flex-col md:flex-row lg:flex-row items-center md:space-x-7 space-y-3 md:space-y-0'>
            <NavLink to={"/"} className={linkClasses}>Home</NavLink>
            <NavLink to={"/allrecipes"} className={linkClasses}>All Recipes</NavLink> {/* Corrected path as per main.jsx */}
            <NavLink to={"/addrecipe"} className={linkClasses}>Add Recipe</NavLink> {/* Corrected path as per main.jsx */}
            <NavLink to={"/myrecipes"} className={linkClasses}>My Recipes</NavLink> {/* Corrected path as per main.jsx */}
        </div>
    );

    const openLogoutModal = () => {
        setIsLogoutModalOpen(true);
    };

    const closeLogoutModal = () => {
        setIsLogoutModalOpen(false);
    };

    const handleLogoutConfirm = async () => {
        try {
            await signOut(auth);
            // toast.success("Logged out successfully!"); 
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user?.displayName || user?.email || 'User'} logged out!`,
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/');
        } catch (error) {
            console.error("Error during logout:", error);
            toast.error("Failed to log out. Please try again."); // Using react-toastify
        }
        closeLogoutModal();
    };

    return (
        <div className="navbar bg-gray-900 text-white py-2 px-4 md:px-8 lg:px-12 h-20 shadow-lg"> {/* Darker background, fixed height, consistent padding */}
            <div className="navbar-start">
                {/* Dropdown for mobile (Hamburger menu) */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg text-gray-200"
                    >
                        {links}
                    </ul>
                </div>
                {/* Website Name/Logo */}
                <NavLink to={"/"} className="flex items-center gap-1 text-2xl font-extrabold text-blue-400">
                    <img src={logo} className='h-16 w-auto' alt="Recipe Book Logo" /> {/* Adjusted image height and removed border */}
                    <span className="hidden md:block"></span> {/* Show text on larger screens [cite: 16] */}
                </NavLink>
            </div>

            {/* Centered navigation links for larger screens */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>

            {/* End section for user/auth buttons */}
            <div className="navbar-end flex items-center">
                {user ? (
                    <div className="flex items-center space-x-3">
                        {/* User Avatar/Dropdown */}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="cursor-pointer flex items-center group">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt="User Avatar" className="w-9 h-9 rounded-full border-2 border-blue-400 object-cover" />
                                ) : (
                                    <FaUserCircle size={36} className="text-blue-400" /> // Larger icon if no photo
                                )}
                                {/* Optional: Tooltip for display name */}
                                <span className="ml-2 text-gray-300 text-sm hidden sm:block group-hover:text-blue-300">
                                    {user.displayName || user.email}
                                </span>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg text-gray-200">
                                <li><p className='font-bold text-blue-300'>Name: {user.displayName || 'N/A'}</p></li> {/* On clicking the avatar show displayName [cite: 18] */}
                                <li><p className='text-sm text-gray-400'>Email: {user.email || 'N/A'}</p></li>
                                <li>
                                    <button
                                        onClick={openLogoutModal}
                                        className="w-full text-left py-2 px-4 hover:bg-gray-700 rounded-md transition-colors duration-200 text-red-400"
                                    >
                                        Logout {/* On clicking the avatar show a "Logout" button. [cite: 18] */}
                                    </button>
                                </li>
                            </ul>
                        </div>
                        {/* Logout button (optional, if you want it outside the dropdown for larger screens) */}
                        <button onClick={openLogoutModal} className="hidden md:inline-flex btn bg-transparent border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white px-4 py-2 transition-colors duration-300">Logout</button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-3">
                        <NavLink to={"/login"} className="btn bg-blue-600 border border-blue-600 text-white rounded-lg hover:bg-blue-700 hover:border-blue-700 px-4 py-2 transition-colors duration-300 hidden md:inline-flex">Login</NavLink> {/* If not logged in: Show "Login" button. [cite: 17] */}
                        <NavLink to={"/register"} className="btn bg-transparent border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white px-4 py-2 transition-colors duration-300">Register</NavLink> {/* If not logged in: Show "Register" button. [cite: 17] */}
                    </div>
                )}
            </div>

            {/* Logout Confirmation Modal */}
            {isLogoutModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-8 shadow-2xl border border-gray-700 max-w-sm w-full text-center">
                        <h2 className="text-2xl font-bold mb-6 text-blue-400">Confirm Logout</h2>
                        <p className="mb-8 text-gray-300">Are you sure you want to log out?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={closeLogoutModal}
                                className="btn bg-gray-700 hover:bg-gray-600 text-gray-200 border-none rounded-lg px-6 py-2 transition-colors duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogoutConfirm}
                                className="btn bg-red-600 hover:bg-red-700 text-white border-none rounded-lg px-6 py-2 transition-colors duration-300"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;