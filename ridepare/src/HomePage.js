import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaRoute, FaExchangeAlt, FaCar, FaSpinner } from 'react-icons/fa';
import { Autocomplete } from '@react-google-maps/api';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';

function HomePage() {
  const [startingPoint, setStartingPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/compare', {
        startLocation: startingPoint,
        endLocation: destination
      });

      const results = response.data;
      setIsLoading(false);
      navigate('/results', {
        state: {
          results: {
            ...results,
            startLocation: { lat: 0, lng: 0 }, // Replace with actual coordinates if available
            endLocation: { lat: 0, lng: 0 } // Replace with actual coordinates if available
          }
        }
      });
    } catch (error) {
      console.error('Error fetching ride comparison:', error);
      setIsLoading(false);
      // Handle the error appropriately, maybe show an error message to the user
    }
  };

  const swapLocations = () => {
    setStartingPoint(destination);
    setDestination(startingPoint);
  };

  return (
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
              onChange={setStartingPoint}
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
              onChange={setDestination}
              icon={<FaRoute className="text-accent" />}
            />

            <button
              onClick={handleClick}
              disabled={!startingPoint || !destination}
              className="w-full bg-accent text-white text-lg font-semibold py-4 px-6 rounded-lg
                         hover:bg-secondary transition-all duration-300 ease-in-out
                         focus:outline-none focus:ring-4 focus:ring-accent focus:ring-opacity-50
                         flex items-center justify-center
                         disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
}

function AutocompleteInput({ id, label, value, onChange, icon }) {
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      onChange(place.formatted_address);
    }
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
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
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
