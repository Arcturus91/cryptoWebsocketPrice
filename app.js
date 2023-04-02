const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server);

const Binance = require("node-binance-api");
const binance = new Binance().options({
  APIKEY: process.env.APIKEY,
  APISECRET: process.env.APISECRET,
});

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  const data = binance.websockets.candlesticks(
    ["BTCUSDT"],
    "1m",
    (candlesticks) => {
      let { e: eventType, E: eventTime, s: symbol, k: ticks } = candlesticks;
      let { c: close, i: interval } = ticks;
      console.info(symbol + " " + interval + " candlestick update");
      console.info("close: " + close);
      io.emit("cryptoPrice", { symbol: symbol, price: close }); //it is key to have the emit event in the candlesticks arro function. This way we ensure the event goes out with the info.
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
server.listen(3000, () => {
  console.log("server listening on port 3000");
});
