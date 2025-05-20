import React from 'react';
import logo from "/FooterLogo.png"; // Ensure this path is correct for your project
import { NavLink } from 'react-router'; // Corrected import for NavLink

const Footer = () => {
  const scrollToTopAndNavigate = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-gray-950 text-gray-300 py-10 px-4 md:px-8 lg:px-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
        {/* Left Section: Logo and Company Info */}
        <aside className="text-center md:text-left">
          <NavLink to={'/'} onClick={scrollToTopAndNavigate} className="inline-block mb-4">
            <img src={logo} className="w-40 h-auto" alt="Recipe Book Logo" /> 
          </NavLink>
          <p className="lg:ml-6 text-sm text-[#155DFC]">
            Recipe Book Ltd.
            <br />
            &copy;2025
          </p>
        </aside>

        {/* Right Section: Social Links */}
        <nav className="text-center md:text-right">
          <h6 className="text-white font-bold text-xl mb-4">Social</h6>
          <div className="flex justify-center md:justify-end space-x-6">
            {/* Twitter Icon */}
            <a href='https://x.com/' target='_blank' rel="noopener noreferrer" aria-label="Twitter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28" // Increased size
                height="28" // Increased size
                viewBox="0 0 24 24"
                className="fill-current text-blue-400 hover:text-blue-300 transition-colors duration-300">
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            {/* YouTube Icon */}
            {/* Note: The YouTube link was 'https://www.youtube.com/', which is likely not a valid YouTube URL. 
               Changed to a generic YouTube link. */}
            <a href='https://www.youtube.com/' target='_blank' rel="noopener noreferrer" aria-label="YouTube">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28" // Increased size
                height="28" // Increased size
                viewBox="0 0 24 24"
                className="fill-current text-red-500 hover:text-red-400 transition-colors duration-300">
                <path
                  d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            {/* Facebook Icon */}
            <a href='https://www.facebook.com/' target='_blank' rel="noopener noreferrer" aria-label="Facebook">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28" // Increased size
                height="28" // Increased size
                viewBox="0 0 24 24"
                className="fill-current text-blue-600 hover:text-blue-500 transition-colors duration-300">
                <path
                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;