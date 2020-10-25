import React, { useState } from "react";
import "./choice-panel.css";
import Fade from "react-reveal/Fade";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { CryptoList } from "./CryptoList";

export const ChoicePanel = ({ setGetStarted }) => {
  const [choice, setChoice] = useState("");
  return (
    <div className="fade-panel">
      <Button
        onClick={() => {
          setChoice("");
          setGetStarted(false);
        }}
        type="primary"
        shape="circle"
        icon={<CloseOutlined />}
      />
      <div className="list-items">
        <div style={{ backgroundColor: "#272727", borderRadius: "10px" }}>
          <div className="inside-flex">
            <div onClick={() => setChoice("forex")}>
              <h1
                className={
                  choice === "forex" ? "list-item-selected" : "list-item"
                }
              >
                Forex
              </h1>
            </div>
            <div onClick={() => setChoice("crypto")}>
              <h1
                className={
                  choice === "crypto" ? "list-item-selected" : "list-item"
                }
              >
                Crypto
              </h1>
            </div>
            <div onClick={() => setChoice("stocks")}>
              <h1
                className={
                  choice === "stocks" ? "list-item-selected" : "list-item"
                }
              >
                Stocks
              </h1>
            </div>
            <div onClick={() => setChoice("commo")}>
              <h1
                className={
                  choice === "commo" ? "list-item-selected" : "list-item"
                }
              >
                Commodity
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="stock-list">
        {/* <Fade left when={choice === "crypto"}> */}
        {choice === "crypto" && <CryptoList />}
        {/* </Fade> */}
      </div>
    </div>
  );
};
