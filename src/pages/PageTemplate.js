import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { AiFillStar } from 'react-icons/ai';

import LanguageList from '../components/Languagelist.js';

export default function Pagetemplate(props) {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY || '3fd2be6f0c70a2a598f084ddfb75487c'; // Default key for deployment fallback
    const URL = `https://api.themoviedb.org/3/${props.url}?api_key=${API_KEY}`;
    const [selectedLanguage, setSelectedLanguage] = useState(''); // Track selected language
    const onTop = () =>
        document.documentElement.scrollTop = 0;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch(
                    selectedLanguage
                        ? `${URL}&with_original_language=${selectedLanguage}`
                        : URL
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                const movies = jsonData.results;
                setImages(movies);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [selectedLanguage, URL]);

    if (isLoading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600">Error: {error}</div>;
    }

    return (
        <div className='mx-16 my-10 flex'>
            <div className='border-red-600 lg:w-5/6 lg:block md:hidden sm:hidden hidden  '>
                <h1 className='font-bold text-2xl text-red-600'>Filters</h1>
                <div className="grid divide-y divide-neutral-200 max-w-xl ml-5 mt-8">
                    <div className="pb-5">
                        <details className="group">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                <span className=' text-red-600'>Languages</span>
                                <span className="transition group-open:rotate-180 text-red-600" aria-hidden="true">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                    </svg>
                                </span>
                            </summary>
                            <div className="text-neutral-600 mt-3 group-open:animate-fadeIn flex gap-2">
                                <LanguageList
                                    selectedLanguage={selectedLanguage}
                                    onSelectLanguage={setSelectedLanguage}
                                />
                            </div>
                        </details>
                    </div>
                    <div className="py-5">
                        <details className="group">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                <span className=' text-red-600'>Genres</span>
                                <span className="transition group-open:rotate-180 text-red-600" aria-hidden="true">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                    </svg>
                                </span>
                            </summary>
                            <div className="text-neutral-600 mt-3 group-open:animate-fadeIn flex gap-2 flex-wrap">
                                <span value="Action" className='cursor-pointer border p-1 mt-1 inline text-red-600' role="button" tabIndex={0}>Action</span>
                                <span value="Drama" className='cursor-pointer border p-1  mt-1 inline text-red-600' role="button" tabIndex={0}>Drama</span>
                                <span value="Adventure" className='cursor-pointer border p-1  mt-1 inline text-red-600' role="button" tabIndex={0}>Adventure</span>
                                <span value="Comedy" className='cursor-pointer border p-1  mt-1 inline text-red-600' role="button" tabIndex={0}>Comedy</span>
                            </div>
                        </details>
                    </div>
                </div>
            </div>

            <div className="py-4 flex flex-wrap">
                {images.length === 0 ? (
                    <p className="text-red-600 font-bold">
                        No movies or TV shows found for the selected language.
                    </p>
                ) : (
                    images.map((image) => {
                        return (
                            <Link 
                                to={props.type === "tv" ? `/tv/${image.id}` : `/movies/${image.id}`} 
                                onClick={onTop} 
                                className='sm:px-5 px-2 md:w-52 lg:w-64 sm:w-44 w-40 mx-auto outline-none mt-5' 
                                key={image.id}
                            >
                                <img 
                                    className='lg:h-72 lg:w-64 rounded-t cursor-pointer' 
                                    src={`https://image.tmdb.org/t/p/w500/${image.poster_path}`} 
                                    alt={`${props.type === "tv" ? image.name : image.original_title} poster`}
                                />
                                <div className='bg-slate-950 rounded-b text-white p-2 gap-1 flex'>
                                    <div className='py-1 text-green-600 text-xl'>
                                        <AiFillStar aria-hidden="true" />
                                    </div>
                                    {(Math.floor(image.popularity * 10) / 10).toFixed(1)}
                                </div>
                                {props.type === "tv" ? (
                                    <>
                                        <h1 className='font-bold cursor-pointer'>{image.name}</h1>
                                        <div className='flex gap-2'>
                                            <h2 className='cursor-pointer'>{image.first_air_date}</h2>
                                            <p className='cursor-pointer text-gray-500'>({image.original_language})</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h1 className='font-bold cursor-pointer'>{image.original_title}</h1>
                                        <h2 className='cursor-pointer'>{image.release_date}</h2>
                                    </>
                                )}
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
}
