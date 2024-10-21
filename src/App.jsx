import React, { useState } from "react";
import WebSocketChart from "./components/WebSocketChart";

function App() {
  const [symbol, setSymbol] = useState("ethusdt");
  const [interval, setInterval] = useState("1m");

  return (
    <div className="App">
      <h1>Binance Candlestick Chart</h1>
      <div>
        <select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
          <option value="ethusdt">ETH/USDT</option>
          <option value="bnbusdt">BNB/USDT</option>
          <option value="dotusdt">DOT/USDT</option>
        </select>

        <select value={interval} onChange={(e) => setInterval(e.target.value)}>
          <option value="1m">1 Minute</option>
          <option value="3m">3 Minutes</option>
          <option value="5m">5 Minutes</option>
        </select>
      </div>

      <WebSocketChart symbol={symbol} interval={interval} />
    </div>
  );
}

export default App;
