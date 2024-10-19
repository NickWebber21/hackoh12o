const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // read variables from .env file (api keys)

const app = express(); // initliaze instance of express app

app.use(cors()); // allow frontend (react) to talk to backend (express)
app.use(express.json()); // parse incoming JSON requests

const PORT = process.env.PORT || 5000;

// Example route TODO: define more routes for comparing ride prices
app.get('/', (req, res) => {
  res.send('RidePare API is running');
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
