import React, { useContext, useEffect } from "react";


// Import Components
import OrderRowCreator from './OrderRowCreator'

import CoinContext, { CoinProvider } from "../contexts/CoinContext";

import {TimeProvider} from "../contexts/TimeContext"

import { OrderProvider } from "../contexts/OrderContext";



// Import ContextParents
import { ProxyProvider } from "../contexts/ProxyContext";

// Context so we access the users account & provider
import { useWeb3Context } from "web3-react";



import { makeStyles } from "@material-ui/core";


const style = makeStyles({
  card: {
    margin: "25px"
  },
  arrow: {
    marginTop: "20px"
  },
  title: {
    textAlign: "left"
  }
});

function Page() {
  const context = useWeb3Context();
  const classes = style();
  const coinContext = useContext(CoinContext);
  // State
  // Activate the current ERC20 Token
  const [erc20, setERC20] = React.useState(null);

  let ordersFromLocalStorage
  if (context.active) {
    console.log("isActive")
    let fetchedLocalStorage = JSON.parse(localStorage.getItem(`triggered-${context.account}`))
    if (fetchedLocalStorage !== null)
    {
      ordersFromLocalStorage = fetchedLocalStorage
    }
    else {
      ordersFromLocalStorage = []
    }
    console.log(ordersFromLocalStorage)
  } else {
    ordersFromLocalStorage = []
  }

  // Used to display orders Table in orders
  const [orders, setOrders] = React.useState(ordersFromLocalStorage)

  const ordersContext = {
    orders: orders,
    setOrders: setOrders
  }
  if (context.active && orders.length === 0 && ordersFromLocalStorage.length > 0) {
    setOrders(ordersFromLocalStorage)
  } else {

  }

  const [activeCoins, setActivCoins] = React.useState({
    triggerFrom: {
      symbol: "KNC",
      name: "KyberNetwork",
      address: "0xdd974d5c2e2928dea5f71b9825b8b646686bd200",
      decimals: 18,
      id: "0xdd974d5c2e2928dea5f71b9825b8b646686bd200",
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      },
      reserves_src: [
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F",
        "0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18",
        "0xD6000fda0b38f4Bff4CfAb188E0bd18e8725a5e7",
        "0xA467b88BBF9706622be2784aF724C4B44a9d26F4"
      ],
      reserves_dest: [
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F",
        "0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18",
        "0xD6000fda0b38f4Bff4CfAb188E0bd18e8725a5e7",
        "0xA467b88BBF9706622be2784aF724C4B44a9d26F4"
      ]
    },
    triggerTo: "",
    actionFrom: {
      symbol: "LINK",
      name: "Chain Link",
      address: "0xb4f7332ed719eb4839f091eddb2a3ba309739521",
      decimals: 18,
      id: "0xb4f7332ed719eb4839f091eddb2a3ba309739521",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }},
    actionTo: ""
  });
  const [needAllowance, setNeedAllowance] = React.useState(false)


  // Used to display tx hash
  const [transactionHash, setTransactionHash] = React.useState(undefined);
  // Used for reacting to successfull txs
  const [waitingForTX, setWaitingForTX] = React.useState(false);
  // Used for checking if user has a proxy + guard contract(3), proxy contract (2), or no proxy contract at all (1) - default (0)
  const [proxyStatus, setProxyStatus] = React.useState(0);

  const [time, setTime] = React.useState({
    numOrders: 0,
    intervalTime: 0,
    intervalType: ''
  });

  const timePackage = {time, setTime}

  console.log(time)

  console.log(orders)
  // const [rows, setRows] = React.useState(0)

  // function handleChange (newProxyStatus, newRows) {
  //   Promise.resolve().then(() => {
  //     ReactDOM.unstable_batchedUpdates(() => {
  //       setProxyStatus(newProxyStatus);
  //       setRows(newRows)
  //     })
  //   })
  // };


  function updateProxyStatus(newProxyStatus) {
    // console.log(`Setting new Proxy Status in Page.js`);
    // console.log(`${newProxyStatus}`);
    setProxyStatus(newProxyStatus);
  }

  function updateActiveCoins(coins) {
    console.log(`Setting coins in Page.js`);
    console.log(`${coins}`);
    setActivCoins(coins);
  }

  function updateAllowance(bool) {
    console.log(`Setting allowance in Page.js`);
    console.log(`${bool}`);
    setNeedAllowance(bool);
  }

  // function updateRows(newRows) {
  //   setRows(newRows)
  // }


  function fetchOrderFromLocalStorage() {
    console.log("fetchOrderFromLocalStorage")
    if (localStorage.getItem(`triggered-${context.account}`) !== null) {
      const ordersInStorage = localStorage.getItem(`triggered-${context.account}`)
      return(ordersInStorage)

    }
  }

  return (
    <React.Fragment>
      <ProxyProvider value={proxyStatus}>
        <CoinProvider value={activeCoins}>
          <OrderProvider value={ordersContext}>
            <TimeProvider value={timePackage}>
              <OrderRowCreator proxyStatus={proxyStatus} networkId={context.networkId} updateProxyStatus={updateProxyStatus} updateAllowance={updateAllowance} needAllowance={needAllowance} updateActiveCoins={updateActiveCoins} >
              </OrderRowCreator>
            </TimeProvider>
          </OrderProvider>
        </CoinProvider>
      </ProxyProvider>
    </React.Fragment>
  );
}

export default Page;
