import { NextResponse } from 'next/server';

const KUCOIN_API_URL = 'https://api.kucoin.com/api/v1/market/candles';

// Fetch ADA or any coin historical data from KuCoin
export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const coin = searchParams.get('coin')
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  if (!from || !to) {
    return NextResponse.json({ error: 'Please provide "from" and "to" timestamps' }, { status: 400 });
  }

  const url = `${KUCOIN_API_URL}?symbol=${coin.toUpperCase()}-USDT&type=1day&startAt=${from}&endAt=${to}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
