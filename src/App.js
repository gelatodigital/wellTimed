import React from "react";
import Web3Provider from "web3-react";
import InjectedConnector from "./InjectedConnector";
import NetworkOnlyConnector from "./NetworkOnlyConnector";
import "./App.css";
import { MuiThemeProvider, createMuiTheme, Container } from "@material-ui/core";
import Page from "./components/Page";

import ConnectBtn from "./components/ConnectBtn";
import { green, pink, red } from "@material-ui/core/colors";

// const dotenv = require('dotenv');
// const env = dotenv.config().parsed

// const { InjectedConnector, NetworkOnlyConnector } = Connectors;
const Infura = new NetworkOnlyConnector({
  providerURL: process.env.REACT_APP_NETWORK_URL
});
const MetaMask = new InjectedConnector({ supportedNetworks: [1, 3, 4] });
const connectors = { MetaMask, Infura };

// `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red,
    pending: pink
  }
});

function App() {
  return (
    <Web3Provider connectors={connectors} libraryName={"ethers.js"}>
      <div className="App">
        <Container maxWidth="md">
          <MuiThemeProvider theme={theme}>
            <Page />
          </MuiThemeProvider>
        </Container>
      </div>
    </Web3Provider>
  );
}

export default App;
