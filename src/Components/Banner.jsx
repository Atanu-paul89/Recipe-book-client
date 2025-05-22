import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { NavLink } from 'react-router'; 


const banner1 = "https://images.unsplash.com/photo-1608120181805-8896890318da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const banner2 = "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?q=80&w=2136&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const banner3 = "https://images.unsplash.com/photo-1699345461139-73dfeecab9b6?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const banner4 = "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=2088&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const banner5 = "https://images.unsplash.com/photo-1559203244-78de52adba0e?q=80&w=1943&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const banner6 = "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const banner7 = "https://images.unsplash.com/photo-1657517579655-57e2156c6271?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";


const Banner = () => {
    return (
        <div className=' md:px-10 mt-2 md:mt-3'>
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
                <SwiperSlide>
                    <div
                        className="bg-no-repeat bg-cover bg-center h-64 md:h-[500px] rounded-2xl relative flex items-center justify-center" 
                        style={{ backgroundImage: `url('${banner1}')` }}
                    >
                        {/* Overlay for text readability */}
                        <div className="absolute inset-0 bg-black opacity-40 rounded-2xl"></div>
                        <div className="relative text-white text-center p-4">
                            <h2 className="text-xl md:text-4xl font-bold mb-2">Explore Delicious Recipes</h2>
                            <p className="text-sm md:text-lg">Discover a world of culinary delights from various cuisines.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="bg-no-repeat bg-cover bg-center h-64 md:h-[500px] rounded-2xl relative flex items-center justify-center"
                        style={{ backgroundImage: `url('${banner2}')` }}
                    >
                         <div className="absolute inset-0 bg-black opacity-40 rounded-2xl"></div>
                        <div className="relative text-white text-center p-4">
                            <h2 className="text-xl md:text-4xl font-bold mb-2">Your Next Favorite Meal Awaits</h2>
                            <p className="text-sm md:text-lg">From quick bites to gourmet feasts, find recipes for every occasion.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="bg-no-repeat bg-cover bg-center h-64 md:h-[500px] rounded-2xl relative flex items-center justify-center"
                        style={{ backgroundImage: `url('${banner3}')` }}
                    >
                         <div className="absolute inset-0 bg-black opacity-40 rounded-2xl"></div>
                        <div className="relative text-white text-center p-4">
                            <h2 className="text-xl md:text-4xl font-bold mb-2">Share Your Culinary Creations</h2>
                            <p className="text-sm md:text-lg">Add your unique recipes and inspire other food enthusiasts.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="bg-no-repeat bg-cover bg-center h-64 md:h-[500px] rounded-2xl relative flex items-center justify-center"
                        style={{ backgroundImage: `url('${banner4}')` }}
                    >
                         <div className="absolute inset-0 bg-black opacity-40 rounded-2xl"></div>
                        <div className="relative text-white text-center p-4">
                            <h2 className="text-xl md:text-4xl font-bold mb-2">Taste the World: Diverse Cuisines</h2>
                            <p className="text-sm md:text-lg">Italian, Mexican, Indian, Chinese, and many more recipes to try.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="bg-no-repeat bg-cover bg-center h-64 md:h-[500px] rounded-2xl relative flex items-center justify-center"
                        style={{ backgroundImage: `url('${banner5}')` }}
                    >
                         <div className="absolute inset-0 bg-black opacity-40 rounded-2xl"></div>
                        <div className="relative text-white text-center p-4">
                            <h2 className="text-xl md:text-4xl font-bold mb-2">Quick & Easy, or Gourmet Delights</h2>
                            <p className="text-sm md:text-lg">Find recipes for every skill level and preparation time.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="bg-no-repeat bg-cover bg-center h-64 md:h-[500px] rounded-2xl relative flex items-center justify-center"
                        style={{ backgroundImage: `url('${banner6}')` }}
                    >
                         <div className="absolute inset-0 bg-black opacity-40 rounded-2xl"></div>
                        <div className="relative text-white text-center p-4">
                            <h2 className="text-xl md:text-4xl font-bold mb-2">Save Your Favorites</h2>
                            <p className="text-sm md:text-lg">Curate your own collection of must-try recipes.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="bg-no-repeat bg-cover bg-center h-64 md:h-[500px] rounded-2xl relative flex items-center justify-center"
                        style={{ backgroundImage: `url('${banner7}')` }}
                    >
                         <div className="absolute inset-0 bg-black opacity-40 rounded-2xl"></div>
                        <div className="relative text-white text-center p-4">
                            <h2 className="text-xl md:text-4xl font-bold mb-2">Join Our Foodie Community</h2>
                            <p className="text-sm md:text-lg">Connect with other passionate cooks and food lovers.</p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            </NavLink>


        </div>
    );
};

export default Banner;