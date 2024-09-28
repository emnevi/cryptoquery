import { NextResponse } from 'next/server';
import axios from 'axios';

// Koios API base URL
const KOIOS_API_BASE_URL = 'https://api.koios.rest/api/v1';

export async function GET(request) {
  try {
    // Parse the request body
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    // Log the received address

    // Check if the wallet address is provided
    if (!address) {
      return NextResponse.json({ error: 'Address is required.' }, { status: 400 });
    }

    // Koios API URL for fetching UTXOs for a given address
    const utxoUrl = `${KOIOS_API_BASE_URL}/address_utxos`;

    // Log the request about to be made to Koios

    // Make a POST request to Koios API with the address
    const response = await axios.post(utxoUrl, {
      _addresses: [address]
    });

    // Log the response from Koios API

    // Check if the response data is valid
    if (!response.data || response.data.length === 0) {
      return NextResponse.json({ error: 'No UTXOs found or invalid response.' }, { status: 500 });
    }

    // Return the UTXOs in the response
    return NextResponse.json(response.data);
  } catch (error) {
    // Log the error if one occurs

    // Check if error response from Koios contains a more detailed message
    const errorDetails = error.response?.data || error.message || 'Unknown error occurred';

    return NextResponse.json(
      { error: 'Error querying Koios API', details: errorDetails },
      { status: 500 }
    );
  }
}
