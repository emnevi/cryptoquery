import { useEffect, useState } from "react"
import TransactionCard from "./components/transactionCard"
import { DateTime } from "luxon"
const TX_LIMIT = 2

const Analysis = ({ walletInfo, currentPrice, setResolvedProfits, resolvedProfits, transactions }) => {

    const [pagination, setPagination] = useState({
        start: 0,
        end: TX_LIMIT - 1
    })

    const [txDates, setTxDates] = useState({ start: false, end: false })
    const [historicPrices, setHistoricPrices] = useState([])

    const fetchHistoricalPrice = async (start, end) => {
        const isoStart = DateTime.fromSeconds(start).toISODate()
        const isoEnd = DateTime.fromSeconds(end).toISODate()

        const response = await fetch(`/api/historic-price2?startDate=${isoStart}&endDate=${isoEnd}`);
        const data = await response.json();
        setHistoricPrices(data.prices.map(historic => {
            historic.x = DateTime.fromSeconds(historic.x).toISODate()
            return historic
        }))
    };


    useEffect(() => {
        if (transactions) {

            const sortedTransactions = transactions.sort((a, b) => a.timestamp - b.timestamp)

            const firstTransactionTimeStamp = sortedTransactions[0]
            const lastTrasnactionTimeStamp = sortedTransactions[sortedTransactions.length - 1]

            setTxDates({ ...txDates, start: firstTransactionTimeStamp.timestamp, end: lastTrasnactionTimeStamp.timestamp })

        }
    }, [transactions])


    useEffect(() => {
        if (txDates.start && txDates.end) {
            fetchHistoricalPrice(txDates.start, txDates.end)
        }
    }, [txDates])

    return (
        <div className="d-flex flex-column w-100" style={{ height: 500, maxHeight: 500 }}>
            {transactions.toReversed().map(transaction => <TransactionCard historicPrices={historicPrices} setResolvedProfits={setResolvedProfits} resolvedProfits={resolvedProfits} currentPrice={currentPrice} key={transaction.transaction_hash} transaction={transaction} />)}
        </div>
    )
}


export default Analysis