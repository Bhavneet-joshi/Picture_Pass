import React from "react";
import HeroSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "./Arrows.component";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
    const banners = [
        {
            id: 1,
            image: "/carousel (1).jpg",
            title: "Latest Movies",
            description: "Watch the newest releases in theaters"
        },
        {
            id: 2,
            image: "/carousel (2).jpg",
            title: "Blockbuster Hits",
            description: "Experience the biggest movies of the year"
        },
        {
            id: 3,
            image: "/carousel (3).jpg",
            title: "Premium Experience",
            description: "Enjoy movies in premium theaters"
        },
        {
            id: 4,
            image: "/carousel (4).jpg",
            title: "Special Events",
            description: "Exclusive premieres and special screenings"
        },
        {
            id: 5,
            image: "/carousel (5).jpg",
            title: "Family Entertainment",
            description: "Perfect movies for the whole family"
        }
    ];

    const settingsLg = {
        arrows: true,
        autoplay: true,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: "300px",
        infinite: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    const settings = {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <>
            {/* Mobile Banner */}
            <div className="lg:hidden">
                <HeroSlider {...settings}>
                    {banners.map((banner) => (
                        <div key={banner.id} className="relative">
                            <img 
                                src={banner.image} 
                                alt={banner.title}
                                className="w-full h-[200px] md:h-[300px] object-cover"
                                onError={(e) => {
                                    console.error(`Error loading image: ${banner.image}`);
                                    e.target.src = "/logo.png"; // Fallback image
                                }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                <h2 className="text-white text-xl font-bold">{banner.title}</h2>
                                <p className="text-white/80 text-sm">{banner.description}</p>
                            </div>
                        </div>
                    ))}
                </HeroSlider>
            </div>

            {/* Desktop Banner */}
            <div className="hidden lg:block">
                <HeroSlider {...settingsLg}>
                    {banners.map((banner) => (
                        <div key={banner.id} className="relative">
                            <img 
                                src={banner.image} 
                                alt={banner.title}
                                className="w-full h-[400px] object-cover rounded-lg"
                                onError={(e) => {
                                    console.error(`Error loading image: ${banner.image}`);
                                    e.target.src = "/logo.png"; // Fallback image
                                }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                                <h2 className="text-white text-2xl font-bold">{banner.title}</h2>
                                <p className="text-white/80 text-lg">{banner.description}</p>
                            </div>
                        </div>
                    ))}
                </HeroSlider>
            </div>
        </>
    );
};

export default Banner;