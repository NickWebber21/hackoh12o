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

app.get('/compare', (req, res) => {
  res.send('Please use a POST request to compare prices'); // Respond with a simple message
});

// Define a POST endpoint to compare prices
app.post('/compare', async (req, res) => {
  const { startLocation, endLocation } = req.body;

  try {
    // Make a request to the Google Distance Matrix API
    const distanceMatrixResponse = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
      params: {
        origins: startLocation,
        destinations: endLocation,
        key: process.env.REACT_APP_GOOGLE_API_KEY,
      },
    });

    const distanceText = distanceMatrixResponse.data.rows[0].elements[0].distance.text;
    const durationText = distanceMatrixResponse.data.rows[0].elements[0].duration.text;

    // Extract the numeric values from distance and duration (e.g., "10 km" -> 10, "30 mins" -> 30)
    const distance = parseFloat(distanceText); // Assuming distance is in kilometers/miles
    const duration = parseFloat(durationText); // Assuming duration is in minutes

    // Calculate Uber and Lyft prices
    const uberPrice = calculateUberPrice(distance, duration);
    const lyftPrice = calculateLyftPrice(distance, duration);

    res.json({
      uber: { price: uberPrice, distance: distanceText, duration: durationText },
      lyft: { price: lyftPrice, distance: distanceText, duration: durationText },
      startLocation: startLocation,
      endLocation: endLocation
    });
  } catch (error) {
    console.error('Error fetching data from Google Distance Matrix API:', error);
    res.status(500).send('Error fetching distance and duration');
  }
});



const calculateUberPrice = (distance, duration) => {
  const baseFare = 2.50;           // Base fare in dollars for UberX
  const costPerMinute = 0.23;      // Cost per minute in dollars
  const costPerDistance = 1.40;     // Cost per mile/km in dollars
  const bookingFee = 2.20;          // Booking fee in dollars
  const minFare = 7.50;             // Minimum fare in dollars

  // Basic fare calculation
  let price = baseFare + (costPerMinute * duration) + (costPerDistance * distance) + bookingFee;

  // Ensure the minimum fare is applied
  if (price < minFare) {
    price = minFare;
  }
  // Return the price rounded to 2 decimal places
  return price;
};

const calculateLyftPrice = (distance, duration) => {
  const baseFare = 2.00;   // Base fare in dollars
  const costPerMinute = 0.2; // Cost per minute in dollars
  const costPerDistance = 1.50; // Cost per mile/km in dollars
  const bookingFee = 1.75;   // Booking fee in dollars
  const minFare = 6.00; //min fare

  // Basic fare calculation
  const price = baseFare + (costPerMinute * duration) + (costPerDistance * distance) + bookingFee;


  if (price < minFare) {
    price = minFare;
  }

  return price; // Return the price rounded to 2 decimal places
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
