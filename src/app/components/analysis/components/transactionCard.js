'use client'

import { useState, useEffect, useRef } from "react"
import { useCopyToClipboard } from "@/app/hooks/useCOpyToClipboard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faReceipt } from "@fortawesome/free-solid-svg-icons"
import { DateTime } from "luxon"

const TransactionCard = ({ transaction, currentPrice, setResolvedProfits, resolvedProfits, historicPrices }) => {
    const [txPrice, setTxPrice] = useState()
    const cardRef = useRef(null);
    const [txCalculations, setTxCalculations] = useState({})
    const [notification, setNotification] = useState(false)

    const { copyToClipboard, copied } = useCopyToClipboard();

    useEffect(() => {
        const currentTransactionHitoricPrice = historicPrices.filter(history => history.x === DateTime.fromSeconds(transaction.timestamp).toISODate())[0]
        if (currentTransactionHitoricPrice) {
            setTxPrice(currentTransactionHitoricPrice.y)
        }
    }), [historicPrices, transaction]

    useEffect(() => {
        if (currentPrice) {
            const coinBalance = transaction.blockchainSpecific.vin.map(vin => Number(vin.value)).reduce((value, acc) => acc + value, 0)

            const txMomentValue = Number(txPrice) * Number(coinBalance)

            const currentValue = Number(coinBalance) * Number(currentPrice)

            const profits = (Number(coinBalance) * Number(currentPrice)) - Number(txMomentValue)


            setTxCalculations({ ...txCalculations, txMomentValue, currentValue, profits, coinBalance })
        }
    }, [transaction, currentPrice, txPrice])


    useEffect(() => {
        if (txCalculations.profits) {
            resolvedProfits.push(txCalculations.profits)
            setResolvedProfits([...resolvedProfits])
        }
    }, [txCalculations])

    return (
        <div onClick={() => {
            copyToClipboard(transaction.hash)
            setNotification(true)
            setTimeout(() => {
                setNotification(false)
            }, 1000);
        }}
            className={`w-100 d-flex align-items-center border ${txCalculations.profits > 0 ? "border-success text-success" : "border-danger text-danger"} mb-3 shadow`}
            ref={cardRef}
            style={{ borderRadius: 8 }}
        >

            {!notification && <div className="d-flex justify-content-between align-items-center w-100 p-2">
                {!Number.isNaN(txCalculations.profits) &&<>
                    <div className={`bg-transparent ${txCalculations.profits > 0 ? "border-success" : "border-danger"} fw-bold`}>
                        {txCalculations?.profits && <span className="mb-0">${txCalculations.profits.toLocaleString()}</span>}
                    </div>
                    <div className="text-muted d-flex align-items-center">
                        <div className="d-flex">
                            <small className="me-2">{DateTime.fromSeconds(transaction.timestamp).toLocaleString(DateTime.DATETIME_SHORT)}</small>
                        </div>
                    </div>
                </>}
                {Number.isNaN(txCalculations.profits)  && <span>Woops! We messed up this one</span>}
            </div>}

            {notification && <div class="d-flex w-100 border border-warning text-warning p-1" role="alert">
                Copied Tx hash to clipboard!
            </div>}
        </div>
    )
}

export default TransactionCard