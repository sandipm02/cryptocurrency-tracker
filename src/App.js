import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Coin from './components/Coin.jsx';
import './styling/App.css'

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const searchCoin = coins.filter(coin =>
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = e => {
    setSearch(e.target.value);
  };

  return (
    <div className='Capp'>
      <div className='Csearch'>
        <h1 className='Ctext'>Enter Currency ID</h1>
        <form>
          <input className='Cinput' onChange={handleChange} placeholder='example: BTC'/>
        </form>
      </div>
      {searchCoin.map(coin => {
        return (
          <Coin key={coin.id} name={coin.name} price={coin.current_price} symbol={coin.symbol} 
          marketcap={coin.total_volume} volume={coin.market_cap} image={coin.image} priceChange={coin.price_change_percentage_24h}/>
        );
      })}
    </div>
  );
}

export default App;