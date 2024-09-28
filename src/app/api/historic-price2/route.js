import { NextResponse } from 'next/server';

const convertDateToUnixTimestamp = (date) => {
    return Math.floor(new Date(date).getTime() / 1000);
};

const calculateDaysBetween = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!startDate || !endDate) {
        return NextResponse.json({ error: 'Please provide both startDate and endDate.' }, { status: 400 });
    }

    const startTimestamp = convertDateToUnixTimestamp(startDate);
    const endTimestamp = convertDateToUnixTimestamp(endDate);

    const timespanInDays = calculateDaysBetween(startDate, endDate);

    try {
        const response = await fetch(`https://api.blockchain.info/charts/market-price?timespan=${timespanInDays}days&format=json`);
        const data = await response.json();

        const filteredPrices = data.values.filter((price) => {
            return price.x >= startTimestamp && price.x <= endTimestamp;
        });

        return NextResponse.json({ prices: filteredPrices });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch Bitcoin prices.' }, { status: 500 });
    }
}
