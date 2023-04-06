# Real-Time Crypto Price Tracker

This app uses websockets to retrieve real-time cryptocurrency prices using the Binance API. Built with Node.js and Express, it provides an easy way to stay up-to-date with the latest market trends.

See branch: `server-side` and `client-side` for more info.

Update: For a client version in React, visit: - [Websocket React Crypto Price App](https://github.com/Arcturus91/websocket-react-crypto)

## Installation

To get started with this app, simply clone the repository and install the necessary dependencies:

```
git clone https://github.com/Arcturus91/cryptoWebsocketPrice.git
cd <fileName>
npm install
```

Create two different folder and in each one of them, put the respective client-side and server-side code so you have two different projects that can be run independantly.

## Usage

Once you have installed the dependencies, you can start the app by running:

`npm run start`

This will start the server and open a WebSocket connection to the Binance API, powered by Nodemon. The app will then begin to retrieve real-time cryptocurrency prices and display them in your console.

## Configuration

Before you can use this app, you will need to configure it with your Binance API credentials. You can do this by creating a `.env` file in the root of the project and adding the following variables:

```
API_KEY=your_api_key_here
SECRET_KEY=your_secret_key_here
```

You can obtain your API key and secret key from the Binance API website.

## Contributing

Contributions are always welcome! If you find a bug or have a suggestion for how to improve this app, please open an issue or submit a pull request.

However, in my repositories I have a larger project using websockets and crypto prices: CryptoExchange:

- [Crypto Exchange Backend](https://github.com/Arcturus91/cryptoExchangeBack)
- [Crypto Exchange Frontend](https://github.com/Arcturus91/cryptoExchangeFront)

---

Thanks for using Real-Time Crypto Price Tracker! If you have any questions or comments, please feel free to contact me.
