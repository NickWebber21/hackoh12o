function App() {
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
          className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
        />
      </div>

      {/* Enter Button */}
      <div className="text-center mb-8">
        <button
          id="enterButton"
          className="w-full bg-blue-600 text-white text-lg font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
        >
          Enter
        </button>
      </div>

      {/* Results Section */}
      <div className="mb-6">
        <label htmlFor="result1" className="block text-lg font-medium text-gray-700">
          Result 1
        </label>
        <input
          type="text"
          id="result1"
          readOnly
          className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-lg"
        />
      </div>

      <div>
        <label htmlFor="result2" className="block text-lg font-medium text-gray-700">
          Result 2
        </label>
        <input
          type="text"
          id="result2"
          readOnly
          className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-lg"
        />
      </div>
    </div>
  </div>
  );
}

export default App;
