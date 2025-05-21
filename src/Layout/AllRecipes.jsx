import React, { useEffect, useState } from 'react';
import { Link } from 'react-router'; // For the "See Details" button

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllRecipes = async () => {
            try {
                const backendUrl = "http://localhost:3000"; // Your backend URL
                // If you deploy your backend, update this URL
                // const backendUrl = "https://your-recipe-book-server.vercel.app";

                const response = await fetch(`${backendUrl}/recipes`);
                const data = await response.json();

                if (response.ok) {
                    setRecipes(data);
                } else {
                    setError(data.message || 'Failed to fetch recipes.');
                }
            } catch (err) {
                console.error("Error fetching recipes:", err);
                setError('An error occurred while fetching recipes.');
            } finally {
                setLoading(false);
            }
        };

        fetchAllRecipes();
    }, []); // Empty dependency array means this runs once on component mount

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-blue-500"></span>
                <p className="ml-2 text-lg">Loading Recipes...</p>
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

    if (recipes.length === 0) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold mb-4 text-blue-400">No Recipes Found</h2>
                <p className="text-lg text-gray-300 mb-6 text-center">
                    It looks like there are no recipes added yet. Be the first to add one!
                </p>
                <Link to="/add-recipe" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition-colors duration-200">
                    Add Your First Recipe
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
            <h1 className="text-4xl font-bold text-center text-blue-400 mb-10">All Recipes</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recipes.map((recipe) => (
                    <div key={recipe._id} className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
                        <img
                            src={recipe.image || 'https://via.placeholder.com/400x250?text=No+Image'}
                            alt={recipe.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-5 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2" title={recipe.title}>
                                {recipe.title}
                            </h2>
                            <p className="text-gray-400 text-sm mb-1">
                                <span className="font-medium text-blue-300">Cuisine:</span> {recipe.cuisineType}
                            </p>
                            <p className="text-gray-400 text-sm mb-1">
                                <span className="font-medium text-blue-300">Prep Time:</span> {recipe.preparationTime} mins
                            </p>
                            <p className="text-gray-400 text-sm mb-3">
                                <span className="font-medium text-blue-300">Likes:</span> {recipe.likeCount}
                            </p>
                            {/* Display 3-4 information about the recipe as per requirement [cite: 48] */}
                            {recipe.categories && recipe.categories.length > 0 && (
                                <p className="text-gray-400 text-sm mb-3">
                                    <span className="font-medium text-blue-300">Categories:</span> {recipe.categories.join(', ')}
                                </p>
                            )}

                            <div className="mt-auto pt-4"> {/* Push button to bottom */}
                                <Link
                                    to={`/recipe-details/${recipe._id}`} // Link to the details page
                                    className="block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors duration-200"
                                >
                                    See Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllRecipes;