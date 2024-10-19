import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [startingPoint, setStartingPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');

  // Function to handle button click
  const handleClick = async () => {
    try {
      // Make a POST request to your backend
      const response = await axios.post('http://localhost:5000/compare', {
        startLocation: startingPoint,
        endLocation: destination,
      });

      // Update state with the results
      setResult1(response.data.uber); // Assuming your backend returns an object with `uber`
      setResult2(response.data.lyft); // Assuming it returns an object with `lyft`
    } catch (error) {
      console.error('Error fetching data:', error);
      // Optionally, handle errors here (e.g., set an error state)
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to RidePare</h1>

        {/* Input Section */}
        <div className="mb-6">
          <label htmlFor="input1" className="block text-lg font-medium text-gray-700">
            Starting Point
          </label>
          <input
            type="text"
            id="input1"
            value={startingPoint}
            onChange={(e) => setStartingPoint(e.target.value)} // Update state on input change
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="input2" className="block text-lg font-medium text-gray-700">
            Destination
          </label>
          <input
            type="text"
            id="input2"
            value={destination}
            onChange={(e) => setDestination(e.target.value)} // Update state on input change
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
        </div>

        {/* Enter Button */}
        <div className="text-center mb-8">
          <button
            id="enterButton"
            onClick={handleClick} // Call the handleClick function on button click
            className="w-full bg-blue-600 text-white text-lg font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
          >
            Enter
          </button>
        </div>

        {/* Results Section */}
        <div className="mb-6">
          <label htmlFor="result1" className="block text-lg font-medium text-gray-700">
            Result 1 (Uber)
          </label>
          <input
            type="text"
            id="result1"
            value={result1}
            readOnly
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-lg"
          />
        </div>

        <div>
          <label htmlFor="result2" className="block text-lg font-medium text-gray-700">
            Result 2 (Lyft)
          </label>
          <input
            type="text"
            id="result2"
            value={result2}
            readOnly
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
