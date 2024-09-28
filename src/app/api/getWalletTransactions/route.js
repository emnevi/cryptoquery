import { NextResponse } from 'next/server';
import axios from 'axios';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  const crypto = searchParams.get('crypto');
  const limit = 50;
  const offset = 0;


  if (!address) {
    return NextResponse.json({ error: 'address is required.' }, { status: 400 });
  }

  try {

    let chain

    if (crypto === "BTC") {
      chain = "bitcoin"
    } else {
      chain = "ethereum"
    }

    const apiKey = process.env.CRYPTO_API_KEY;
    const apiBaseUrl = `https://rest.cryptoapis.io/blockchain-data/${chain}/mainnet/addresses/${address}/transactions`;


    const url = `${apiBaseUrl}?limit=${limit}&offset=${offset}`;


    const response = await axios.get(url, {
      headers: {
        'X-API-Key': apiKey,
      },
    });

    const data = response.data;

    const latestTransactions = data.data.items || [];

    return NextResponse.json(latestTransactions);
  } catch (error) {
    console.error('Error querying the Crypto API:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Error querying the Crypto API', details: error.response?.data }, { status: 500 });
  }
}
