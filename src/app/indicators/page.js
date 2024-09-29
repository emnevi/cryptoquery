'use client';

import { useEffect, useState } from "react";
import Row from "./components/row";
import Navbar from "../navbar";
import Info from "../info";

export default function Indicators() {

    const [topCryptos, setTopCryptos] = useState()

    const fetchTopCryptos = async () => {
        try {
            const response = await fetch('/api/top-cryptos');
            const top10Symbols = await response.json();

            if (response.ok) {
                console.log('Top 10 Crypto Symbols:', top10Symbols);
                setTopCryptos(top10Symbols)
            } else {
                console.error('Error fetching top cryptos:', top10Symbols.error);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    useEffect(() => {
        fetchTopCryptos();
    }, [])

    return (
        <div className="bg-dark vh-100">
                 <Navbar/>
            <div className="d-flex flex-column w-100 justify-content-center align-items-center pt-4 text-white">
                <h1>Useful Technical Indicators</h1>
                <spam>Top 10 cryptos by traded volume</spam>
            </div>
            <div className="container mt-3">
                <table className="table  table-dark  table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th style={{ width: 50 }}>Crypto</th>
                            <th style={{ width: 200 }}>Price</th>
                            <th style={{ width: 200 }}>RSI <small className="ms-2" style={{ color: "green" }}>30</small> <small className="ms-2" style={{ color: "red" }}>70</small></th>
                            <th style={{ width: 200 }}>MACD <small className="ms-2" style={{ color: "orange" }}>signal</small><small className="ms-2" style={{ color: "green" }}>macd</small></th>
                            <th style={{ width: 200 }}>OBV</th>
                            <th style={{ width: 200 }}><span style={{ color: "orange" }}>SMAFast</span><span className="ms-2" style={{ color: "yellow" }}>SMASlow</span></th>
                        </tr>
                    </thead>
                    <tbody>

                        {topCryptos && topCryptos.length > 0 && topCryptos.map(symbol => <Row symbol={symbol} />)}
                    </tbody>
                </table>
            </div>
        <Info/>
        </div>
    );
}
