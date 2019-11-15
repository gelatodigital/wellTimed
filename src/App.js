import React from "react";
import Web3Provider, { Connectors } from "web3-react";
import "./App.css";
import { MuiThemeProvider, createMuiTheme, Container } from "@material-ui/core";
import Page from "./components/Page";

import { green, pink, red } from "@material-ui/core/colors";
// Wallet Connect
import WalletConnectApi from "@walletconnect/web3-subprovider";

const {
  InjectedConnector,
  NetworkOnlyConnector,
  WalletConnectConnector
} = Connectors;

const supportedNetworkURLs =
{
  1: "https://mainnet.infura.io/v3/aaea3ac8bed443ac9400715e836d9235",
  3: "https://ropsten.infura.io/v3/aaea3ac8bed443ac9400715e836d9235",
  4: "https://rinkeby.infura.io/v3/aaea3ac8bed443ac9400715e836d9235"
}

const defaultNetwork = 4;

const Infura = new NetworkOnlyConnector({
  providerURL: supportedNetworkURLs[3]
});

const WalletConnect = new WalletConnectConnector({
  api: WalletConnectApi,
  bridge: "https://bridge.walletconnect.org",
  supportedNetworkURLs,
  defaultNetwork
});

const MetaMask = new InjectedConnector({ supportedNetworks: [1, 3, 4] });

console.log(MetaMask)
console.log(WalletConnect)


const connectors = { MetaMask, WalletConnect };

// `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red,
    pending: pink
  },
  typography: {
    fontFamily:  'Inconsolata, monospace',
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
