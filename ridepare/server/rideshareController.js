const axios = require('axios');

const comparePrices = async (req, res) => {
  const { startLocation, endLocation } = req.body;

  try {
    // Call Uber and Lyft API (mock example)
    const uberPrices = await getUberPrice(startLocation, endLocation);
    const lyftPrices = await getLyftPrice(startLocation, endLocation);

    // Return a combined response
    res.json({
      uber: uberPrices,
      lyft: lyftPrices,
    });
  } catch (error) {
    console.error('Error fetching prices:', error);
    res.status(500).send('Server error');
  }
};

// Example function for Uber API
const getUberPrice = async (startLocation, endLocation) => {
  // API call to Uber with startLocation and endLocation
  // Replace with actual Uber API call using axios
  return { estimate: '$10-12', duration: '10 mins' };
};

// Example function for Lyft API
const getLyftPrice = async (startLocation, endLocation) => {
  // API call to Lyft with startLocation and endLocation
  // Replace with actual Lyft API call using axios
  return { estimate: '$8-10', duration: '12 mins' };
};

module.exports = {
  comparePrices,
};
