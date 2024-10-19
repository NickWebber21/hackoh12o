import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaRoute, FaExchangeAlt, FaCar, FaSpinner } from 'react-icons/fa';
import { Autocomplete, LoadScript } from '@react-google-maps/api';
import Navbar from './Navbar';
import Footer from './Footer';

function HomePage() {
  const [startingPoint, setStartingPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    setIsLoading(true);
    setTimeout(() => {
      const mockResults = {
        uber: { price: 25.50, distance: "10 km", duration: "15 mins" },
        lyft: { price: 23.75, distance: "10 km", duration: "15 mins" },
        startLocation: { lat: 40.7128, lng: -74.0060 }, // Example coordinates (New York City)
        endLocation: { lat: 40.7484, lng: -73.9857 }   // Example coordinates (Empire State Building)
      };
      setIsLoading(false);
      navigate('/results', { state: { results: mockResults } });
    }, 1500);
  };

  const swapLocations = () => {
    setStartingPoint(destination);
    setDestination(startingPoint);
  };

  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY} libraries={['places']}>
      <div className="min-h-screen flex flex-col bg-light bg-hero-pattern">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-xl transform hover:scale-105">
            <h2 className="text-3xl font-bold text-center mb-6 text-primary flex items-center justify-center">
              <FaCar className="mr-3" /> Compare Rides
            </h2>
            <p className="text-neutral text-center mb-6">
              Find the best ride for your journey. Enter your locations below.
            </p>
            <div className="space-y-6">
              <AutocompleteInput
                id="input1"
                label="Starting Point"
                value={startingPoint}
                onChange={(address) => setStartingPoint(address)}
                icon={<FaMapMarkerAlt className="text-accent" />}
              />

              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={swapLocations}
                    className="bg-primary p-2 rounded-full hover:bg-secondary transition-colors duration-300 transform hover:rotate-180"
                    aria-label="Swap locations"
                  >
                    <FaExchangeAlt className="text-white" />
                  </button>
                </div>
              </div>

              <AutocompleteInput
                id="input2"
                label="Destination"
                value={destination}
                onChange={(address) => setDestination(address)}
                icon={<FaRoute className="text-accent" />}
              />

              <button
                onClick={handleClick}
                disabled={isLoading}
                className="w-full bg-accent text-white text-lg font-semibold py-4 px-6 rounded-lg
                           hover:bg-secondary transition-all duration-300 ease-in-out
                           focus:outline-none focus:ring-4 focus:ring-accent focus:ring-opacity-50
                           disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center justify-center"
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin-slow mr-2" />
                ) : null}
                Compare Rides
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </LoadScript>
  );
}

// Autocomplete Input Component
function AutocompleteInput({ id, label, value, onChange, icon }) {
  const [autocomplete, setAutocomplete] = useState(null);
  const [inputValue, setInputValue] = useState(value);

  const handleLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const handlePlaceChanged = () => {
    const place = autocomplete.getPlace();
    onChange(place.formatted_address || ''); // Pass the formatted address back to the parent
    setInputValue(place.formatted_address || '');
  };

  return (
    <div>
      <label htmlFor={id} className="block text-lg font-medium text-neutral mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
          <input
            type="text"
            id={id}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full pl-10 pr-3 py-3 border border-neutral rounded-lg shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
                       text-lg bg-white text-accent"
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        </Autocomplete>
      </div>
    </div>
  );
}

export default HomePage;
