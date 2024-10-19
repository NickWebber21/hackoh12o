import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaUber, FaCar, FaClock, FaRoad, FaArrowLeft } from 'react-icons/fa';
import { SiLyft } from 'react-icons/si';
import Navbar from './Navbar';
import Footer from './Footer';

function ResultsPage() {
  const location = useLocation();
  const { results } = location.state || { results: { uber: {}, lyft: {} } };

  return (
      <div className="min-h-screen flex flex-col bg-light bg-hero-pattern">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <h1 className="text-4xl font-bold text-center mb-10 text-primary">Ride Comparison Results</h1>

              <div className="flex flex-col md:flex-row gap-8 justify-center">
                {/* Results Section */}
                <div className="md:w-1/2">
                  <div className="space-y-6">
                    <ResultField label="Uber" result={results.uber} icon={<FaUber />} />
                    <ResultField label="Lyft" result={results.lyft} icon={<SiLyft />} />
                  </div>
                </div>

                {/* Map Section */}
                <div className="md:w-1/2">
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <div
                      className="h-96"
                      style={{
                        background: 'linear-gradient(135deg, #EADEDA 0%, #C4A77D 100%)',
                        position: 'relative',
                      }}
                    >
                      {/* Fake map markers */}
                      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-secondary rounded-full animate-pulse"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-accent rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              <Link to="/" className="mt-8 inline-flex items-center text-accent hover:text-primary transition-colors duration-300">
                <FaArrowLeft className="mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }


function ResultField({ label, result, icon }) {
  return (
    <div className="bg-light bg-opacity-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center mb-4">
        {React.cloneElement(icon, { className: "text-3xl text-accent mr-3" })}
        <h2 className="text-2xl font-semibold text-primary">{label}</h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <InfoItem icon={<FaCar />} label="Price" value={`$${result.price}`} />
        <InfoItem icon={<FaRoad />} label="Distance" value={result.distance} />
        <InfoItem icon={<FaClock />} label="Duration" value={result.duration} />
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center">
      {React.cloneElement(icon, { className: "text-2xl text-neutral mb-1" })}
      <span className="text-sm text-neutral">{label}</span>
      <span className="font-semibold text-accent">{value}</span>
    </div>
  );
}

export default ResultsPage;
