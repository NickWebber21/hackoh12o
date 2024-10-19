import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [startingPoint, setStartingPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');

  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/compare', {
        startLocation: startingPoint,
        endLocation: destination,
      });
<<<<<<< HEAD

      // Update state with the results
      setResult1(`Uber: $${response.data.uber.price.toFixed(2)} | Distance: ${response.data.uber.distance} | Duration: ${response.data.uber.duration}`);
      setResult2(`Lyft: $${response.data.lyft.price.toFixed(2)} | Distance: ${response.data.lyft.distance} | Duration: ${response.data.lyft.duration}`);
=======
      setResult1(response.data.uber);
      setResult2(response.data.lyft);
>>>>>>> styling/frontend
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary to-secondary flex items-center justify-center min-h-screen p-4">
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl w-full max-w-xl backdrop-blur-sm">
        <h1 className="text-5xl font-bold text-center mb-10 text-primary">Welcome to RidePare</h1>

        <div className="space-y-6">
          <InputField
            id="input1"
            label="Starting Point"
            value={startingPoint}
            onChange={(e) => setStartingPoint(e.target.value)}
          />

          <InputField
            id="input2"
            label="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <button
            onClick={handleClick}
            className="w-full bg-primary text-light text-lg font-semibold py-4 px-6 rounded-lg
                       hover:bg-accent transition-colors duration-300 ease-in-out
                       focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50"
          >
            Compare Rides
          </button>

          <ResultField
            id="result1"
            label="Uber Price"
            value={result1}
          />

          <ResultField
            id="result2"
            label="Lyft Price"
            value={result2}
          />
        </div>
      </div>
    </div>
  );
}

function InputField({ id, label, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block text-lg font-medium text-neutral mb-2">
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-neutral rounded-lg shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                   text-lg bg-white bg-opacity-75 text-accent"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );
}

function ResultField({ id, label, value }) {
  return (
    <div>
      <label htmlFor={id} className="block text-lg font-medium text-neutral mb-2">
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        readOnly
        className="w-full px-4 py-3 border border-neutral rounded-lg shadow-sm
                   bg-light bg-opacity-50 text-lg text-accent font-semibold"
      />
    </div>
  );
}

export default App;
