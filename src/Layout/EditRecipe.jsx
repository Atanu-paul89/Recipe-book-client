
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router'; 
import axios from 'axios'; 
import toast from 'react-hot-toast'; 

const EditRecipe = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 


    const [recipeData, setRecipeData] = useState({
        title: '',
        image: '',
        ingredients: '', 
        instructions: '',
        cuisineType: '',
        preparationTime: '',
        categories: [],
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); 


    useEffect(() => {
        const fetchRecipeForEdit = async () => {
            try {
                const response = await axios.get(`https://recipe-book-server-nu.vercel.app/recipes/${id}`);
                const fetchedRecipe = response.data;


                setRecipeData({
                    title: fetchedRecipe.title || '',
                    image: fetchedRecipe.image || '',
                
                    ingredients: fetchedRecipe.ingredients ? fetchedRecipe.ingredients.join(', ') : '',
                    instructions: fetchedRecipe.instructions || '',
                    cuisineType: fetchedRecipe.cuisineType || '',
                    preparationTime: fetchedRecipe.preparationTime || '',
                    categories: fetchedRecipe.categories || [], 
                });
                setLoading(false);
            } catch (err) {
                console.error("Error fetching recipe for edit:", err);
                setError("Failed to load recipe for editing. Please try again.");
                toast.error("Failed to load recipe.");
                setLoading(false);
            }
        };

        fetchRecipeForEdit();
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipeData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setIsSubmitting(true);
        setError(''); 

        const updatedData = {
            ...recipeData,
            ingredients: recipeData.ingredients.split(',').map(item => item.trim()).filter(item => item !== ''),

            preparationTime: parseInt(recipeData.preparationTime) 
        };

        try {
            const response = await axios.put(`https://recipe-book-server-nu.vercel.app/recipes/${id}`, updatedData);
            if (response.data.modifiedCount > 0) { 
                toast.success("Recipe updated successfully!");
                navigate('/myrecipes'); 
            } else {
                toast.info("No changes were made to the recipe.");
                navigate('/myrecipes'); 
            }
        } catch (err) {
            console.error("Error updating recipe:", err);
            setError("Failed to update recipe. Please try again.");
            toast.error("Failed to update recipe.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className="text-center py-8 text-white">Loading recipe...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    if (!recipeData.title) { 
        return <div className="text-center py-8 text-gray-400">Recipe not found or could not be loaded.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 md:p-12">
            <h1 className="text-4xl font-bold text-center text-blue-400 mb-8">Edit Recipe: {recipeData.title}</h1>

            <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl p-6">
                <form onSubmit={handleSubmit}> 
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-300 text-sm font-bold mb-2">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
                            value={recipeData.title} 
                            onChange={handleChange} 
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-300 text-sm font-bold mb-2">Image URL:</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
                            value={recipeData.image}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    

                    <div className="mb-4">
                        <label htmlFor="ingredients" className="block text-gray-300 text-sm font-bold mb-2">Ingredients (comma separated):</label>
                        <textarea
                            id="ingredients"
                            name="ingredients"
                            rows="4"
                            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
                            value={recipeData.ingredients}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="instructions" className="block text-gray-300 text-sm font-bold mb-2">Instructions:</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            rows="6"
                            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
                            value={recipeData.instructions}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>


                    <div className="mb-4">
                        <label htmlFor="cuisineType" className="block text-gray-300 text-sm font-bold mb-2">Cuisine Type:</label>
                        <input
                            type="text"
                            id="cuisineType"
                            name="cuisineType"
                            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
                            value={recipeData.cuisineType}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="preparationTime" className="block text-gray-300 text-sm font-bold mb-2">Preparation Time (minutes):</label>
                        <input
                            type="number" 
                            id="preparationTime"
                            name="preparationTime"
                            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
                            value={recipeData.preparationTime}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="categories" className="block text-gray-300 text-sm font-bold mb-2">Categories (comma separated):</label>
                        <input
                            type="text"
                            id="categories"
                            name="categories"
                            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
                            value={recipeData.categories.join(', ')} 
                            onChange={(e) => setRecipeData(prevData => ({ 
                                ...prevData,
                                categories: e.target.value.split(',').map(item => item.trim()).filter(item => item !== '')
                            }))}
                        />
                    </div>


                    {/* Submit Button */}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit" 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            disabled={isSubmitting} 
                        >
                            {isSubmitting ? 'Updating...' : 'Update Recipe'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditRecipe;