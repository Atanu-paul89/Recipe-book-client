import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Slide } from 'react-awesome-reveal'; 

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCuisine, setSelectedCuisine] = useState('');
    const [cuisineOptions, setCuisineOptions] = useState([]);

    const scrollToTopAndNavigate = () => {
        window.scrollTo(0, 0);
    };

    const fetchAllRecipes = async (cuisineType = '') => {
        setLoading(true);
        setError(null);
        try {
            const backendUrl = "https://recipe-book-server-nu.vercel.app";
            const url = cuisineType ? `${backendUrl}/recipes?cuisineType=${cuisineType}` : `${backendUrl}/recipes`;

            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                setRecipes(data);
                if (cuisineType === '') {
                    const uniqueCuisines = [...new Set(data.map(recipe => recipe.cuisineType))];
                    setCuisineOptions(['All', ...uniqueCuisines]);
                }
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

    useEffect(() => {
        fetchAllRecipes(selectedCuisine);
    }, [selectedCuisine]);


    const handleCuisineChange = (event) => {
        setSelectedCuisine(event.target.value === 'All' ? '' : event.target.value);
    };


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

    if (recipes.length === 0 && selectedCuisine !== '') {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold mb-4 text-blue-400">No Recipes Found for {selectedCuisine} Cuisine</h2>
                <p className="text-lg text-gray-300 mb-6 text-center">
                    Try selecting a different cuisine type or add a new recipe!
                </p>
                <button
                    onClick={() => setSelectedCuisine('')}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition-colors duration-200"
                >
                    Show All Recipes
                </button>
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

            {/* Cuisine Filter Dropdown */}
            <div className="flex justify-center mb-8">
                <div className="relative w-full max-w-xs">
                    <select
                        className="block appearance-none w-full bg-gray-700 border border-gray-600 text-white py-3 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                        value={selectedCuisine || 'All'}
                        onChange={handleCuisineChange}
                    >
                        {cuisineOptions.map((cuisine) => (
                            <option key={cuisine} value={cuisine === 'All' ? '' : cuisine}>
                                {cuisine}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recipes.map((recipe, index) => (

                    <Slide key={recipe._id} direction="up" delay={index * 150} duration={800} triggerOnce>
                        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
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

                                {recipe.categories && recipe.categories.length > 0 && (
                                    <p className="text-gray-400 text-sm mb-3">
                                        <span className="font-medium text-blue-300">Categories:</span> {recipe.categories.join(', ')}
                                    </p>
                                )}

                                <div className="mt-auto pt-4">
                                    <Link onClick={scrollToTopAndNavigate}
                                        to={`/recipe/${recipe._id}`}
                                        className="block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors duration-200"
                                    >
                                        See Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Slide>
                ))}
            </div>
        </div>
    );
};

export default AllRecipes;