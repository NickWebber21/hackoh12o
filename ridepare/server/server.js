const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Define a root route
app.get('/', (req, res) => {
  res.send('Welcome to the RidePare API!'); // Respond with a simple message
});

app.get('/compare', (req, res) => {
  res.send('Please use a POST request to compare prices'); // Respond with a simple message))
});

// Define a POST endpoint to compare prices
app.post('/compare', (req, res) => {
  const { startLocation, endLocation } = req.body;

  // Example price calculation logic
  const uberPrice = calculateUberPrice(startLocation, endLocation);
  const lyftPrice = calculateLyftPrice(startLocation, endLocation);

  res.json({
    uber: uberPrice,
    lyft: lyftPrice,
  });
});

// Dummy price calculation functions
const calculateUberPrice = (start, end) => {
  return Math.random() * 20 + 5; // Random price for demo
};

const calculateLyftPrice = (start, end) => {
  return Math.random() * 20 + 5; // Random price for demo
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
