require("dotenv").config()
const options = {}
const WebSocket = require("ws")
const finnWS = new WebSocket(process.env.FINNHUB_WS_URL)
const io = require("socket.io")
const socket = io.listen(3000)

var recentPrice = {}

finnWS.addEventListener('open', (e) => {
    finnWS.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
    finnWS.send(JSON.stringify({'type':'subscribe', 'symbol': 'MSFT'}))
    finnWS.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'AMZN' }))
    finnWS.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'GOOGL' }))
    //Crypto
    finnWS.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'BINANCE:BTCUSDT' })) // Bitcoin to USD
    finnWS.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'BINANCE:ETHUSDT' })) // Etherium to USD
    finnWS.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'BINANCE:DASHUSDT' })) // DashCoin to USD
    finnWS.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'BINANCE:XZCUSDT' })) // ZCash to USD
    finnWS.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'BINANCE:NEOUSDT' })) // Neo to USD
    finnWS.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'BINANCE:LTCUSDT' })) // LiteCoin to USD
    finnWS.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'BINANCE:BCHUSDT' })) // Bitcoin Cash to USD
});

finnWS.addEventListener('message', (e) => {
    trades = JSON.parse(e.data)
    if (trades.type == "trade") {
        for (trade of trades.data) {
            recentPrice[trade.s] = {
                price: trade.p,
                unixTime: trade.t
            }
        }
    }    
})

socket.on("connection", socket => {
    console.log("New connection");
    socket.emit("A new user hi")

    setInterval(() => {
        socket.emit("price", recentPrice)
    }, 1000);
})

