import axios from 'axios';

// Load the API key from environment variables
const APIPRICE_KEY = process.env.APIPRICE_KEY;

export async function GET() {
  try {
    // Make the request to fetch the current Bitcoin price from LiveCoinWatch
    const response = await axios.post(
      'https://api.livecoinwatch.com/coins/single',
      {
        currency: 'USD',  // Target currency (you can change this to any other currency)
        code: 'BTC',      // Cryptocurrency code (Bitcoin)
        meta: true        // Extra metadata
      },
      {
        headers: {
          'x-api-key': APIPRICE_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    // Extract the price (rate) from the response
    const COIN_PRICE = response.data.rate;

    // Return the price in the response
    return new Response(JSON.stringify({ price: COIN_PRICE }), { status: 200 });
  } catch (error) {
    console.error('Error fetching Bitcoin price: ', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch the price' }), { status: 500 });
  }
}
