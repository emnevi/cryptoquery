import axios from 'axios';
import { NextResponse } from 'next/server';

const KUCOIN_API_URL = 'https://api.kucoin.com/api/v1/market/allTickers';

const CRYPTO_LIST = [
  "BTC-USDT",
  "ETH-USDT",
  "XRP-USDT",
  "BNB-USDT",
  "SOL-USDT",
  "PEPE-USDT",
  "DOGE-USDT",
  "SUI-USDT",
  "SHIB-USDT",
  "ONDO-USDT"
]

export async function GET() {
  try {
    // Fetch all tickers from KuCoin API
    const response = await axios.get(KUCOIN_API_URL);
    const data = response.data;

    if (data.code !== '200000') {
      return NextResponse.json({ error: 'Failed to fetch data from KuCoin' }, { status: 500 });
    }

    // Get all tickers, sort them by volume in descending order, and take the top 10
    console.log("data.data.ticker", data.data.ticker)
    const tickers = data.data.ticker
      .filter(tik => CRYPTO_LIST.includes(tik.symbol))
      .sort((a, b) => parseFloat(a.vol) - parseFloat(b.vol))
      .slice(0, 10);

    // Extract the symbols for the top 10 cryptos
    const top10Symbols = tickers.map((ticker) => ticker.symbol);

    return NextResponse.json(top10Symbols, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
