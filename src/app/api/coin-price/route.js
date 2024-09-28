import axios from 'axios';
const APIPRICE_KEY = process.env.APIPRICE_KEY;

export async function GET() {
  try {

    const response = await axios.post(
      'https://api.livecoinwatch.com/coins/single',
      {
        currency: 'USD',
        code: 'BTC',
        meta: true
      },
      {
        headers: {
          'x-api-key': APIPRICE_KEY,
          'Content-Type': 'application/json',
        },
      }
    );


    const COIN_PRICE = response.data.rate;

    return new Response(JSON.stringify({ price: COIN_PRICE }), { status: 200 });
  } catch (error) {
    console.error('Error fetching Bitcoin price: ', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch the price' }), { status: 500 });
  }
}
