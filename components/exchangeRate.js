import { useEffect, useRef, useState } from 'react';
import { currencies } from '../data/currencies';

export default function ExchangeRate({ price, exchangeCurr }) {
  async function getExchangeRates(currency) {
    try {
      const response = await fetch(`/api/exchange/${currency}`, {
        method: 'GET',
      });

      const json = await response.json();
      setRates(json[currency]);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getExchangeRates(exchange.current.value);
  }, []);

  const [rates, setRates] = useState();
  const exchange = useRef();

  return (
    <div className="flex text-lime-300 justify-end font-mono align-bottom">
      {price ? (
        <p>
          {price.final_formatted} {'==='}{' '}
          {(
            price.final /
            (rates[exchangeCurr.current.value.toLowerCase()] * 100)
          ).toFixed(2)}
        </p>
      ) : null}

      <select
        onChange={(event) => {
          getExchangeRates(event.target.value);
        }}
        ref={exchange}
        defaultValue="eur"
        className="bg-transparent border-b-2 border-neutral-400 text-blue-200 font-sans text-base"
      >
        {currencies.map((currency, index) => (
          <option
            className="bg-neutral-900"
            key={currency}
            value={currency.toLowerCase()}
          >
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}
