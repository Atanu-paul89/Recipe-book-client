import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Firebase/AuthContext'; // Adjust path if necessary
import { useNavigate } from 'react-router'; // Use react-router-dom for navigation
import { toast } from 'react-toastify'; // Import toast for notifications
import Swal from 'sweetalert2'; // For confirmation dialogs (install if you haven't: npm install sweetalert2)
import axios from 'axios'; // For easier HTTP requests (install if you haven't: npm install axios)

const MyRecipe = () => {
    const { user, loading } = useContext(AuthContext); // Get user and loading state
    const [myRecipes, setMyRecipes] = useState([]);
    const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const backendUrl = "http://localhost:3000"; // Your backend URL

    // Function to fetch recipes
    const fetchMyRecipes = async () => {
        if (!user || !user.email) {
            setIsLoadingRecipes(false);
            return; // Don't fetch if user or user.email is not available
        }

        setIsLoadingRecipes(true);
        setError(null);
        try {
            const response = await axios.get(`${backendUrl}/recipes/user?email=${user.email}`);
            setMyRecipes(response.data);
        } catch (err) {
            console.error('Error fetching my recipes:', err);
            setError('Failed to load your recipes. Please try again.');
            toast.error('Failed to load your recipes.');
        } finally {
            setIsLoadingRecipes(false);
        }
    };

    // useEffect to trigger fetch when component mounts or user changes
    useEffect(() => {
        // Only fetch if user is loaded and available
        if (!loading && user) {
            fetchMyRecipes();
        }
        // If user is null and not loading, it means no user logged in, so clear recipes
        if (!loading && !user) {
            setMyRecipes([]);
            setIsLoadingRecipes(false);
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [user, loading, navigate]); // Depend on user and loading from AuthContext

    // --- Handlers for Edit and Delete ---

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`${backendUrl}/recipes/${id}`);
                    if (response.data.deletedCount > 0) {
                        setMyRecipes(myRecipes.filter(recipe => recipe._id !== id));
                        Swal.fire(
                            'Deleted!',
                            'Your recipe has been deleted.',
                            'success'
                        );
                        toast.success('Recipe deleted successfully!');
                    } else {
                        Swal.fire(
                            'Failed!',
                            'Could not delete the recipe.',
                            'error'
                        );
                        toast.error('Failed to delete recipe.');
                    }
                } catch (err) {
                    console.error('Error deleting recipe:', err);
                    Swal.fire(
                        'Error!',
                        'An error occurred while deleting the recipe.',
                        'error'
                    );
                    toast.error('An error occurred during deletion.');
                }
            }
        });
    };

    const handleEdit = (id) => {

        navigate(`/edit-recipe/${id}`);
    };


    if (isLoadingRecipes || loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                    <span className="loading loading-spinner loading-lg"></span>
                    <p className="ml-2">Loading your recipes...</p>
               </div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500">
                    <p>{error}</p>
               </div>;
    }

    if (myRecipes.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
                <p className="text-xl mb-4">You haven't added any recipes yet!</p>
                <button
                    onClick={() => navigate('/addrecipe')}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition-colors duration-200"
                >
                    Add Your First Recipe
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
            <h1 className="text-4xl font-bold text-center text-blue-400 mb-8">My Recipes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myRecipes.map((recipe) => (
                    <div key={recipe._id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:shadow-xl transition-shadow duration-300">
                        <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
                        <div className="p-5">
                            <h2 className="text-xl font-semibold mb-2 text-blue-300">{recipe.title}</h2>
                            <p className="text-gray-400 text-sm mb-4">
                                {recipe.cuisineType} | {recipe.preparationTime} mins
                            </p>
                            <div className="flex justify-between items-center mt-4">
                                <button
                                    onClick={() => handleEdit(recipe._id)}
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors duration-200 cursor-pointer"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(recipe._id)}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-semibold cursor-pointer rounded-md transition-colors duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyRecipe;