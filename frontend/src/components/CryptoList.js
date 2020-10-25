import React, { useState } from "react";
import usePromise from "react-promise";
import bitcoinLogo from "../assets/bitcoin.png";
import bitcoinCashLogo from "../assets/bitcoin-cash.png";
import dashLogo from "../assets/dash.png";
import etherLogo from "../assets/ether.png";
import liteLogo from "../assets/lite.png";
import neoLogo from "../assets/neo.png";
import zcashLogo from "../assets/zcash.png";
import Traderoom from "./Traderoom";
import "./cryptolist.css";
const list = [
  { name: "BINANCE:BTCUSD", link: bitcoinLogo },
  { name: "BINANCE:LTCUSDT", link: liteLogo },
  { name: "BINANCE:ETHUSDT", link: etherLogo },
  { name: "BINANCE:BCHUSDT", link: bitcoinCashLogo },
  { name: "BINANCE:DASHUSDT", link: dashLogo },
  { name: "BINANCE:NEOUSDT", link: neoLogo },
  { name: "BINANCE:XZCUSDT", link: zcashLogo },
];
const JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjk1M2Q5MzBkOTcwNDU3MDA0ZmVhMjIiLCJpYXQiOjE2MDM2MTYxNDh9.TBMBDnaqwKr8wp1njT4dzsV7yEgdTsKAPcU5UB3nDys";

function fetchData() {
  return new Promise((res, rej) => {
    fetch("http://spacecowboys.tech:3000/dashboard", {
      headers: {
        authorization: JWT_TOKEN,
      },
    })
      .then((j) => {
        return j.json();
      })
      .then((data) => res(data));
  });
}

export const CryptoList = () => {
  const { value, loading } = usePromise(fetchData);
  if (!loading) console.log("value", value.prices);
  const [itemChoice, setItemChoice] = useState("");
  if (loading) return <p>Loading</p>;
  return (
    <div
      className={itemChoice === "" ? "list-container" : "list-container-crypto"}
    >
      {itemChoice === "" ? (
        <div>
          {list.map((item) => (
            <div
              className="list-item-inside"
              onClick={() => setItemChoice(item.name)}
            >
              <img src={item.link} className="list-logo" alt="logo" />
              <p>{item.name}</p>
              {value.prices[item.name] && (
                <p style={{ marginLeft: "1%" }}>
                  {value.prices[item.name].price}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <Traderoom itemChoice={itemChoice} setItemChoice={setItemChoice} />
        </div>
      )}
    </div>
  );
};
