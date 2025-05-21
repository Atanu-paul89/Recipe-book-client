
import Banner from '../Components/Banner';
import { NavLink } from 'react-router';

const dummyTopRecipes = [
    {
        _id: 'rec1',
        image: 'https://images.unsplash.com/photo-1728910107534-e04e261768ae?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Spicy Chicken Curry',
        cuisineType: 'Indian',
        likeCount: 150,
        description: 'A rich and aromatic chicken curry with a kick of spice, perfect for a cozy dinner.',
    },
    {
        _id: 'rec2',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Classic Margherita Pizza',
        cuisineType: 'Italian',
        likeCount: 120,
        description: 'The timeless Italian pizza with fresh basil, mozzarella, and a tangy tomato sauce.',
    },
    {
        _id: 'rec3',
        image: 'https://images.unsplash.com/photo-1627564803215-ad55bad5c5ea?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Savory Beef Tacos',
        cuisineType: 'Mexican',
        likeCount: 105,
        description: 'Flavorful ground beef tacos loaded with fresh salsa, cheese, and a hint of lime.',
    },
    {
        _id: 'rec4',
        image: 'https://images.unsplash.com/photo-1695606452836-c3c6e62d407b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Colorful Vegetable Stir-fry',
        cuisineType: 'Chinese',
        likeCount: 95,
        description: 'A quick and healthy stir-fry packed with vibrant vegetables and a savory sauce.',
    },
    {
        _id: 'rec5',
        image: 'https://images.unsplash.com/photo-1665556387816-cba60197beec?q=80&w=2130&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Decadent Chocolate Lava Cake',
        cuisineType: 'Dessert',
        likeCount: 88,
        description: 'Rich, warm chocolate cake with a gooey, molten center, perfect for any craving.',
    },
    {
        _id: 'rec6',
        image: 'https://images.unsplash.com/photo-1579349443343-73da56a71a20?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Nutrient-Rich Vegan Buddha Bowl',
        cuisineType: 'Vegan',
        likeCount: 80,
        description: 'A wholesome and satisfying bowl with roasted vegetables, grains, and a creamy dressing.',
    },
];


const Home = () => {
    const scrollToTopAndNavigate = () => {
        window.scrollTo(0, 0);
    };
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
                        {dummyTopRecipes.map(recipe => (
                            <div key={recipe._id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:scale-105 transition-transform duration-300">
                                <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-white mb-2">{recipe.title}</h3>
                                    <p className="text-gray-400 text-sm mb-1">Cuisine: <span className="font-medium text-gray-200">{recipe.cuisineType}</span></p>
                                    <p className="text-gray-400 text-sm mb-3">Likes: <span className="font-medium text-blue-300">{recipe.likeCount}</span></p>
                                    <p className="text-gray-300 text-base mb-4 line-clamp-2">{recipe.description}</p> {/* Added line-clamp for description */}

                                    {/* You will use NavLink for actual navigation here */}
                                    <NavLink to={`/recipe/${recipe._id}`} className="block text-center">
                                        <button onClick={scrollToTopAndNavigate}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer"
                                        >
                                            View Details
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        {/* You will use NavLink for actual navigation here */}
                        <NavLink to="/allrecipes">
                            <button onClick={scrollToTopAndNavigate}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                            >
                                See All Recipes
                            </button>
                        </NavLink>
                    </div>
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