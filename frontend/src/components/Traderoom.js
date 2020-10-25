import React from "react";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { Button } from "antd";

const TradeRoom = ({ itemChoice, setItemChoice }) => {
  const mapper = {
    "BINANCE:BTCUSDT": "BTCUSD",
    "BINANCE:LTCUSDT": "LTCUSD",
    "BINANCE:ETHUSDT": "ETHUSD",
    "BINANCE:BCHUSDT": "BCHUSD",
    "BINANCE:DASHUSDT": "DASHUSD",
    "BINANCE:NEOUSDT": "NEOUSD",
    "BINANCE:XZCUSDT": "ZECUSD",
  };
  return (
    <>
      <Button onClick={() => setItemChoice("")}>Back</Button>
      <TradingViewWidget symbol={mapper[itemChoice]} theme={Themes.DARK} />
    </>
  );
};

export default TradeRoom;
