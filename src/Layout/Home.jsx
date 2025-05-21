
import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import { Link } from 'react-router'; // Use Link instead of NavLink for simple navigation
import Banner from '../Components/Banner';

const Home = () => {
    const [topRecipes, setTopRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Use useEffect to fetch top recipes when the component mounts
    useEffect(() => {
        const fetchTopRecipes = async () => {
            try {
                const backendUrl = "http://localhost:3000"; // Your backend URL
                // If you deploy your backend, update this URL
                // const backendUrl = "https://your-recipe-book-server.vercel.app";

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
    }, []); // Empty dependency array means this runs once on component mount

    const scrollToTopAndNavigate = () => {
        window.scrollTo(0, 0);
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
        <div className="bg-gray-900 text-white min-h-screen">
            {/* Navbar and Footer are handled by MainLayout */}

            {/* Main content area */}
            <main className="container mx-auto py-8">
                {/* Banner Section */}
                <section className="mb-12">
                    <Banner />
                </section>

                {/* Top Recipes Section */}
                <section className="px-5 md:px-10 mb-12">
                    <h2 className="text-3xl font-bold text-center text-blue-400 mb-8">Top Recipes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Map over the fetched topRecipes instead of dummyTopRecipes */}
                        {topRecipes.map(recipe => (
                            <div key={recipe._id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:scale-105 transition-transform duration-300">
                                <img
                                    src={recipe.image || 'https://via.placeholder.com/400x250?text=No+Image'}
                                    alt={recipe.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2" title={recipe.title}>{recipe.title}</h3>
                                    <p className="text-gray-400 text-sm mb-1">Cuisine: <span className="font-medium text-gray-200">{recipe.cuisineType}</span></p>
                                    <p className="text-gray-400 text-sm mb-3">Likes: <span className="font-medium text-blue-300">{recipe.likeCount}</span></p>
                                    {/* The description field is not consistently in your actual recipe data from MongoDB (ingredients, instructions are there).
                                        If you want to display a short description, you might need to add it to your AddRecipe form.
                                        For now, I'm commenting it out or replacing with a placeholder if it's not guaranteed.
                                        <p className="text-gray-300 text-base mb-4 line-clamp-2">{recipe.description}</p>
                                    */}

                                    {/* Use Link from react-router-dom and remove the onClick for scroll, router handles it better */}
                                    <Link to={`/recipe-details/${recipe._id}`} className="block text-center mt-auto">
                                        <button
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer"
                                        >
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Only show "See All Recipes" if there are actual top recipes, otherwise it's redundant with the no recipes found for AllRecipes */}
                    {topRecipes.length > 0 && (
                        <div className="text-center mt-10">
                            {/* Use Link instead of NavLink for simple navigation */}
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

                {/* Extra Static Section 1: Why Choose Recipe Book? */}
                <section className="px-5 md:px-10 py-12 bg-gray-850 rounded-lg shadow-lg mb-12">
                    <h2 className="text-3xl font-bold text-center text-blue-400 mb-8">Why Choose Our Recipe Book?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <p className="text-5xl mb-4">📚</p>
                            <h3 className="text-xl font-semibold text-white mb-2">Vast Collection</h3>
                            <p className="text-gray-300">Explore thousands of diverse recipes, from quick meals to gourmet dishes, sourced globally.</p>
                        </div>
                        <div className="p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <p className="text-5xl mb-4">✨</p>
                            <h3 className="text-xl font-semibold text-white mb-2">Intuitive Interface</h3>
                            <p className="text-gray-300">Our user-friendly design makes finding, saving, and managing recipes a breeze.</p>
                        </div>
                        <div className="p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <p className="text-5xl mb-4">👨‍🍳</p>
                            <h3 className="text-xl font-semibold text-white mb-2">Community & Sharing</h3>
                            <p className="text-gray-300">Share your culinary masterpieces and connect with a passionate community of food lovers.</p>
                        </div>
                    </div>
                </section>

                {/* Extra Static Section 2: Culinary Inspiration / Quote */}
                <section className="px-5 md:px-10 py-12 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
                    <h2 className="text-3xl font-bold text-blue-400 mb-6">Culinary Inspiration</h2>
                    <blockquote className="text-xl md:text-2xl italic text-gray-200 max-w-3xl leading-relaxed mb-6">
                        "Cooking is like love. It should be entered into with abandon or not at all."
                    </blockquote>
                    <p className="text-lg font-semibold text-gray-300">- Harriet van Horne</p>
                    <p className="text-gray-400 mt-4">
                        Let us inspire your next kitchen adventure! Discover new flavors, master classic techniques, and
                        turn every meal into a memorable experience.
                    </p>
                </section>
            </main>
        </div>
    );
};

export default Home;