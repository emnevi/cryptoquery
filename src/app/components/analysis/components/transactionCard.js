'use client'

import { useState, useEffect, useRef } from "react"
import { useCopyToClipboard } from "../../../hooks/useCOpyToClipboard"
import { DateTime } from "luxon"
import { TableCell, TableRow } from "@/components/ui/table"

const TransactionCard = ({ transaction, currentPrice, setResolvedProfits, resolvedProfits, historicPrices, crypto, languageDetected }) => {
    const [txPrice, setTxPrice] = useState()
    const cardRef = useRef(null);
    const [txCalculations, setTxCalculations] = useState({})
    const [notification, setNotification] = useState(false)

    const { copyToClipboard, copied } = useCopyToClipboard();

    useEffect(() => {

        if (crypto === "ADA") {
            const currentTransactionHitoricPrice = historicPrices.filter(history => DateTime.fromSeconds(history.x).toISODate() === DateTime.fromSeconds(transaction.block_time).toISODate())[0]
            if (currentTransactionHitoricPrice) {
                setTxPrice(Number(currentTransactionHitoricPrice.y))
            }
        } else {
            const currentTransactionHitoricPrice = historicPrices.filter(history => DateTime.fromSeconds(history.x).toISODate() === DateTime.fromSeconds(transaction.timestamp).toISODate())[0]
            if (currentTransactionHitoricPrice) {
                setTxPrice(Number(currentTransactionHitoricPrice.y))
            }
        }

    }), [historicPrices, transaction]

    const getCoinBalance = (transaction, crypto) => {
        if (crypto === "ADA") {
            return Number(transaction.value)
        } else {
            return transaction.recipients.map(rec => Number(rec.amount)).reduce((value, acc) => acc + value, 0)
        }
    }

    useEffect(() => {
        if (currentPrice && crypto) {

            const coinBalance = getCoinBalance(transaction, crypto)

            const txMomentValue = Number(txPrice) * Number(coinBalance)

            const currentValue = Number(coinBalance) * Number(currentPrice)

            const profits = (Number(coinBalance) * Number(currentPrice)) - Number(txMomentValue)

            setTxCalculations({ ...txCalculations, txMomentValue, currentValue, profits, coinBalance })
        }
    }, [transaction, currentPrice, txPrice, crypto])


    useEffect(() => {
        if (txCalculations.profits) {
            resolvedProfits.push(txCalculations.profits)
            setResolvedProfits([...resolvedProfits])
        }
    }, [txCalculations])

    const isSuccess = txCalculations.profits > 0

    return (
        <TableRow className=" border-secondary">
            <TableCell className="" >
                {!Number.isNaN(txCalculations.profits) && txCalculations?.profits && <span className={`mb-0 fw-bold ${isSuccess ? "text-success" : "text-danger"}`}>${txCalculations.profits.toLocaleString()}</span>}
                {Number.isNaN(txCalculations.profits) && <span>Woops! We messed this one up</span>}
            </TableCell>
            <TableCell className="text-muted">
                {crypto !== "ADA" && <small className="me-2">{DateTime.fromSeconds(transaction.timestamp).toLocaleString(DateTime.DATETIME_SHORT)}</small>}
                {crypto == "ADA" && <small className="me-2">{DateTime.fromSeconds(transaction.block_time).toLocaleString(DateTime.DATETIME_SHORT)}</small>}
            </TableCell>
        </TableRow>

        /*         <div onClick={() => {
                    copyToClipboard(transaction.hash)
                    setNotification(true)
                    setTimeout(() => {
                        setNotification(false)
                    }, 1000);
                }}
                    className={`d-flex align-items-center border ${txCalculations.profits > 0 ? "border-success text-success" : "border-danger text-danger"} mb-3 shadow `}
                    ref={cardRef}
                    style={{ borderRadius: 8, borderWidth: 3, width: "50%", minWidth: 300, maxWidth: 600 }}
                >
        
                    {!notification && <div className="d-flex justify-content-between align-items-center w-100 p-2">
                        {!Number.isNaN(txCalculations.profits) && <>
                            <div className={`bg-transparent ${txCalculations.profits > 0 ? "border-success" : "border-danger"} fw-bold`}>
                                {txCalculations?.profits && <span className="mb-0">${txCalculations.profits.toLocaleString()}</span>}
                            </div>
                            <div className="text-muted d-flex align-items-center">
                                <div className="d-flex">
                                    {crypto !== "ADA" && <small className="me-2">{DateTime.fromSeconds(transaction.timestamp).toLocaleString(DateTime.DATETIME_SHORT)}</small>}
                                    {crypto == "ADA" && <small className="me-2">{DateTime.fromSeconds(transaction.block_time).toLocaleString(DateTime.DATETIME_SHORT)}</small>}
                                </div>
                            </div>
                        </>}
                        {Number.isNaN(txCalculations.profits) && <span>Woops! We messed up this one</span>}
                    </div>}
        
                    {notification && <div className="d-flex w-100 border border-warning text-warning p-1" role="alert">
                        Copied Tx hash to clipboard!
                    </div>}
                </div> */
    )
}

export default TransactionCard