import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import settings from '../config/setting';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

export default function CarouselTemplate(props) {
    const [images, setImages] = useState([]);
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY || '3fd2be6f0c70a2a598f084ddfb75487c'; // Default key for deployment fallback
    const URL = `https://api.themoviedb.org/3/${props.url}?api_key=${API_KEY}`;
    const onTop = () => document.documentElement.scrollTop = 0;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(URL);
                const jsonData = await response.json();
                const movies = jsonData.results;
                setImages(movies);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [URL]);

    return (
        <div className={props.isDark === "true" ? 'mx-auto w-5/6  bg-gray-950 text-white' : 'mx-auto w-5/6  lg:my-10 '}>
            <h1 className='lg:mx-5  my-2 mt-5 font-bold text-2xl'>{props.heading}</h1>
            <Slider {...settings} className='lg:py-1 '>
                {images.map((image) => {
                    return (
                        <Link  to={props.type==="tv"?`/tv/${image.id}`:`/movies/${image.id}`}  onClick={onTop}  key={image.id} className='px-5 outline-none lg:w-64'>
                            <img className={props.isDark === "true" ? 'lg:h-72 w-64 sm:h-44  h-44 md:h-56  rounded-t-xl cursor-pointer' : 'lg:h-72 w-64 sm:h-44  h-44 md:h-56  rounded-t cursor-pointer'} src={`https://image.tmdb.org/t/p/w500/${image.poster_path}`} alt="" />
                            {props.isDark === "true" ? <span className='bg-red-600 text-white rounded-br absolute font-bold top-0 p-1'>Premium</span> : ""}
                            <div className={props.isDark === "true" ? 'bg-white font-bold  rounded-bl-xl text-gray-950 p-2 gap-1 flex' : 'bg-gray-950 rounded-b text-white p-2 gap-1 flex'}>
                                <div className=' py-1 text-green-600 text-xl'>
                                    <AiFillStar />
                                </div>
                                {(Math.floor(image.popularity * 10) / 10).toFixed(1)}
                            </div>
                            {props.type === "tv" ?
                                <>
                                    <h1 className='font-bold cursor-pointer'>{image.name}</h1>
                                    <h1 className='cursor-pointer'>{image.original_language}</h1>
                                    <h2 className=' cursor-pointer'>{image.first_air_date}</h2>
                                </>
                                :
                                <>
                                    <h1 className='font-bold cursor-pointer'>{image.original_title}</h1>
                                    <h2 className=' cursor-pointer'>{image.release_date}</h2>
                                </>
                            }
                        </Link>
                    )
                })
                }
            </Slider>
        </div>
    );
}