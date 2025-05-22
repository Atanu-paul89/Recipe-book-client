
import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Firebase/AuthContext';

const AddRecipe = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');

    const [ingredientsInput, setIngredientsInput] = useState('');
    const [instructionsInput, setInstructionsInput] = useState('');
    const [cuisineType, setCuisineType] = useState('');
    const [preparationTime, setPreparationTime] = useState('');
    const [categories, setCategories] = useState({
        Breakfast: false,
        Lunch: false,
        Dinner: false,
        Dessert: false,
        Vegan: false,
    });
    const [image, setImage] = useState('');

    const handleCategoryChange = (category, checked) => {
        setCategories(prev => ({ ...prev, [category]: checked }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('You must be logged in to add a recipe.');
            navigate('/login');
            return;
        }

        const selectedCategories = Object.entries(categories)
            .filter(([, value]) => value)
            .map(([key]) => key);

        
        const ingredientsArray = ingredientsInput
            .split('\n') 
            .map(item => item.trim()) 
            .filter(item => item !== ''); 

        const instructionsArray = instructionsInput
            .split('\n') 
            .map(item => item.trim()) 
            .filter(item => item !== ''); 

        const recipeData = {
            title,
            ingredients: ingredientsArray,
            instructions: instructionsArray,
            cuisineType,
            preparationTime: parseInt(preparationTime, 10),
            categories: selectedCategories,
            image,
            likeCount: 0,
            creatorEmail: user.email,
            creatorName: user.displayName || 'Anonymous',
            creatorPhotoURL: user.photoURL || '',
        };

        console.log("Recipe data to send:", recipeData);

        try {
            const backendUrl = "http://localhost:3000"; 
            const response = await fetch(`${backendUrl}/recipes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Recipe added successfully!', { theme: "dark" });
                console.log('Recipe added:', data);

                setTitle('');
                setIngredientsInput('');
                setInstructionsInput('');
                setCuisineType('');
                setPreparationTime('');
                setCategories({
                    Breakfast: false,
                    Lunch: false,
                    Dinner: false,
                    Dessert: false,
                    Vegan: false,
                });
                setImage('');
                navigate('/allrecipes');
            } else {
                toast.error(`Failed to add recipe: ${data.message || response.statusText}`, { theme: "dark" });
                console.error('Failed to add recipe:', data);
            }
        } catch (error) {
            console.error('Error adding recipe:', error);
            toast.error('An error occurred while adding the recipe.', { theme: "dark" });
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 flex items-center justify-center">
            <div className="max-w-4xl w-full mx-auto bg-gray-800 shadow-lg border border-gray-700 rounded-lg p-6 md:p-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Add New Recipe</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-1">
                            Image URL
                        </label>
                        <input
                            id="image"
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            placeholder="Enter the image URL"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            placeholder="Enter the recipe title"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="ingredients" className="block text-sm font-medium text-gray-300 mb-1">
                            Ingredients <span className="text-gray-400 text-xs">(one per line)</span>
                        </label>
                        <textarea
                            id="ingredients"

                            value={ingredientsInput}
                            onChange={(e) => setIngredientsInput(e.target.value)}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 min-h-[100px]"
                            placeholder="Enter ingredients (e.g.,&#10;1 cup flour&#10;2 large eggs&#10;Pinch of salt)"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="instructions" className="block text-sm font-medium text-gray-300 mb-1">
                            Instructions <span className="text-gray-400 text-xs">(one step per line)</span>
                        </label>
                        <textarea
                            id="instructions"

                            value={instructionsInput}
                            onChange={(e) => setInstructionsInput(e.target.value)}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 min-h-[150px]"
                            placeholder="Provide cooking instructions (e.g.,&#10;1. Preheat oven to 350°F.&#10;2. Mix all dry ingredients together.&#10;3. Add wet ingredients and stir until smooth.)"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="cuisineType" className="block text-sm font-medium text-gray-300 mb-1">
                            Cuisine Type
                        </label>
                        <select
                            id="cuisineType"
                            value={cuisineType}
                            onChange={(e) => setCuisineType(e.target.value)}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            required
                        >
                            <option value="" disabled>Select a cuisine type</option>
                            <option value="Italian">Italian</option>
                            <option value="Mexican">Mexican</option>
                            <option value="Indian">Indian</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="preparationTime" className="block text-sm font-medium text-gray-300 mb-1">
                            Preparation Time (minutes)
                        </label>
                        <input
                            id="preparationTime"
                            type="number"
                            value={preparationTime}
                            onChange={(e) => setPreparationTime(e.target.value)}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            placeholder="e.g., 30"
                            min="0"
                            required
                        />
                    </div>

                    <div>
                        <span className="block text-sm font-medium text-gray-300 mb-2">Categories</span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {Object.keys(categories).map(category => (
                                <div key={category} className="flex items-center">
                                    <input
                                        id={`category-${category.toLowerCase()}`}
                                        type="checkbox"
                                        checked={categories[category]}
                                        onChange={(e) => handleCategoryChange(category, e.target.checked)}
                                        className="h-4 w-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor={`category-${category.toLowerCase()}`} className="ml-2 text-sm text-gray-300">
                                        {category}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-200"
                        >
                            Add Recipe
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default AddRecipe; 