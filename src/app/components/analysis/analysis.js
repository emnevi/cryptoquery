import { useEffect, useState } from "react"
import TransactionCard from "./components/transactionCard"
import { DateTime } from "luxon"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


const Analysis = ({ currentPrice, setResolvedProfits, resolvedProfits, transactions, crypto, wallet, languageDetected }) => {

    const [txDates, setTxDates] = useState({ start: false, end: false })
    const [historicPrices, setHistoricPrices] = useState([])

    const fetchHistoricalPrice = async (fromDate, toDate, coin) => {
        try {
            const fromTimestamp = DateTime.fromSeconds(fromDate).minus({ days: 2 }).toSeconds()
            const toTimestamp = DateTime.fromSeconds(toDate).plus({ days: 2 }).toSeconds()

            const response = await fetch(
                `/api/historic-price?coin=${coin}&from=${fromTimestamp}&to=${toTimestamp}`
            );

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            setHistoricPrices(result.data.map(candle => {
                return { x: Number(candle[0]), y: Number(candle[2]) }
            }));
        } catch (e) {

        }
    };



    useEffect(() => {
        if (transactions) {

            if (crypto === "ADA") {
                const sortedTransactions = transactions.sort((a, b) => a.block_time - b.block_time)

                const firstTransactionTimeStamp = sortedTransactions[0]
                const lastTrasnactionTimeStamp = sortedTransactions[sortedTransactions.length - 1]

                setTxDates({ ...txDates, start: firstTransactionTimeStamp.block_time, end: lastTrasnactionTimeStamp.block_time })
            } else {
                const sortedTransactions = transactions.sort((a, b) => a.timestamp - b.timestamp)

                const firstTransactionTimeStamp = sortedTransactions[0]
                const lastTrasnactionTimeStamp = sortedTransactions[sortedTransactions.length - 1]

                setTxDates({ ...txDates, start: firstTransactionTimeStamp.timestamp, end: lastTrasnactionTimeStamp.timestamp })
            }



        }
    }, [transactions])


    useEffect(() => {
        if (txDates.start && txDates.end) {
            fetchHistoricalPrice(txDates.start, txDates.end, crypto)
        }
    }, [txDates])

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <Table style={{ width: 500 }}>
                <TableCaption>Your last 50 inbound transactions</TableCaption>
                <TableHeader style={{ width: 400 }}>
                    <TableRow>
                        <TableHead className="text-center">Gain / Loss</TableHead>
                        <TableHead className="text-center">Tx date</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        transactions.filter((transaction) =>
                            !transaction.senders.some(sender => sender.address === wallet)
                        ).toReversed().map((transaction, index) => <TransactionCard languageDetected={languageDetected} crypto={crypto} key={`index_${index}_${transaction.timestamp}`} historicPrices={historicPrices} setResolvedProfits={setResolvedProfits} resolvedProfits={resolvedProfits} currentPrice={currentPrice} transaction={transaction} />)
                    }
                </TableBody>
            </Table>
        </div >
    )
}


export default Analysis