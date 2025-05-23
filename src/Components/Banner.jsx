import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { NavLink } from 'react-router'; 
import { useTypewriter, Cursor } from 'react-simple-typewriter'; // Newly added import

const banner1 = "https://images.unsplash.com/photo-1608120181805-8896890318da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const banner2 = "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?q=80&w=2136&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const banner3 = "https://images.unsplash.com/photo-1699345461139-73dfeecab9b6?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const banner4 = "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=2088&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVnfDB8fHx8fA%3D%3D";
const banner5 = "https://images.unsplash.com/photo-1559203244-78de52adba0e?q=80&w=1943&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const banner6 = "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const banner7 = "https://images.unsplash.com/photo-1657517579655-57e2156c6271?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";


const Banner = () => {
    // Newly added: Typewriter effect hook
    const [text] = useTypewriter({
        words: [
            'Explore Delicious Recipes',
            'Your Next Favorite Meal Awaits',
            'Share Your Culinary Creations',
            'Taste the World: Diverse Cuisines',
            'Quick & Easy, or Gourmet Delights',
            'Save Your Favorites',
            'Join Our Foodie Community'
        ],
        loop: {}, // Loop indefinitely
        typeSpeed: 70, // Speed of typing
        deleteSpeed: 50, // Speed of deleting
        delaySpeed: 1000, // Delay before next word starts typing
    });

    return (
        <div className='md:px-10 mt-2 md:mt-3'>
            {/* Banner Slider */}

            <NavLink to={'/allrecipes'}>
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    className="mySwiper mb-10"
                >
                    {/* Replaced individual SwiperSlides with a map for dynamic text */}
                    {[
                        {
                            image: banner1,
                            mainText: 'Explore Delicious Recipes',
                            subText: 'Discover a world of culinary delights from various cuisines.'
                        },
                        {
                            image: banner2,
                            mainText: 'Your Next Favorite Meal Awaits',
                            subText: 'From quick bites to gourmet feasts, find recipes for every occasion.'
                        },
                        {
                            image: banner3,
                            mainText: 'Share Your Culinary Creations',
                            subText: 'Add your unique recipes and inspire other food enthusiasts.'
                        },
                        {
                            image: banner4,
                            mainText: 'Taste the World: Diverse Cuisines',
                            subText: 'Italian, Mexican, Indian, Chinese, and many more recipes to try.'
                        },
                        {
                            image: banner5,
                            mainText: 'Quick & Easy, or Gourmet Delights',
                            subText: 'Find recipes for every skill level and preparation time.'
                        },
                        {
                            image: banner6,
                            mainText: 'Save Your Favorites',
                            subText: 'Curate your own collection of must-try recipes.'
                        },
                        {
                            image: banner7,
                            mainText: 'Join Our Foodie Community',
                            subText: 'Connect with other passionate cooks and food lovers.'
                        },
                    ].map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="bg-no-repeat bg-cover bg-center h-64 md:h-[500px] rounded-2xl relative flex items-center justify-center"
                                style={{ backgroundImage: `url('${slide.image}')` }}
                            >
                                {/* Overlay for text readability */}
                                <div className="absolute inset-0 bg-black opacity-40 rounded-2xl"></div>
                                <div className="relative text-white text-center p-4">
                                    {/* Newly modified: Use typewriter effect here */}
                                    <h2 className="text-xl md:text-4xl font-bold mb-2 min-h-[3rem] md:min-h-[4.5rem] flex items-center justify-center"> {/* Added min-height for consistent layout */}
                                        <span className="inline-block">{text}</span>
                                        <Cursor cursorColor="#4299E1" /> {/* Blue cursor for the dark theme */}
                                    </h2>
                                    <p className="text-sm md:text-lg">{slide.subText}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </NavLink>
        </div>
    );
};

export default Banner;