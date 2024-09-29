// app/api/candles/route.js

import axios from 'axios';
import { NextResponse } from 'next/server';

const KUCOIN_API_URL = 'https://api.kucoin.com/api/v1/market/candles';

export async function GET(request) {
  // Extract query parameters
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol'); // e.g., 'BTC-USDT'
  
  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  const oneHour = 3600; // 1 hour in seconds
  const startAt = now - oneHour * 100; // 100 hours ago

  try {
    const response = await axios.get(KUCOIN_API_URL, {
      params: {
        symbol: symbol,
        type: '1hour',  // Hourly candles
        startAt: startAt,
        endAt: now
      }
    });

    const data = response.data;

    if (data.code !== '200000') {
      return NextResponse.json({ error: 'Failed to fetch data from KuCoin' }, { status: 500 });
    }

    return NextResponse.json(data.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
