import { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

const BASE_URL = 'https://v6.exchangerate-api.com/'

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch(BASE_URL + 'v6/de7331224a2237dc0ed89824/latest/USD')
      .then(res => res.json())
      .then(data => {
        const secondCurrency = 'EUR'
        setCurrencyOptions([...Object.keys(data.conversion_rates)])
        setFromCurrency(data.base_code)
        setToCurrency(secondCurrency)
        setExchangeRate(data.conversion_rates[secondCurrency])
      })
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(BASE_URL + `v6/de7331224a2237dc0ed89824/pair/${fromCurrency}/${toCurrency}`)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setExchangeRate(data.conversion_rate)
        })
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }


  return (
    <>
    <div className='container'>
    <h1>Convert</h1>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectCurrency={fromCurrency}
          onChangeCurrency={e => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        />
        <div className='equals'>=</div>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={e => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
    </div>   
    </>
  );
}

export default App;
