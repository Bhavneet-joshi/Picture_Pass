import React from 'react'

import Banner from '../components/carousel/Banner_carousel';
import CrouselTemplate from '../components/carousel/Carousel_template';
import Footer from '../components/footer/Footer';

export default function Home() {
    return (
        <div className="bg-gradient-to-l md:bg-gradient-to-r">
            <Banner />
            <CrouselTemplate url="discover/movie" heading="Recomended Videos" />
            <CrouselTemplate url="movie/upcoming" heading="Upcomings" />
            <CrouselTemplate url="discover/tv" heading="Tv Shows" type="tv" />
            <Footer />
        </div>
    )
}