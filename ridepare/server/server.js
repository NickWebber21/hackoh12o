const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

// Define a root route
app.get('/', (req, res) => {
  res.send('Welcome to the RidePare API!');
});

app.get('/compare', (req, res) => {
  res.send('Please use a POST request to compare prices');
});

// Utility function to convert duration text to total minutes
function convertDurationToMinutes(durationText) {
  let totalMinutes = 0;

  const daysMatch = durationText.match(/(\d+)\s*day/);
  const hoursMatch = durationText.match(/(\d+)\s*hour/);
  const minutesMatch = durationText.match(/(\d+)\s*mins/);

  if (daysMatch) {
    totalMinutes += parseInt(daysMatch[1]) * 24 * 60;
  }
  if (hoursMatch) {
    totalMinutes += parseInt(hoursMatch[1]) * 60;
  }
  if (minutesMatch) {
    totalMinutes += parseInt(minutesMatch[1]);
  }

  return totalMinutes;
}

// Utility function to convert distance text to float
function convertDistanceToFloat(distanceText) {
  // Remove any commas from the distance text
  const sanitizedText = distanceText.replace(/,/g, '');
  // Extract the numeric part and convert it to a float
  const distance = parseFloat(sanitizedText);
  return distance;
}

// Define a POST endpoint to compare prices
app.post('/compare', async (req, res) => {
  const { startLocation, endLocation } = req.body;

  try {
    // Make a request to the Google Distance Matrix API for car route
    const carResponse = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
      params: {
        origins: startLocation,
        destinations: endLocation,
        mode: 'driving',
        key: process.env.REACT_APP_GOOGLE_API_KEY,
      },
    });

    // Make a request to the Google Distance Matrix API for bicycling route (for Lime scooter and CitiBike)
    const bikeResponse = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
      params: {
        origins: startLocation,
        destinations: endLocation,
        mode: 'bicycling',
        key: process.env.REACT_APP_GOOGLE_API_KEY,
      },
    });

    const carDistanceText = carResponse.data.rows[0].elements[0].distance.text;
    const carDurationText = carResponse.data.rows[0].elements[0].duration.text;
    const bikeDistanceText = bikeResponse.data.rows[0].elements[0].distance.text;
    const bikeDurationText = bikeResponse.data.rows[0].elements[0].duration.text;

    const carDistance = convertDistanceToFloat(carDistanceText);
    const carDuration = convertDurationToMinutes(carDurationText);
    const bikeDistance = convertDistanceToFloat(bikeDistanceText);
    const bikeDuration = convertDurationToMinutes(bikeDurationText);

    // Calculate prices
    const uberPrice = calculateUberPrice(carDistance, carDuration);
    const lyftPrice = calculateLyftPrice(carDistance, carDuration);
    const limePrice = calculateLimePrice(bikeDistance, bikeDuration);
    const citiBikePrice = calculateCitiBikePrice(bikeDuration);


    res.json({
      uber: { price: uberPrice, distance: carDistanceText, duration: carDurationText },
      lyft: { price: lyftPrice, distance: carDistanceText, duration: carDurationText },
      lime: { price: limePrice, distance: bikeDistanceText, duration: bikeDurationText },
      citiBike: { price: citiBikePrice, distance: bikeDistanceText, duration: bikeDurationText },
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

const calculateLimePrice = (distance, duration) => {
  const unlockFee = 1.00;
  const costPerMinute = 0.30;
  const price = unlockFee + (costPerMinute * duration);
  return price;
};

const calculateCitiBikePrice = (duration) => {
  // CitiBike pricing: $3.50 for a single ride up to 30 minutes
  // $0.15 per minute after that
  const basePrice = 3.50;
  const baseDuration = 30;
  const costPerAdditionalMinute = 0.24;
  var additionalMinutes = 0;
  if(duration >30){
    additionalMinutes = duration - baseDuration;
  }
  const price = basePrice + (additionalMinutes * costPerAdditionalMinute);
  return price;
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
