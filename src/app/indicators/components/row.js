import { rsi, macd, obv, sma } from "indicatorts"
import { useEffect, useState } from "react";

import { Sparklines, SparklinesLine, SparklinesNormalBand, SparklinesReferenceLine } from 'react-sparklines';


const Row = ({ symbol }) => {
    const [candles, setCandles] = useState()
    const [indicators, setIndicators] = useState()

    const fetchCandles = async (symbol) => {
        try {
            const response = await fetch(`/api/candles?symbol=${symbol}`);
            const data = await response.json();

            if (response.ok) {
                setCandles(data.toReversed())
            } else {
                console.error('Error:', data.error);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    useEffect(() => {
        if (symbol) fetchCandles(symbol)
    }, [symbol])


    const calculateIndicators = (historical) => {
        if (!historical || historical.length === 0) return {}
        const closings = historical.map(candle => Number(candle[2]))
        const volumes = historical.map(candle => Number(candle[5]))

        const RSI = rsi(closings, { perios: 14 })
        const MACD = macd(closings, { fast: 12, slow: 26, signal: 9 })
        const OBV = obv(closings, volumes)
        const SMAFast = sma(closings, { period: 9 })
        const SMASlow = sma(closings, { period: 21 })

        setIndicators({ RSI, MACD, OBV, SMAFast, SMASlow })
    }

    useEffect(() => {
        calculateIndicators(candles)
    }, [candles])

    console.log("indicators", indicators?.RSI)

    return (
        <tr>
            <td>{symbol && symbol.split("-")[0]}</td>
            <td>
                {candles && candles.length > 0 && <Sparklines data={candles.map(candle => Number(candle[2]))} limit={100} width={200} height={50} margin={5}>
                    <SparklinesLine style={{ fill: "none" }} color="cyan" />
                </Sparklines>}
            </td>
            <td>
                <Sparklines data={indicators?.RSI} limit={100} width={200} height={50} margin={5}>
                    <SparklinesLine style={{ fill: "none" }} color="cyan" />
                    <SparklinesReferenceLine style={{ stroke: "green" }} type="custom" value={30} />
                    <SparklinesReferenceLine style={{ stroke: "red" }} type="custom" value={70} />
                </Sparklines>
            </td>
            <td>
                <div style={{ position: "absolute", opacity: 0.8, width: 190 }}>
                    <Sparklines data={indicators?.MACD.signalLine} limit={100} width={200} height={50} margin={5}>
                        <SparklinesLine style={{ fill: "none" }} color="orange" />
                        <SparklinesReferenceLine value={0} />
                    </Sparklines>
                </div>
                <div style={{ position: "absolute", opacity: 1, width: 190 }}>
                    <Sparklines data={indicators?.MACD.macdLine} limit={100} width={200} height={50} margin={5}>
                        <SparklinesLine style={{ fill: "none" }} color="green" />
                        <SparklinesReferenceLine value={0} />
                    </Sparklines>
                </div>
            </td>
            <td>
                <Sparklines data={indicators?.OBV} limit={100} width={200} height={50} margin={5}>
                    <SparklinesLine style={{ fill: "none" }} color="green" />
                </Sparklines>
            </td>
            <td>
                <div style={{ position: "absolute", opacity: 0.8, width: 190 }}>
                    <Sparklines data={indicators?.SMAFast} limit={100} width={200} height={50} margin={5}>
                        <SparklinesLine style={{ fill: "none" }} color="orange" />
                    </Sparklines>
                </div>
                <div style={{ position: "absolute", opacity: 1, width: 190 }}>
                    <Sparklines data={indicators?.SMASlow} limit={100} width={200} height={50} margin={5}>
                        <SparklinesLine style={{ fill: "none" }} color="yellow" />

                    </Sparklines>
                </div>
            </td>
        </tr>
    )
}


export default Row