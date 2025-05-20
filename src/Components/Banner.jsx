 
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
        <div className='px-5 md:px-10 mt-5'>
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
                {/* ... Your existing SwiperSlides for the banners ... */}
                <SwiperSlide>
                    <div
                        className="bg-no-repeat bg-cover bg-center h-64 md:h-100 rounded-2xl relative"
                        style={{ backgroundImage: `url('${banner1}')` }}
                    >
                        <div className="text-white text-center py-8 md:py-16">
                            <h2 className="text-xl md:text-3xl font-bold">Welcome to Our Banglalink Payment Service</h2>
                            <p className="text-sm md:text-lg">Pay your monthly phone bill easily and securely.</p>
                        </div>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="bg-no-repeat bg-cover bg-center h-64 md:h-100 rounded-2xl relative"
                        style={{ backgroundImage: `url('${banner2}')` }}
                    >
                        <div className="text-white text-center py-8 md:py-16">
                            <h2 className="text-xl md:text-3xl font-bold">Welcome to Our Grameenphone Payment Service</h2>
                            <p className="text-sm md:text-lg">Pay your monthly phone bill easily and securely.</p>
                        </div>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="bg-no-repeat bg-cover bg-center h-64 md:h-100 rounded-2xl relative"
                        style={{ backgroundImage: `url('${banner3}')` }}
                    >
                        <div className="text-white text-center py-8 md:py-16">
                            <h2 className="text-xl md:text-3xl font-bold">Welcome to Our BEDB Payment Service</h2>
                            <p className="text-sm md:text-lg">Pay your monthly Electric bill easily and securely.</p>
                        </div>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="bg-no-repeat bg-cover bg-center h-64 md:h-100 rounded-2xl relative"
                        style={{ backgroundImage: `url('${banner4}')` }}
                    >
                        <div className="text-white text-center py-8 md:py-16">
                            <h2 className="text-xl md:text-3xl font-bold">Welcome to Our KGDC Payment Service</h2>
                            <p className="text-sm md:text-lg">Pay your monthly Gas bill easily and securely.</p>
                        </div>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="bg-no-repeat bg-cover bg-center h-64 md:h-100 rounded-2xl relative"
                        style={{ backgroundImage: `url('${banner5}')` }}
                    >
                        <div className="text-white text-center py-8 md:py-16">
                            <h2 className="text-xl md:text-3xl font-bold">Welcome to Our CWASA Payment Service</h2>
                            <p className="text-sm md:text-lg">Pay your monthly Water bill easily and securely.</p>
                        </div>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="bg-no-repeat bg-cover bg-center h-64 md:h-100 rounded-2xl relative"
                        style={{ backgroundImage: `url('${banner6}')` }}
                    >
                        <div className="text-white text-center py-8 md:py-16">
                            <h2 className="text-xl md:text-3xl font-bold">Welcome to Our Cloudone Payment Service</h2>
                            <p className="text-sm md:text-lg">Pay your monthly Wifi bill easily and securely.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="bg-no-repeat bg-cover bg-center h-64 md:h-100 rounded-2xl relative"
                        style={{ backgroundImage: `url('${banner7}')` }}
                    >
                        <div className="text-white text-center py-8 md:py-16">
                            <h2 className="text-xl md:text-3xl font-bold">Welcome to Our AkashDth Payment Service</h2>
                            <p className="text-sm md:text-lg">Pay your monthly TV bill easily and securely.</p>
                        </div>

                    </div>
                </SwiperSlide>
            </Swiper>
            </NavLink>


        </div>
    );
};

export default Banner;





