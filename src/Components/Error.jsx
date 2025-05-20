import React from 'react';
import { Link } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';

const foodBackgroundImg = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';


const Error = () => {
  return (

      <div
        className="min-h-screen flex items-center justify-center text-white p-4"
        style={{
          backgroundImage: `url(${foodBackgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          backgroundBlendMode: 'darken'
        }}
      >

        <div className="absolute inset-0 bg-black opacity-70"></div>

        <div className="relative z-10 text-center max-w-xl p-8 rounded-lg shadow-2xl bg-gray-900 bg-opacity-80 backdrop-blur-sm border border-gray-700">
          <h1 className="text-6xl md:text-8xl font-extrabold text-red-500 mb-4 drop-shadow-lg">404</h1>
          <p className="text-xl md:text-2xl font-semibold mb-4 text-gray-300">
            Recipe Not Found
          </p>
          <p className="text-md md:text-lg text-gray-400 mb-8 leading-relaxed">
            It seems the recipe you were looking for has either gone missing, or it's a secret dish not yet on our menu! Please check the URL or head back to our main kitchen.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Discover More Recipes
          </Link>
        </div>
      </div>


  );
};

export default Error;