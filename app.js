const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

let numClients = 0;
const Binance = require("node-binance-api");
const binance = new Binance().options({
  APIKEY: process.env.APIKEY,
  APISECRET: process.env.APISECRET,
});

io.on("connection", (socket) => {
  /*TODO: tried to find a way to display all connected users but need more time:
  const clientSocketMap = io.sockets.sockets;
  const socketMapObject = Object.fromEntries(clientSocketMap);
   console.log(Object.keys(socketMapObject)); 
  console.log(socketMapObject[Object.keys(socketMapObject)[0]]); */

  numClients++;
  console.log("clients listening ", numClients);

  socket.on("disconnect", () => {
    console.log("user disconnected");
    numClients--;
  });

  const btcPrice = binance.websockets.candlesticks(
    ["BTCUSDT"],
    "1m",
    (candlesticks) => {
      let { s: symbol, k: ticks } = candlesticks;
      let { c: close } = ticks;
      let cryptoPrice = +close;
      console.info(symbol + ": " + cryptoPrice);
      io.emit("btcPrice", { symbol: symbol, price: cryptoPrice }); //it is key to have the emit event in the candlesticks arro function. This way we ensure the event goes out with the info.
    }
  );

  const ethPrice = binance.websockets.candlesticks(
    ["ETHUSDT"],
    "1m",
    (candlesticks) => {
      let { s: symbol, k: ticks } = candlesticks;
      let { c: close } = ticks;
      let cryptoPrice = +close;
      console.info(symbol + ": " + cryptoPrice);
      io.emit("ethPrice", { symbol: symbol, price: cryptoPrice }); //it is key to have the emit event in the candlesticks arro function. This way we ensure the event goes out with the info.
    }
  );
});

app.get("/spotPriceBTC", (req, res, next) => {
  binance
    .prices()
    .then((ticker) => {
      const btcPrice = ticker.BTCUSDT;
      res.status(200).json({ btcPrice });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ errorMessage: error.message });
      }
      return res.status(500).json({ errorMessage: error.message });
    });
});
server.listen(8080, () => {
  console.log("server listening on port 8080");
});

/* 
router.get("/closeWebSocket", (req, res, next) => {
  let log = false;
  let endpoints = binance.websockets.subscriptions();
  for (let endpoint in endpoints) {
    if (log) console.log("Terminated ws endpoint: " + endpoint);
    binance.websockets.terminate(endpoint);
  }
  res.status(200).json("web socket closed");
}); */

/* console.log(candlesticks);
{
  e: 'kline',
  E: 1680754354677,
  s: 'ETHUSDT',
  k: {
    t: 1680754320000,
    T: 1680754379999,
    s: 'ETHUSDT',
    i: '1m',
    f: 1123255101,
    L: 1123255339,
    o: '1897.21000000',
    c: '1896.89000000',
    h: '1897.22000000',
    l: '1896.89000000',
    v: '21.26500000',
    n: 239,
    x: false,
    q: '40341.20849700',
    V: '9.22500000',
    Q: '17499.90564700',
    B: '0'
  }
} */
