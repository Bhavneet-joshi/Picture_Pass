import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlay, FaPlus } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SeatSelection from '../components/SeatSelection';
import ErrorBoundary from '../components/ErrorBoundary';
import LoadingSpinner from '../components/LoadingSpinner';
import TrailerModal from '../components/TrailerModal';
import Slider from 'react-slick';

const LgSize = ({ movie, movieCrew, selectedDate, setSelectedDate, selectedTime, setSelectedTime, selectedSeats, onSeatSelect, selectedParkingSpot, onParkingSpotSelect, showParking, setShowParking, selectedTheater, setSelectedTheater, onWatchTrailer }) => {
  const sliderSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Movie Details */}
      <section className="bg-dark-800 p-4 md:p-8">
        <div className="container mx-auto flex flex-col md:flex-row gap-4 md:gap-8">
          <Card hover={false} className="w-full md:w-64 h-64 md:h-96 mx-auto">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </Card>
          
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{movie.title}</h2>
            <div className="flex flex-wrap gap-2 md:gap-4 mb-6">
              {movie.genres?.map((genre) => (
                <span key={genre.id} className="px-3 py-1 text-sm rounded bg-dark-700 text-white">
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="text-gray-400 mb-6 md:mb-8 max-w-3xl leading-relaxed">{movie.overview}</p>
            
            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              <div className="flex flex-col md:flex-row md:gap-8">
                <span className="text-gray-400 w-24">Director</span>
                <span className="text-white">
                  {movieCrew.find(crew => crew.job === 'Director')?.name || 'Unknown'}
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:gap-8">
                <span className="text-gray-400 w-24">Writers</span>
                <span className="text-white">
                  {movieCrew
                    .filter(crew => crew.department === 'Writing')
                    .map(writer => writer.name)
                    .slice(0, 2)
                    .join(', ')}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                icon={<FaPlay />} 
                className="w-full sm:w-auto"
                onClick={onWatchTrailer}
              >
                WATCH TRAILER
              </Button>
              <Button variant="outline" icon={<FaPlus />} className="w-full sm:w-auto">
                TO WATCHLIST
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Cast Section */}
      <section className="bg-dark-900 p-4 md:p-8">
        <div className="container mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Cast</h3>
          <Slider {...sliderSettings}>
            {movieCrew.slice(0, 12).map((crew) => (
              <div key={crew.id} className="px-2">
                <Card className="h-full">
                  <div className="p-4">
                    <h4 className="text-white font-semibold truncate">{crew.name}</h4>
                    <p className="text-gray-400 text-sm truncate">{crew.job}</p>
                  </div>
                </Card>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Date and Time Selection */}
      <section className="bg-dark-900 p-4 md:p-8">
        <div className="container mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Select Date & Time</h3>
          
          <div className="flex overflow-x-auto gap-2 md:gap-4 mb-6 md:mb-8 pb-2">
            {['11', '12', '13', '14', '15'].map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-lg whitespace-nowrap ${
                  selectedDate === date
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-800 text-gray-400 hover:bg-dark-700'
                }`}
              >
                {date}
              </button>
            ))}
          </div>
     
          <div className="flex overflow-x-auto gap-2 md:gap-4 mb-6 md:mb-8 pb-2">
            {['14:00', '17:00', '20:00', '23:00'].map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-lg whitespace-nowrap ${
                  selectedTime === time
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-800 text-gray-400 hover:bg-dark-700'
                }`}
              >
                {time}
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <select
              value={selectedTheater}
              onChange={(e) => setSelectedTheater(e.target.value)}
              className="w-full md:w-auto bg-dark-800 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="ocean">Ocean Mall</option>
              <option value="downtown">Downtown</option>
              <option value="westside">Westside</option>
            </select>
          </div>
        </div>
      </section>

      {/* Seat Selection */}
      <SeatSelection
        selectedSeats={selectedSeats}
        onSeatSelect={onSeatSelect}
        selectedParkingSpot={selectedParkingSpot}
        onParkingSpotSelect={onParkingSpotSelect}
        showParking={showParking}
        setShowParking={setShowParking}
        movie={movie}
      />
    </div>
  );
};

export default function SoloMovie(props) {
  const [movie, setMovie] = useState([]);
  const [movieCrew, setMovieCrew] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const { id } = useParams();
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY || '3fd2be6f0c70a2a598f084ddfb75487c'; // Default key for deployment fallback
  const URL = `https://api.themoviedb.org/3${props.url}/${id}?api_key=${API_KEY}`;
  const CREDITS_URL = `https://api.themoviedb.org/3${props.url}/${id}/credits?api_key=${API_KEY}`;
  const VIDEOS_URL = `https://api.themoviedb.org/3${props.url}/${id}/videos?api_key=${API_KEY}`;

  const [selectedDate, setSelectedDate] = useState('11');
  const [selectedTime, setSelectedTime] = useState('17:00');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState('ocean');
  const [selectedParkingSpot, setSelectedParkingSpot] = useState(null);
  const [showParking, setShowParking] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch movie data: ${response.status} ${response.statusText}`);
        }
        const jsonData = await response.json();
        setMovie(jsonData);

        const crewResponse = await fetch(CREDITS_URL);
        if (!crewResponse.ok) {
          throw new Error(`Failed to fetch crew data: ${crewResponse.status} ${crewResponse.statusText}`);
        }
        const crewData = await crewResponse.json();
        setMovieCrew(crewData.crew);

        // Fetch trailer data
        const videosResponse = await fetch(VIDEOS_URL);
        if (!videosResponse.ok) {
          throw new Error(`Failed to fetch videos data: ${videosResponse.status} ${videosResponse.statusText}`);
        }
        const videosData = await videosResponse.json();
        const officialTrailer = videosData.results.find(
          video => video.type === 'Trailer' && video.official
        );
        if (officialTrailer) {
          setTrailerKey(officialTrailer.key);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [URL, CREDITS_URL, VIDEOS_URL]);

  const handleSeatSelection = (seatId) => {
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleParkingSpotSelection = (spotId) => {
    setSelectedParkingSpot(spotId);
  };

  const handleWatchTrailer = () => {
    if (trailerKey) {
      setIsTrailerOpen(true);
    } else {
      setError('Trailer not available for this movie.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-dark-900">
        <LgSize
          movie={movie}
          movieCrew={movieCrew}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          selectedSeats={selectedSeats}
          onSeatSelect={handleSeatSelection}
          selectedParkingSpot={selectedParkingSpot}
          onParkingSpotSelect={handleParkingSpotSelection}
          showParking={showParking}
          setShowParking={setShowParking}
          selectedTheater={selectedTheater}
          setSelectedTheater={setSelectedTheater}
          onWatchTrailer={handleWatchTrailer}
        />
      </div>
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        trailerKey={trailerKey}
      />
    </ErrorBoundary>
  );
}
