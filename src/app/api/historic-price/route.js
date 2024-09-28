import axios from 'axios';

const APIPRICE_KEY = process.env.APIPRICE_KEY;

export async function POST(req) {
  const { start, end } = await req.json();

  if (!start || !end) {
    return new Response(JSON.stringify({ error: 'Date is required' }), { status: 400 });
  }

  try {
    const response = await axios.post(
      'https://api.livecoinwatch.com/coins/single/history',
      {
        currency: 'USD',
        code: 'BTC',      
        start,
        end,
        meta: false
      },
      {
        headers: {
          'x-api-key': APIPRICE_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data;
    return new Response(JSON.stringify(data), { status: 200 }); // Return the historical price
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch historical price' }), { status: 500 });
  }
}
