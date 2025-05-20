import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
// import { FaHeart } from 'react-icons/fa'; // You might need to install react-icons if you want to use this

const RecipeDetails = () => {
    const { id } = useParams(); // Get the recipe ID from the URL
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOwner, setIsOwner] = useState(false); // Placeholder: true if current user owns this recipe

    // Dummy data for a single recipe - replace with actual API call later
    const dummyRecipes = [
        {
            _id: 'rec1',
            image: 'https://images.unsplash.com/photo-1728910107534-e04e261768ae?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // UPDATED IMAGE URL
            title: 'Spicy Chicken Curry',
            ingredients: [
                '1 kg chicken, cut into pieces',
                '2 large onions, finely chopped',
                '3 tomatoes, pureed',
                '2 tbsp ginger-garlic paste',
                '1 tbsp red chili powder',
                '1 tbsp coriander powder',
                '1 tsp turmeric powder',
                '1 tsp garam masala',
                'Salt to taste',
                'Fresh coriander for garnish'
            ],
            instructions: [
                'Heat oil in a pan, add chopped onions and sauté until golden brown.',
                'Add ginger-garlic paste and sauté for a minute.',
                'Add red chili, coriander, turmeric powder and mix well. Cook for 2 minutes.',
                'Add tomato puree and cook until oil separates.',
                'Add chicken pieces and salt, mix well. Cook for 10-15 minutes on medium flame.',
                'Add a cup of water, cover and cook until chicken is tender.',
                'Sprinkle garam masala and fresh coriander. Serve hot with rice or naan.'
            ],
            cuisineType: 'Indian',
            preparationTime: 60, // in minutes
            category: 'Dinner',
            likeCount: 150,
            ownerId: 'user123' // Placeholder: ID of the user who added this recipe
        },
        {
            _id: 'rec2',
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // UPDATED IMAGE URL
            title: 'Classic Margherita Pizza',
            ingredients: [
                '1 pizza dough',
                '1/2 cup tomato sauce',
                '1 cup fresh mozzarella, sliced',
                'Fresh basil leaves',
                '2 tbsp olive oil',
                'Salt and pepper to taste'
            ],
            instructions: [
                'Preheat oven to 475°F (245°C).',
                'Stretch pizza dough on a baking sheet or pizza stone.',
                'Spread tomato sauce evenly over the dough, leaving a border.',
                'Arrange mozzarella slices and basil leaves on top.',
                'Drizzle with olive oil, season with salt and pepper.',
                'Bake for 10-15 minutes, or until crust is golden and cheese is bubbly.'
            ],
            cuisineType: 'Italian',
            preparationTime: 30,
            category: 'Lunch',
            likeCount: 120,
            ownerId: 'user456'
        },
        {
            _id: 'rec3',
            image: 'https://images.unsplash.com/photo-1627564803215-ad55bad5c5ea?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // UPDATED IMAGE URL
            title: 'Savory Beef Tacos',
            ingredients: [
                '1 lb ground beef',
                '1 packet taco seasoning',
                '1/2 cup water',
                '12 taco shells',
                'Shredded lettuce',
                'Diced tomatoes',
                'Shredded cheese',
                'Sour cream',
                'Salsa'
            ],
            instructions: [
                'Brown ground beef in a skillet; drain fat.',
                'Stir in taco seasoning and water. Bring to a simmer and cook for 5-7 minutes, until liquid is absorbed.',
                'Warm taco shells according to package directions.',
                'Fill taco shells with beef mixture and desired toppings.'
            ],
            cuisineType: 'Mexican',
            preparationTime: 25,
            category: 'Dinner',
            likeCount: 105,
            ownerId: 'user789'
        },
    ];

    // Placeholder for current user's ID - replace with actual user context/auth later
    const currentUserId = 'user789'; // Example: user789 is the owner of rec3, so they can't like it.
                                    // For rec1 and rec2, user789 is not the owner, so they can like.


    useEffect(() => {
        setLoading(true);
        setError(null);
        // In a real app, you'd fetch from your backend:
        // fetch(`/api/recipes/${id}`)
        //   .then(res => res.json())
        //   .then(data => {
        //     setRecipe(data);
        //     // Check if the current user is the owner of this recipe
        //     setIsOwner(data.ownerId === currentUserId);
        //     setLoading(false);
        //   })
        //   .catch(err => {
        //     setError('Failed to fetch recipe details.');
        //     setLoading(false);
        //   });

        // Simulate API call with dummy data
        const foundRecipe = dummyRecipes.find(r => r._id === id);
        if (foundRecipe) {
            setRecipe(foundRecipe);
            setIsOwner(foundRecipe.ownerId === currentUserId);
            setLoading(false);
        } else {
            setError('Recipe not found.');
            setLoading(false);
        }
    }, [id, currentUserId]); // Re-run if ID or currentUserId changes

    const handleLike = () => {
        if (isOwner) {
            alert("You cannot like your own recipe!"); // Replace with Toast/SweetAlert
            return;
        }
        // In a real app, you'd send a request to your backend to increment like count
        // fetch(`/api/recipes/${recipe._id}/like`, { method: 'POST' })
        //   .then(res => res.json())
        //   .then(updatedRecipe => {
        //     setRecipe(updatedRecipe); // Update recipe state with new like count
        //   })
        //   .catch(err => alert('Failed to like recipe.'));

        // Simulate like increment for dummy data
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            likeCount: prevRecipe.likeCount + 1,
        }));
        alert('Recipe liked!'); // Replace with Toast/SweetAlert
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
                <span className="loading loading-spinner loading-lg"></span>
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
                <p>No recipe data available.</p>
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
                            src={recipe.image}
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
                            <span className="font-semibold">Category:</span> {recipe.category}
                        </p>

                        {/* Like Count Display */}
                        <div className="flex items-center text-lg text-green-400 mb-4">
                             {/* You can use FaHeart icon here if react-icons is installed */}
                            <span className="mr-2 text-3xl">❤️</span>
                            <span className="font-bold">{recipe.likeCount}</span> people interested in this recipe
                        </div>

                        {/* Like Button */}
                        <button
                            onClick={handleLike}
                            disabled={isOwner} // Disable if the current user is the owner
                            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-md text-lg font-semibold transition-colors duration-300
                                ${isOwner
                                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    : 'bg-red-500 hover:bg-red-600 text-white'
                                }`}
                        >
                            {/* {FaHeart && <FaHeart className="text-xl" />} */} {/* Uncomment if using react-icons */}
                            Like This Recipe
                        </button>
                        {isOwner && (
                            <p className="text-red-300 text-sm mt-2">You cannot like your own recipe.</p>
                        )}
                    </div>
                </div>

                {/* Ingredients Section */}
                <section className="mb-8">
                    <h2 className="text-3xl font-bold text-blue-400 mb-4 border-b pb-2 border-gray-700">Ingredients</h2>
                    <ul className="list-disc list-inside space-y-2 text-lg text-gray-300">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </section>

                {/* Instructions Section */}
                <section>
                    <h2 className="text-3xl font-bold text-blue-400 mb-4 border-b pb-2 border-gray-700">Instructions</h2>
                    <ol className="list-decimal list-inside space-y-3 text-lg text-gray-300">
                        {recipe.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>
                </section>
            </div>
        </div>
    );
};

export default RecipeDetails;