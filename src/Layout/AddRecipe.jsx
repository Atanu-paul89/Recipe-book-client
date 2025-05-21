// import React, { useState } from 'react';

// const AddRecipe = () => {
//     const [title, setTitle] = useState('');
//     const [ingredients, setIngredients] = useState('');
//     const [instructions, setInstructions] = useState('');
//     const [cuisineType, setCuisineType] = useState('');
//     const [preparationTime, setPreparationTime] = useState('');
//     const [categories, setCategories] = useState({
//         Breakfast: false,
//         Lunch: false,
//         Dinner: false,
//         Dessert: false,
//         Vegan: false,
//     });
//     const [image, setImage] = useState('');




//     const handleCategoryChange = (category, checked) => {
//         setCategories(prev => ({ ...prev, [category]: checked }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const selectedCategories = Object.entries(categories)
//             .filter(([, value]) => value)
//             .map(([key]) => key);

//         const recipeData = {
//             title,
//             ingredients,
//             instructions,
//             cuisineType,
//             preparationTime: parseInt(preparationTime, 10),
//             categories: selectedCategories,
//             image,
//             likeCount: 0,
//         };

//         console.log(recipeData);



//         setTitle('');
//         setIngredients('');
//         setInstructions('');
//         setCuisineType('');
//         setPreparationTime('');
//         setCategories({
//             Breakfast: false,
//             Lunch: false,
//             Dinner: false,
//             Dessert: false,
//             Vegan: false,
//         });
//         setImage('');
//     };

//     return (
//         <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 flex items-center justify-center">
//             <div className="max-w-4xl w-full mx-auto bg-gray-800 shadow-lg border border-gray-700 rounded-lg p-6 md:p-8">
//                 <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Add New Recipe</h1>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                         <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-1">
//                             Image URL
//                         </label>
//                         <input
//                             id="image"
//                             type="text"
//                             value={image}
//                             onChange={(e) => setImage(e.target.value)}
//                             className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
//                             placeholder="Enter the image URL"
//                             required
//                         />
//                     </div>

//                     <div>
//                         <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
//                             Title
//                         </label>
//                         <input
//                             id="title"
//                             type="text"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
//                             placeholder="Enter the recipe title"
//                             required
//                         />
//                     </div>

//                     <div>
//                         <label htmlFor="ingredients" className="block text-sm font-medium text-gray-300 mb-1">
//                             Ingredients
//                         </label>
//                         <textarea
//                             id="ingredients"
//                             value={ingredients}
//                             onChange={(e) => setIngredients(e.target.value)}
//                             className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 min-h-[100px]"
//                             placeholder="Enter ingredients (e.g., 1 cup flour, 2 eggs)"
//                             required
//                         ></textarea>
//                     </div>

//                     <div>
//                         <label htmlFor="instructions" className="block text-sm font-medium text-gray-300 mb-1">
//                             Instructions
//                         </label>
//                         <textarea
//                             id="instructions"
//                             value={instructions}
//                             onChange={(e) => setInstructions(e.target.value)}
//                             className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 min-h-[150px]"
//                             placeholder="Provide cooking instructions"
//                             required
//                         ></textarea>
//                     </div>

//                     <div>
//                         <label htmlFor="cuisineType" className="block text-sm font-medium text-gray-300 mb-1">
//                             Cuisine Type
//                         </label>
//                         <select
//                             id="cuisineType"
//                             value={cuisineType}
//                             onChange={(e) => setCuisineType(e.target.value)}
//                             className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
//                             required
//                         >
//                             <option value="" disabled>Select a cuisine type</option>
//                             <option value="Italian">Italian</option>
//                             <option value="Mexican">Mexican</option>
//                             <option value="Indian">Indian</option>
//                             <option value="Chinese">Chinese</option>
//                             <option value="Others">Others</option>
//                         </select>
//                     </div>

//                     <div>
//                         <label htmlFor="preparationTime" className="block text-sm font-medium text-gray-300 mb-1">
//                             Preparation Time (minutes)
//                         </label>
//                         <input
//                             id="preparationTime"
//                             type="number"
//                             value={preparationTime}
//                             onChange={(e) => setPreparationTime(e.target.value)}
//                             className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
//                             placeholder="e.g., 30"
//                             min="0"
//                             required
//                         />
//                     </div>

//                     <div>
//                         <span className="block text-sm font-medium text-gray-300 mb-2">Categories</span>
//                         <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                             {Object.keys(categories).map(category => (
//                                 <div key={category} className="flex items-center">
//                                     <input
//                                         id={`category-${category.toLowerCase()}`}
//                                         type="checkbox"
//                                         checked={categories[category]}
//                                         onChange={(e) => handleCategoryChange(category, e.target.checked)}
//                                         className="h-4 w-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
//                                     />
//                                     <label htmlFor={`category-${category.toLowerCase()}`} className="ml-2 text-sm text-gray-300">
//                                         {category}
//                                     </label>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="pt-4">
//                         <button
//                             type="submit"
//                             className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-200"
//                         >
//                             Add Recipe
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddRecipe;



// new code implements server //
import React, { useState, useContext } from 'react'; // Import useContext

import { toast, ToastContainer } from 'react-toastify'; // For toast messages
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router'; // For redirection
import { AuthContext } from '../Firebase/AuthContext';

const AddRecipe = () => {
    const { user } = useContext(AuthContext); // Get the current user from AuthContext
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
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

    const handleSubmit = async (e) => { // Make handleSubmit async
        e.preventDefault();

        if (!user) { // Basic check if user is logged in (though this is a private route)
            toast.error('You must be logged in to add a recipe.');
            navigate('/login'); // Redirect to login if somehow not logged in
            return;
        }

        const selectedCategories = Object.entries(categories)
            .filter(([, value]) => value)
            .map(([key]) => key);

        const recipeData = {
            title,
            ingredients,
            instructions,
            cuisineType,
            preparationTime: parseInt(preparationTime, 10),
            categories: selectedCategories,
            image,
            likeCount: 0, // Backend will also ensure this, but good to set here too
            creatorEmail: user.email, // Crucially, add the creator's email
            creatorName: user.displayName || 'Anonymous', // Add creator's name if available
            creatorPhotoURL: user.photoURL || '', // Add creator's photo if available
        };

        console.log("Recipe data to send:", recipeData);

        try {
            // Replace with your actual backend URL
            const backendUrl = "http://localhost:3000"; // Example: If hosted on Vercel
            // OR use your local development server if testing locally
            // const backendUrl = "http://localhost:3000";

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
                // Clear form fields after successful submission
                setTitle('');
                setIngredients('');
                setInstructions('');
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
                // Optionally redirect to All Recipes or My Recipes page
                navigate('/allrecipes'); // Redirect to all recipes page
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
                            Ingredients
                        </label>
                        <textarea
                            id="ingredients"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 min-h-[100px]"
                            placeholder="Enter ingredients (e.g., 1 cup flour, 2 eggs)"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="instructions" className="block text-sm font-medium text-gray-300 mb-1">
                            Instructions
                        </label>
                        <textarea
                            id="instructions"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 min-h-[150px]"
                            placeholder="Provide cooking instructions"
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
            <ToastContainer /> {/* Add ToastContainer here for toast messages */}
        </div>
    );
};

export default AddRecipe;