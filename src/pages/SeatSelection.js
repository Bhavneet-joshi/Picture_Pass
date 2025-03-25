import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCar, FaTicketAlt } from 'react-icons/fa';

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedParkingSpot, setSelectedParkingSpot] = useState(null);
  const [showParking, setShowParking] = useState(false);
  const [takenSeats] = useState(['A1', 'A2', 'B3', 'C4', 'D5']);
  const [parkingSpots] = useState(['P1', 'P2', 'P3', 'P4', 'P5']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [movie, setMovie] = useState({ title: "Movie" });
  
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch movie details
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        const API_KEY = process.env.REACT_APP_TMDB_API_KEY || '3fd2be6f0c70a2a598f084ddfb75487c';
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        console.error('Error fetching movie:', err);
        setError('Could not load movie details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovie();
  }, [id]);

  // Calculate total amount
  const totalAmount = (selectedSeats.length * 399) + (selectedParkingSpot ? 99 : 0);

  const handleSeatSelect = (seat) => {
    setSelectedSeats(prev => 
      prev.includes(seat) 
        ? prev.filter(s => s !== seat) 
        : [...prev, seat]
    );
  };

  const handleParkingSpotSelect = (spot) => {
    setSelectedParkingSpot(prev => prev === spot ? null : spot);
  };

  const handlePayment = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat to proceed.");
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY || "rzp_test_YourTestKeyHere", // Add default test key for deployment
      amount: totalAmount * 100, // Amount in paisa
      currency: "INR",
      name: "Picture Pass",
      description: `Booking for ${movie.title || movie.name}`,
      image: "https://picture-pass.vercel.app/logo.png", // Use absolute HTTPS URL
      handler: function(response) {
        if (response.razorpay_payment_id) {
          setSuccess(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
          // Here you would typically handle the successful payment,
          // such as recording the booking in your database
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      },
      modal: {
        ondismiss: function() {
          console.log("Payment modal closed");
        },
        escape: true,
        backdropclose: false
      },
      prefill: {
        name: "Movie Lover",
        email: "customer@example.com",
        contact: "9876543210"
      },
      theme: {
        color: "#dc2626"
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function(response) {
        console.error('Payment failed:', response.error);
        setError('Payment failed. Please try again.');
      });
      rzp.open();
    } catch (error) {
      console.error('Error initializing Razorpay:', error);
      setError('Payment service is currently unavailable. Please try again later.');
    }
  };

  return (
    <section className="bg-dark-900 p-4 md:p-8">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          {isLoading ? 'Loading...' : `Book Tickets for ${movie.title || movie.name}`}
        </h2>
        
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <p className="text-green-500">{success}</p>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Seat Selection */}
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Select Seats</h3>
            
            {/* Seat Legend */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-dark-800 border border-dark-700" />
                <span className="text-gray-400 text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-primary-500" />
                <span className="text-gray-400 text-sm">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-dark-700" />
                <span className="text-gray-400 text-sm">Taken</span>
              </div>
            </div>

            {/* Screen */}
            <div className="relative mb-12">
              <div className="h-2 bg-primary-500 rounded-full mb-8" />
              <span className="absolute top-4 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm">
                SCREEN
              </span>
            </div>

            {/* Seats Grid */}
            <div className="grid grid-cols-12 gap-2 mb-8">
              {Array.from({ length: 8 }, (_, i) => String.fromCharCode(65 + i)).map((row) => (
                <div key={row} className="flex flex-col items-center">
                  <span className="text-white mb-2">{row}</span>
                  {Array.from({ length: 12 }, (_, i) => `${row}${i + 1}`).map((seat) => (
                    <button
                      key={seat}
                      onClick={() => handleSeatSelect(seat)}
                      disabled={takenSeats.includes(seat)}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-lg mb-2 transition-colors ${
                        takenSeats.includes(seat)
                          ? 'bg-dark-700 cursor-not-allowed'
                          : selectedSeats.includes(seat)
                          ? 'bg-primary-500'
                          : 'bg-dark-800 hover:bg-dark-700'
                      }`}
                      aria-label={`Seat ${seat}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full md:w-80 bg-dark-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-400">
                  <FaTicketAlt />
                  <span>Movie Tickets</span>
                </div>
                <span className="text-white">
                  {selectedSeats.length} × ₹399
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-400">
                  <FaCar />
                  <span>Parking</span>
                </div>
                <span className="text-white">
                  {selectedParkingSpot ? '₹99' : 'Not Selected'}
                </span>
              </div>

              <div className="border-t border-dark-700 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <span className="text-lg font-semibold text-primary-500">
                    ₹{(selectedSeats.length * 399) + (selectedParkingSpot ? 99 : 0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setShowParking(true)}
                className="w-full py-3 border border-white text-white rounded-lg hover:bg-dark-700 transition-colors"
                disabled={isLoading}
              >
                + ADD PARKING
              </button>
              
              <button
                onClick={handlePayment}
                disabled={selectedSeats.length === 0 || isLoading}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  selectedSeats.length === 0 || isLoading
                    ? 'bg-dark-700 text-gray-400 cursor-not-allowed'
                    : 'bg-primary-500 text-white hover:bg-primary-600'
                }`}
              >
                {isLoading ? 'Processing...' : 'Buy Now'}
              </button>
            </div>
          </div>
        </div>

        {/* Parking Selection Modal */}
        {showParking && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80">
            <div className="bg-dark-800 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-white mb-6">Select Parking Spot</h3>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                {parkingSpots.map((spot) => (
                  <button
                    key={spot}
                    onClick={() => handleParkingSpotSelect(spot)}
                    className={`p-4 rounded-lg flex items-center justify-center ${
                      selectedParkingSpot === spot
                        ? 'bg-primary-500 text-white'
                        : 'bg-dark-700 text-gray-400 hover:bg-dark-600'
                    }`}
                  >
                    <FaCar className="mr-2" />
                    {spot}
                  </button>
                ))}
              </div>
              
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowParking(false)}
                  className="px-6 py-2 border border-dark-600 text-white rounded-lg hover:bg-dark-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowParking(false)}
                  className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SeatSelection; 