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
import testTransactions from "../../data/walletSample.json"
import { RocketIcon } from "@radix-ui/react-icons"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
  const [isInvalidAddress, setIsInvalidAddress] = useState(false)
  const [isExplanationVisible, setIsExplanationVisible] = useState(false)

  const fetchPrice = async (crypto) => {
    try {
      const res = await fetch(`/api/coin-price?crypto=${crypto}`);
      const data = await res.json();

      if (res.ok) {
        setPrice(data.price);
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
        if (!response.ok) {
          setError("Error fetching wallet")
        }
        const data = await response.json();
        setWalletInfo(data)
        setTransactions(data)
      }
    } catch (error) {
      console.log('Error fetching transactions:', error);

    } finally {
      setLoading(false)
    }
  };


  const handleSubmit = async (e, crypto) => {
    e.preventDefault();

    if (!validateAddress(wallet)) {
      setIsInvalidAddress(true);
      return;
    }

    try {
      fetchWalletTransactions(wallet);
    } catch (error) {
      console.error('Error fetching wallet info:', error);
      setError("Failed to fetch wallet transactions")
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
    setLoading(false)
  }, [resolvedProfits])

  useEffect(() => {
    if (!isInvalidAddress) return

    const timer = setTimeout(() => {
      setIsInvalidAddress(false)
    }, 2000);

    return () => clearTimeout(timer)
  }, [isInvalidAddress])

  if (!languageDetected) return

  if (error) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <Alert className="bg-dark border-danger text-danger mt-4" style={{ maxWidth: 500 }}>
          <AlertDescription className="flex justify-between items-center">
            {error}
            <Button className="ml-auto bg-secondary" onClick={e => window.location.reload()}>Go back</Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }


  return (
    <div className='d-flex flex-column w-100'>
      <GoogleAnalytics />
      <Navbar />

      <div data-bs-theme="dark" className="d-flex flex-column align-items-center pt-4 text-center h-100 bg-dark mainContainer">

        {!transactions && <Search
          setWallet={setWallet}
          handleSubmit={e => handleSubmit(e, crypto)}
          error={error}
          wallet={wallet}
          loading={loading}
          languageDetected={languageDetected}
          isInvalidAddress={isInvalidAddress}
        />}


        {loading && <Skeleton className="h-4 w-[250px]" />}
        {transactions && !loading && !error && <>


          <Card className={`bg-dark text-white border-${totalProfits > 0 ? "success" : "danger"}`}>
            <CardHeader>
              <CardTitle>  {totalProfits && <h1 className={`${totalProfits > 0 ? "text-success" : "text-danger"}`}>{totalProfits > 0 ? "+" : ""}{totalProfits.toLocaleString()} USD
              </h1>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="d-flex justify-content-center align-items-center mb-1">
                <div className='text-white me-3'>
                  {crypto === "BTC" && <FontAwesomeIcon className='text-white' size='xl' icon={faBitcoin} />}
                  {crypto === "ETH" && <FontAwesomeIcon className='text-white' size='xl' icon={faEthereum} />}
                  {crypto === "ADA" && <div>
                    <AdaCoin className="ada-logo mx-1" width={23.25} height={23.25}></AdaCoin>
                  </div>}

                </div>
                {price && <h4 className="mb-0">${price.toLocaleString() || "fetching price..."}</h4>}
              </div>
              <CardDescription>Right now!</CardDescription>
            </CardContent>

          </Card>


          <Alert className="bg-dark border-light text-light mt-4" style={{ maxWidth: 500 }}>
            <AlertDescription>
              {UIMessages[languageDetected].explanation}
            </AlertDescription>
          </Alert>

          {transactions && <div className='makeitscrollable_and_full_window_height mt-2 d-flex justify-content-center'>
            {transactions.length > 0 && <Analysis languageDetected={languageDetected} wallet={wallet} crypto={crypto} setResolvedProfits={setResolvedProfits} transactions={transactions} resolvedProfits={resolvedProfits} currentPrice={price} walletInfo={walletInfo} />}
            {transactions.length === 0 && <h5 className='text-danger'>{UIMessages[languageDetected].noTxFound}</h5>}
          </div>}

        </>}

      </div>
      {!transactions && <ExplanationSection languageDetected={languageDetected} />}
      <Info></Info>
    </div>


  );
}
