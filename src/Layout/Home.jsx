import React, { useEffect, useState } from 'react';
import { Link } from 'react-router'; 
import Banner from '../Components/Banner';
import useAuth from '../Firebase/useAuth';


const getInitialTheme = () => {

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }

    return document.documentElement.getAttribute('data-theme') || 'dark';
};

const Home = () => {
    const [topRecipes, setTopRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [theme, setTheme] = useState(getInitialTheme);
    const { user } = useAuth();

    const dynamicPositionClasses = user
        ? "absolute top-5 right-15 lg:top-6 lg:right-50 z-50" 
        : "absolute top-5 right-27 lg:top-6 lg:right-59 z-50"; 

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const fetchTopRecipes = async () => {
            try {
                const backendUrl = "https://recipe-book-server-nu.vercel.app";

                const response = await fetch(`${backendUrl}/recipes/top`);
                const data = await response.json();

                if (response.ok) {
                    setTopRecipes(data);
                } else {
                    setError(data.message || 'Failed to fetch top recipes.');
                }
            } catch (err) {
                console.error("Error fetching top recipes:", err);
                setError('An error occurred while fetching top recipes.');
            } finally {
                setLoading(false);
            }
        };

        fetchTopRecipes();
    }, []);

    const scrollToTopAndNavigate = () => {
        window.scrollTo(0, 0);
    };


    const handleThemeToggle = (e) => {
        const newTheme = e.target.checked ? 'light' : 'dark';
        setTheme(newTheme);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-blue-500"></span>
                <p className="ml-2 text-lg">Loading Top Recipes...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 text-red-400 flex items-center justify-center">
                <p className="text-xl">Error: {error}</p>
            </div>
        );
    }

    return (
      
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>

            {/* Theme toggle button */}
            <div className={dynamicPositionClasses}> 
                <label className="swap swap-rotate btn btn-circle bg-gray-700 text-white dark:bg-gray-200 dark:text-gray-800 border-none shadow-lg">
 
                    <input
                        type="checkbox"
                        checked={theme === 'light'} 
                        onChange={handleThemeToggle} 
                        className="theme-controller"
                    />
                    {/* sun icon */}
                    <svg className="swap-on fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,17,18.36ZM20,12a1,1,0,0,0-1-1h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,20,12ZM18.36,5.64l.71-.71a1,1,0,0,0-1.41-1.41l-.71.71A1,1,0,0,0,18.36,5.64ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,10A4.5,4.5,0,1,1,16.5,12,4.5,4.5,0,0,1,12,16.5Zm-.71-4.29A1,1,0,0,0,10.59,12l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,11.29,12Zm-3.53,3.53a1,1,0,0,0,1.41,0l.71-.71a1,1,0,0,0-1.41-1.41l-.71.71A1,1,0,0,0,7.76,15.76ZM12,19.5a1,1,0,0,0,1-1V18a1,1,0,0,0-2,0v.5A1,1,0,0,0,12,19.5Z" />
                    </svg>

                    {/* moon icon */}
                    <svg className="swap-off fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8,8,0,1,1-11.52-11.52.92.92,0,0,0-.14-1.05,1,1,0,0,0-.73-.59,1,1,0,0,0-1.02.2A10,10,0,0,0,2,12,10,10,0,0,0,12,22h.08a10,10,0,0,0,9.54-7A1,1,0,0,0,21.64,13Z" />
                    </svg>
                </label>
            </div>

            {/* Main content area */}
            <main className="container mx-auto py-8">
                {/* Banner Section */}
                <section className="mb-12">
                    <Banner />
                </section>

                {/* Top Recipes Section */}
                <section className={`px-5 md:px-10 mb-12 ${theme === 'dark' ? '' : 'bg-gray-100'}`}>
                    <h2 className={`text-3xl font-bold text-center mb-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>Top Recipes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {topRecipes.map(recipe => (
                            <div key={recipe._id} className={`rounded-lg shadow-lg overflow-hidden border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:scale-105' : 'bg-white border-gray-200 hover:shadow-xl'} transition-transform duration-300`}>
                                <img
                                    src={recipe.image || 'https://via.placeholder.com/400x250?text=No+Image'}
                                    alt={recipe.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className={`text-xl font-semibold mb-2 line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`} title={recipe.title}>{recipe.title}</h3>
                                    <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Cuisine: <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>{recipe.cuisineType}</span></p>
                                    <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Likes: <span className={`font-medium ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>{recipe.likeCount}</span></p>


                                    {recipe.categories && recipe.categories.length > 0 && (
                                        <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                            <span className={`font-medium ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>Categories:</span> {recipe.categories.join(', ')}
                                        </p>
                                    )}

                                    <div className="mt-auto pt-4">
                                        <Link to={`/recipe/${recipe._id}`} className="block text-center mt-auto">
                                            <button onClick={scrollToTopAndNavigate}
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer"
                                            >
                                                See Details
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {topRecipes.length > 0 && (
                        <div className="text-center mt-10">

                            <Link to="/allrecipes">
                                <button
                                    onClick={scrollToTopAndNavigate}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                                >
                                    See All Recipes
                                </button>
                            </Link>
                        </div>
                    )}
                </section>

                {/* Extra Section 1 : Why Choose Recipe Book? */}
                <section className={`px-5 md:px-10 py-12 rounded-lg shadow-lg mb-12 ${theme === 'dark' ? 'bg-gray-850' : 'bg-gray-200'}`}>
                    <h2 className={`text-3xl font-bold text-center mb-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>Why Choose Our Recipe Book?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className={`p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                            <p className="text-5xl mb-4">📚</p>
                            <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Vast Collection</h3>
                            <p className={` ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Explore thousands of diverse recipes, from quick meals to gourmet dishes, sourced globally.</p>
                        </div>
                        <div className={`p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                            <p className="text-5xl mb-4">✨</p>
                            <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Intuitive Interface</h3>
                            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Our user-friendly design makes finding, saving, and managing recipes a breeze.</p>
                        </div>
                        <div className={`p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                            <p className="text-5xl mb-4">👨‍🍳</p>
                            <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Community & Sharing</h3>
                            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Share your culinary masterpieces and connect with a passionate community of food lovers.</p>
                        </div>
                    </div>
                </section>

                {/* Extra Section 2: Quote */}
                <section className={`px-5 md:px-10 py-12 rounded-lg shadow-lg flex flex-col items-center justify-center text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
                    <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>Culinary Inspiration</h2>
                    <blockquote className={`text-xl md:text-2xl italic max-w-3xl leading-relaxed mb-6 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                        "Cooking is like love. It should be entered into with abandon or not at all."
                    </blockquote>
                    <p className={`text-lg font-semibold mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>- Harriet van Horne</p>
                    <p className={`mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Let us inspire your next kitchen adventure! Discover new flavors, master classic techniques, and
                        turn every meal into a memorable experience.
                    </p>
                </section>
            </main>
        </div>
    );
};

export default Home;