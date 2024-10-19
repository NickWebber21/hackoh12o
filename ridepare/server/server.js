const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

// Define a root route
app.get('/', (req, res) => {
  res.send('Welcome to the RidePare API!'); // Respond with a simple message
});

app.get('/compare',(req, res) => {
  res.send('Please use a POST request to compare prices'); // Respond with a simple message))
});

// Define a POST endpoint to compare prices
app.post('/compare', async  (req, res) => {
  const { startLocation, endLocation } = req.body;

  try {
    // Make a request to the Google Distance Matrix API
    const distanceMatrixResponse = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
      params: {
        origins: startLocation,
        destinations: endLocation,
        key: process.env.GOOGLE_API_KEY,
      },
    });
    console.log(process.env.GOOGLE_API_KEY);
    console.log('Distance Matrix API Response:', distanceMatrixResponse.data);


    const distance = distanceMatrixResponse.data.rows[0].elements[0].distance.text; // e.g., "12.3 km"
    const duration = distanceMatrixResponse.data.rows[0].elements[0].duration.text; // e.g., "15 mins"

    // Example price calculation logic based on distance and duration
    const uberPrice = calculateUberPrice(distance, duration);
    const lyftPrice = calculateLyftPrice(distance, duration);

    res.json({
      uber: { price: uberPrice, distance, duration },
      lyft: { price: lyftPrice, distance, duration },
    });
  } catch (error) {
    console.error('Error fetching data from Google Distance Matrix API:', error);
    res.status(500).send('Error fetching distance and duration');
  }
});

// Dummy price calculation functions
const calculateUberPrice = (start, end) => {
  return 12; // Random price for demo
};

const calculateLyftPrice = (start, end) => {
  return 12; // Random price for demo
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
