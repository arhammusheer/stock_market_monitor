require("dotenv").config()
const WebSocket = require("ws")
const finnWS = new WebSocket(process.env.FINNHUB_WS_URL)

finnWS.addEventListener('open', (e) => {
    finnWS.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'AAPL' }))
    console.log("Subscribed to AAPL")
    //finnWS.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'BINANCE:BTCUSDT' }))
    //finnWS.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'IC MARKETS:1' }))
});

finnWS.addEventListener('message', (e) => {
    console.log(e.data)
})