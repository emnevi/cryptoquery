import { NextResponse } from 'next/server';

// Helper function to convert date to UNIX timestamp
const convertDateToUnixTimestamp = (date) => {
    return Math.floor(new Date(date).getTime() / 1000);
};

// Helper function to calculate the difference in days between two dates
const calculateDaysBetween = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// GET Bitcoin daily prices between two dates
export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!startDate || !endDate) {
        return NextResponse.json({ error: 'Please provide both startDate and endDate.' }, { status: 400 });
    }

    const startTimestamp = convertDateToUnixTimestamp(startDate);
    const endTimestamp = convertDateToUnixTimestamp(endDate);

    // Calculate the timespan in days between the two dates
    const timespanInDays = calculateDaysBetween(startDate, endDate);

    try {
        // Fetch historical market prices for Bitcoin with the dynamic timespan
        const response = await fetch(`https://api.blockchain.info/charts/market-price?timespan=${timespanInDays}days&format=json`);
        const data = await response.json();

        // Filter prices between the two timestamps
        const filteredPrices = data.values.filter((price) => {
            return price.x >= startTimestamp && price.x <= endTimestamp;
        });

        // Return filtered prices (daily prices between the start and end date)
        return NextResponse.json({ prices: filteredPrices });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch Bitcoin prices.' }, { status: 500 });
    }
}
