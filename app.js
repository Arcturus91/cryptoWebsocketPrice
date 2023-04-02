const io = require("socket.io-client");
const axios = require("axios");
const socket = io("ws://localhost:3000");

socket.on("connection", () => {
  console.log("Connected to server");
});

socket.on("cryptoPrice", (price) => {
  console.log("Received price:", price);
});

axios
  .get("http://localhost:3000/spotPriceBTC")
  .then((response) => {
    console.log("from axios", response.data);
  })
  .catch((e) => {
    console.log("the error", e);
  });

socket.on("disconnect", () => {
  console.log("server disconnected");
});
