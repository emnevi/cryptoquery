'use client';

import { useEffect, useRef, useState } from 'react';
import Analysis from './components/analysis/analysis';
import Spinner from './components/useful/spinner';
import './styles/custom-bootstrap.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBitcoin, faEthereum } from '@fortawesome/free-brands-svg-icons';
import Search from './components/search';
import Info from './info';
import AdaCoin from "./assets/cardano-ada-logo.svg"
import UIMessages from './assets/uimessages';
import GoogleAnalytics from './analytics';
import ExplanationSection from './components/web/explanationSection';
import Navbar from './navbar';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';

export default function Home() {
  const [wallet, setWallet] = useState('');
  const [error, setError] = useState('');
  const [walletInfo, setWalletInfo] = useState();
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState()
  const [resolvedProfits, setResolvedProfits] = useState([])
  const [totalProfits, setTotalProfits] = useState()
  const [transactions, setTransactions] = useState()
  const [crypto, setCrypto] = useState()
  const [languageDetected, setLanguageDetected] = useState('');
  const [isExplanationVisible, setIsExplanationVisible] = useState(false)

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
    const regex = /^(addr1[0-9a-z]+)$/;
    return regex.test(address);
  };

  const validateAddress = (address) => {
    if (isBTC(address)) {

      setCrypto("BTC")
      return true
    } else if (isETH(address)) {
      setCrypto("ETH")
      return true
    } else if (isADA(address)) {
      setCrypto("ADA")
      return true
    } else {
      return false
    }
  }

  const getCryptoFromAddress = (address) => {
    if (isBTC(address)) {
      return "BTC"
    } else if (isETH(address)) {
      return "ETH"
    } else if (isADA(address)) {
      return "ADA"
    } else {
      return false
    }
  }

  const fetchWalletTransactions = async (address) => {
    setLoading(true)
    try {
      let crypto = getCryptoFromAddress(address)
      if (crypto === "ADA") {
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
    } finally {
      setLoading(false)
    }
  };


  const handleSubmit = async (e, crypto) => {
    e.preventDefault();

    if (!validateAddress(wallet)) {
      setError('Invalid wallet address');
      return;
    }

    try {
      fetchWalletTransactions(wallet);

    } catch (error) {
      console.error('Error fetching wallet info:', error);
    } finally {
    }
  };

  useEffect(() => {

    if (typeof window !== 'undefined') {
      const language = navigator.language || navigator.userLanguage;

      if (language.startsWith('en')) {
        setLanguageDetected('English');
      } else if (language.startsWith('es')) {
        setLanguageDetected('Spanish');
      } else {
        setLanguageDetected('English');
      }
    }
  }, []);

  useEffect(() => {
    if (!resolvedProfits || resolvedProfits.length === 0) return

    const totalProfits = resolvedProfits.filter(value => value && !Number.isNaN(value)).reduce((a, b) => a + b, 0)

    setTotalProfits(totalProfits)
  }, [resolvedProfits])

  if (!languageDetected) return

  return (
    <div className='d-flex flex-column w-100'>
      <GoogleAnalytics />
      <Navbar />
      <div className="d-flex bg-dark text-white justify-content-center align-items-center mainContainer w-100" data-bs-theme="dark">
        <div className="d-flex flex-column align-items-center justify-content-center text-center h-100">
          {!transactions && <Search
            setWallet={setWallet}
            handleSubmit={e => handleSubmit(e, crypto)}
            error={error}
            wallet={wallet}
            loading={loading}
            languageDetected={languageDetected}
          />}

          {transactions && !loading && <>

            <div className='d-flex mb-3 mt-3 pt-3'>
              <div className='text-white me-2'>
                {crypto === "BTC" && <FontAwesomeIcon className='text-white' size='xl' icon={faBitcoin} />}
                {crypto === "ETH" && <FontAwesomeIcon className='text-white' size='xl' icon={faEthereum} />}
                {crypto === "ADA" && <div>
                  <AdaCoin className="ada-logo mx-1" width={23.25} height={23.25}></AdaCoin>
                </div>}
              </div>

              {price && <h4>${price.toLocaleString() || "fetching price..."}</h4>}


            </div>
            <h4 className='ms-2'>{UIMessages[languageDetected].rightNow}</h4>
            <div className='d-flex mb-2 align-items-center'>
              {totalProfits && <h1 className={`${totalProfits > 0 ? "text-success" : "text-danger"}`}>{UIMessages[languageDetected].returns} {totalProfits > 0 ? "+" : ""}{totalProfits.toLocaleString()} USD

              </h1>}
              <span style={{ cursor: "pointer" }} onClick={e => setIsExplanationVisible(prev => !prev)}>
                <FontAwesomeIcon className='text-muted ms-3' style={{ fontSize: 20 }} icon={faQuestionCircle} />
              </span>
            </div>
            {isExplanationVisible && <div style={{ fontSize: 12, textAlign: "justify", position: "fixed", top: 10 }} className='alert alert-primary'>{UIMessages[languageDetected].explanation}</div>}
            <div className="d-flex justify-content-between py-2 flex-column">
              {transactions && transactions.length === 0 && <Spinner />}
            </div>
            {transactions && <span className='text-white mb-2 fw-bold text-white'>{UIMessages[languageDetected].gainsPerTx}</span>}

            {transactions && <div className='makeitscrollable_and_full_window_height mt-2'>
              {transactions.length > 0 && <Analysis languageDetected={languageDetected} wallet={wallet} crypto={crypto} setResolvedProfits={setResolvedProfits} transactions={transactions} resolvedProfits={resolvedProfits} currentPrice={price} walletInfo={walletInfo} />}
              {transactions.length === 0 && <h5 className='text-danger'>{UIMessages[languageDetected].noTxFound}</h5>}
            </div>}

          </>}

        </div>

      </div>
      {!transactions && <ExplanationSection languageDetected={languageDetected} />
      }
      <Info></Info>
    </div>
  );
}
