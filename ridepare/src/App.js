import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import ResultsPage from './ResultsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageWrapper />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

function HomePageWrapper() {
  const location = useLocation();
  return <HomePage key={location.pathname} />;
}

export default App;
