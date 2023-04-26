import { useEffect } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

const BASE_URL = 'https://v6.exchangerate-api.com/v6/de7331224a2237dc0ed89824/latest/USD'

function App() {

useEffect(() => {
  fetch(BASE_URL)
  .then(res => res.json())
  .then(data => console.log(data))
})

  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow />
      <div className='equals'>=</div>
      <CurrencyRow />
    </>
  );
}

export default App;
