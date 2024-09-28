'use client'; 

import { useEffect, useRef, useState } from 'react';
import Analysis from './components/analysis/analysis';
import Spinner from './components/useful/spinner';
import './styles/custom-bootstrap.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';
import Search from './components/search';
import Info from './info';


export default function Home() {
  const [wallet, setWallet] = useState('');
  const [error, setError] = useState('');
  const [walletInfo, setWalletInfo] = useState();
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState()
  const [resolvedProfits, setResolvedProfits] = useState([])
  const [totalProfits, setTotalProfits] = useState()
  const [transactions, setTransactions] = useState()
  const [allTransactionsDone, setAllTransactionsDone] = useState(false)
  const [crypto, setCrypto] = useState()

  const fetchPrice = async (crypto) => {
    try {
      const res = await fetch(`/api/coin-price?crypto=${crypto}`);
      const data = await res.json();

      if (res.ok) {
        setPrice(data.price); 
        setError(data.error || 'Failed to fetch the price');
      }
    } catch (err) {
      setError('Error fetching price');
    }
  };

  useEffect(() => {
    if (walletInfo && crypto) fetchPrice(crypto)
  }, [walletInfo, crypto])

  const isBTC = (address) => {
    const regex = /^(1[a-km-zA-HJ-NP-Z1-9]{25,34}|3[a-km-zA-HJ-NP-Z1-9]{25,34}|bc1[a-zA-HJ-NP-Z0-9]{39,59})$/;
    return regex.test(address);
  };
  
  const isETH = (address) => {
    const regex = /^(0x[a-fA-F0-9]{40})$/;
    return regex.test(address);
  };


  const isADA = (address) => {
    const regex = /^(addr1[a-zA-Z0-9]{98,105}|Ae2[a-zA-Z0-9]{50,}|DdzFF[a-zA-Z0-9]{100,})$/;
    return regex.test(address);
  };

  const validateAddress = (address) => {
    if(isBTC(address)){
      setCrypto("BTC")
      return true
    } else if (isETH(address)){
      setCrypto("ETH")
      return true
    } else if (isADA(address)){
      setCrypto("ADA")
      return true
    } else {
      return false
    }
  }

  const getCryptoFromAddress = (address) => {
    if(isBTC(address)){
      return "BTC"
    } else if (isETH(address)){
      return "ETH"
    } else if (isADA(address)){
      return "ADA"
    } else {
      return false
    }
  }

  const fetchWalletTransactions = async (address) => {
    try {
      let crypto = getCryptoFromAddress(address)

      if(crypto === "ADA"){
        const response = await fetch(`/api/getAdaWalletTransactions?address=${address}`);
        const data = await response.json();
        setWalletInfo(data)
        setTransactions(data)
      } else {
        const response = await fetch(`/api/getWalletTransactions?address=${address}&crypto=${crypto}`);
        const data = await response.json();
        setWalletInfo(data)
        setTransactions(data)
      }
     

    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };


  const handleSubmit = async (e, crypto) => {
    e.preventDefault();

    if (!validateAddress(wallet)) {
      setError('Invalid wallet address');
      return;
    }
    
    try {
      setLoading(true)
      fetchWalletTransactions(wallet);

    } catch (error) {
      console.error('Error fetching wallet info:', error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (!resolvedProfits || resolvedProfits.length === 0) return

    const totalProfits = resolvedProfits.filter(value => value && !Number.isNaN(value)).reduce((a, b) => a + b, 0)

    setTotalProfits(totalProfits)
  }, [resolvedProfits])


  return (
    <div className="d-flex vh-100 bg-dark text-white justify-content-center align-items-center mainContainer" data-bs-theme="dark">

      <div className="d-flex flex-column align-items-center justify-content-center text-center h-100">
        {!transactions && !loading && <Search
          setWallet={setWallet}
          handleSubmit={e => handleSubmit(e, crypto)}
          error={error}
          wallet={wallet}
        />}

        {transactions && !loading && <>

          <div className='d-flex mb-3 mt-3 pt-3'>
            <div className='text-white me-2'>
              <FontAwesomeIcon className='text-white' size='xl' icon={faBitcoin} />
            </div>
            {price && <h4>${price.toLocaleString() || "fetching price..."}</h4>}
            <h4 className='ms-1'>Right now!</h4>
          </div>
          <div className='d-flex mb-2'>

            {totalProfits && <h1 className={`${totalProfits > 0 ? "text-success" : "text-danger"}`}>{totalProfits > 0 ? "+" : ""}{totalProfits.toLocaleString()} USD</h1>}

          </div>
          <div className="d-flex justify-content-between py-2 flex-column">
            {transactions && transactions.length === 0 && <Spinner />}
          </div>
          {transactions && <span className='text-white mb-2 fw-bold text-muted'>Last {transactions.length} transactions</span>}

          {transactions && <div className='makeitscrollable_and_full_window_height'>
            {transactions.length > 0 && <Analysis crypto={crypto} setResolvedProfits={setResolvedProfits} transactions={transactions} resolvedProfits={resolvedProfits} currentPrice={price} walletInfo={walletInfo} />}
            {transactions.length === 0 && <h5 className='text-danger'>No transactions found</h5>}
          </div>}

        </>}
     
      </div>
      <Info/>
    </div>
  );
}
