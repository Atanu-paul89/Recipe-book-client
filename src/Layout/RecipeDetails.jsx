

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router'; 
import useAuth from '../Firebase/useAuth';
import { FaHeart } from 'react-icons/fa';



const RecipeDetails = () => {
    const { id } = useParams(); 
    const { user } = useAuth(); 
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [likeMessage, setLikeMessage] = useState(''); 

    const backendUrl = "http://localhost:3000"; 
    useEffect(() => {
        const fetchRecipeDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${backendUrl}/recipes/${id}`);
                const data = await response.json();

                if (response.ok) {
                    setRecipe(data);
       
                    if (user && data.creatorEmail === user.email) {
                        setIsOwner(true);
                    } else {
                        setIsOwner(false);
                    }
                } else {
                    setError(data.message || 'Failed to fetch recipe details.');
                }
            } catch (err) {
                console.error("Error fetching recipe details:", err);
                setError('An error occurred while fetching recipe details.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchRecipeDetails();
        }
    }, [id, user]); 


    const handleLike = async () => {
        if (!user) {
            setLikeMessage('Please log in to like recipes.');
            return;
        }

        if (isOwner) {
            setLikeMessage("You cannot like your own recipe!");
            return;
        }

        try {
            const response = await fetch(`${backendUrl}/recipes/${recipe._id}/like`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userEmail: user.email }), 
            });

            const data = await response.json();

            if (response.ok) {
            
                setRecipe(prevRecipe => ({
                    ...prevRecipe,
                    likeCount: (prevRecipe.likeCount || 0) + 1,
                }));
                setLikeMessage('Recipe liked successfully!');
            } else {
                setLikeMessage(data.message || 'Failed to like recipe.');
            }
        } catch (err) {
            console.error("Error liking recipe:", err);
            setLikeMessage('An error occurred while liking the recipe.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
                <span className="loading loading-spinner loading-lg text-blue-500"></span>
                <p className="ml-2">Loading recipe...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900 text-red-400">
                <p>{error}</p>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-400">
                <p>Recipe not found.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen py-10 px-4 md:px-8 lg:px-12">
            <div className="container mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700 p-6 md:p-10">
                {/* Image and Title Section */}
                <div className="flex flex-col lg:flex-row gap-8 mb-8">
                    <div className="lg:w-1/2">
                        <img
                            src={recipe.image || 'https://via.placeholder.com/400x250?text=No+Image'}
                            alt={recipe.title}
                            className="w-full h-80 object-cover rounded-lg shadow-md"
                        />
                    </div>
                    <div className="lg:w-1/2 flex flex-col justify-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-4">{recipe.title}</h1>
                        <p className="text-xl text-gray-300 mb-2">
                            <span className="font-semibold">Cuisine:</span> {recipe.cuisineType}
                        </p>
                        <p className="text-xl text-gray-300 mb-2">
                            <span className="font-semibold">Preparation Time:</span> {recipe.preparationTime} minutes
                        </p>
                        <p className="text-xl text-gray-300 mb-4">
                            <span className="font-semibold">Category:</span> {recipe.categories && recipe.categories.length > 0 ? recipe.categories.join(', ') : 'N/A'}
                        </p>

                        {/* Like Count Display */}
                        <div className="flex items-center text-lg text-green-400 mb-4">
                           
                            <span className="mr-2 text-3xl">❤️</span>
                            <span className="font-bold">{recipe.likeCount || 0}</span>&nbsp; people interested in this recipe
                        </div>

                        {/* Like Button */}
                        <button
                            onClick={handleLike}
                            disabled={isOwner || !user} // Disable if owner or not logged in
                            className={`flex items-center justify-center gap-2 px-6 py-2 rounded-md text-lg font-semibold transition-colors duration-300 cursor-pointer
                                ${isOwner || !user
                                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    : 'bg-red-500 hover:bg-red-600 text-white'
                                }`}
                        >
                            {FaHeart && <FaHeart className="text-xl mt-1" />} 
                            Like This Recipe
                        </button>
                        {likeMessage && (
                            <p className={`text-sm mt-2 ${likeMessage.includes('cannot') || likeMessage.includes('Failed') ? 'text-red-300' : 'text-green-300'}`}>
                                {likeMessage}
                            </p>
                        )}
                        {isOwner && (
                            <p className="text-red-300 text-sm mt-2">You cannot like your own recipe.</p>
                        )}
                    </div>
                </div>

                {/* Ingredients Section */}
                <section className="mb-8">
                    <h2 className="text-3xl font-bold text-blue-400 mb-4 border-b pb-2 border-gray-700">Ingredients</h2>
                    <ul className="list-disc list-inside space-y-2 text-lg text-gray-300">
                        {recipe.ingredients && recipe.ingredients.length > 0 ? (
                            recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))
                        ) : (
                            <li>No ingredients listed.</li>
                        )}
                    </ul>
                </section>

                {/* Instructions Section */}
                <section>
                    <h2 className="text-3xl font-bold text-blue-400 mb-4 border-b pb-2 border-gray-700">Instructions</h2>
                    <ol className="list-decimal list-inside space-y-3 text-lg text-gray-300">
                        {recipe.instructions && recipe.instructions.length > 0 ? (
                            recipe.instructions.map((instruction, index) => (
                                <li key={index}>{instruction}</li>
                            ))
                        ) : (
                            <li>No instructions provided.</li>
                        )}
                    </ol>
                </section>
            </div>
        </div>
    );
};

export default RecipeDetails;
