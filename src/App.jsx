import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('IND');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        const url = `https://v6.exchangerate-api.com/v6/700f3b102273c83b6a92f711/latest/${fromCurrency}`;
        const response = await axios.get(url);
        setExchangeRate(response.data.conversion_rates[toCurrency]);
       } catch (error) {
        console.error('Error fetching exchange rate: ', error);
      }
    };
    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate !== null) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <div className='currency-converter'>
      <div className='box'></div>
      <div className='data'>
        <h1>Currency Converter</h1>
        <div className='input-container'>
          <label htmlFor='amt'>Amount </label>
          <input type='number' id='amt' value={amount} onChange={handleAmountChange} />
        </div>
        <div className='input-container'>
          <label htmlFor='fromcurrency'>From Currency </label>
          <select id='fromcurrency' value={fromCurrency} onChange={handleFromCurrencyChange}>
            <option value='INR'>INR - Indian Rupee</option>
            <option value='USD'>USD - United States Dollar</option>
            <option value='EUR'>EUR - Euro</option>
            <option value='GBP'>GBP - British Pound Sterling</option>
            <option value='JPY'>JPY - Japanese Yen</option>
            <option value='CAD'>CAD - Canadian Dollar</option>
          </select>
        </div>
        <div className='input-container'>
          <label htmlFor='tocurrency'>To Currency </label>
          <select id='tocurrency' value={toCurrency} onChange={handleToCurrencyChange}>
            <option value='INR'>INR - Indian Rupee</option>
            <option value='USD'>USD - United States Dollar</option>
            <option value='EUR'>EUR - Euro</option>
            <option value='GBP'>GBP - British Pound Sterling</option>
            <option value='JPY'>JPY - Japanese Yen</option>
            <option value='CAD'>CAD - Canadian Dollar</option>
          </select>
        </div>
        <div className='result'>
          <p>
            {amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
