import axios from 'axios';
import { NextResponse } from 'next/server';

const KUCOIN_API_URL = 'https://api.kucoin.com/api/v1/market/allTickers';

export async function GET() {
  try {
    // Fetch all tickers from KuCoin API
    const response = await axios.get(KUCOIN_API_URL);
    const data = response.data;

    if (data.code !== '200000') {
      return NextResponse.json({ error: 'Failed to fetch data from KuCoin' }, { status: 500 });
    }

    // Get all tickers, sort them by volume in descending order, and take the top 10
    const tickers = data.data.ticker
      .sort((a, b) => parseFloat(b.vol) - parseFloat(a.vol))
      .slice(0, 10);

    // Extract the symbols for the top 10 cryptos
    const top10Symbols = tickers.map((ticker) => ticker.symbol);

    return NextResponse.json(top10Symbols, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
