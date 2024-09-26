// app/api/getWalletTransactions/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

// Helper function to introduce a delay (used for future pagination if needed)
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request) {
  // Extract the query parameters from the request URL
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  const limit = 50; // Fetch only the latest 50 transactions
  const offset = 0; // Start from the latest transaction (offset = 0)

  // Check if the wallet address is provided
  if (!address) {
    return NextResponse.json({ error: 'address is required.' }, { status: 400 });
  }

  try {
    const apiKey = process.env.CRYPTO_API_KEY; // Your Crypto API key
    const apiBaseUrl = `https://rest.cryptoapis.io/blockchain-data/bitcoin/mainnet/addresses/${address}/transactions`;

    // Construct the request URL with offset and limit, and include the API key
    const url = `${apiBaseUrl}?limit=${limit}&offset=${offset}`;

    // Query the Crypto API using axios with the API key in the headers
    const response = await axios.get(url, {
      headers: {
        'X-API-Key': apiKey,
      },
    });
    
    const data = response.data;

    // Collect only the latest transactions (up to the specified limit)
    const latestTransactions = data.data.items || [];

    // Return the latest transactions
    return NextResponse.json(latestTransactions);
  } catch (error) {
    console.error('Error querying the Crypto API:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Error querying the Crypto API', details: error.response?.data }, { status: 500 });
  }
}
