import React, { useEffect } from "react";
import { ethers } from "ethers";

// Import Components

import TimeOrderWrapper from './TimeOrderWrapper'

import { CoinProvider } from "../contexts/CoinContext";

import {TimeProvider} from "../contexts/TimeContext"

import { OrderProvider } from "../contexts/OrderContext";

// ABIS
import gelatoCoreABI from "../constants/ABIs/gelatoCore.json";

// Import addresses
import {
	DS_PROXY_REGISTRY,
	GELATO_CORE,
	EXECUTOR
} from "../constants/contractAddresses";


// Import ContextParents
import { ProxyProvider } from "../contexts/ProxyContext";

// Context so we access the users account & provider
import { useWeb3Context } from "web3-react";


// const style = makeStyles({
//   card: {
//     margin: "25px"
//   },
//   arrow: {
//     marginTop: "20px"
//   },
//   title: {
//     textAlign: "left"
//   }
// });

function Page() {
  const context = useWeb3Context();

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
    actionTo: {
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
    }
  });
  const [selectedTokenDetails, setSelectedTokenDetails] = React.useState({needAllowance: false, sufficientBalance: false})

  // Used for checking if user has a proxy + guard contract(3), proxy contract (2), or no proxy contract at all (1) - default (0)
  const [proxyStatus, setProxyStatus] = React.useState(0);

  const [time, setTime] = React.useState({
    numOrders: 2,
    intervalTime: 10,
    intervalType: 'minutes'
  });

  const timePackage = {time, setTime}


  async function fetchExecutionClaims() {
    if (context.active) {

      const signer = context.library.getSigner()
      const gelatoCoreAddress = GELATO_CORE[context.networkId]
      const gelatoCore = new ethers.Contract(gelatoCoreAddress, gelatoCoreABI, signer)
      console.log(gelatoCore)

      // Create Filter
      let topic = ethers.utils.id(gelatoCore.interface.events.LogNewExecutionClaimMinted.signature);

      let abi = [
        "event LogNewExecutionClaimMinted(address indexed selectedExecutor, uint256 indexed executionClaimId, address indexed userProxy, bytes executePayload, uint256 executeGas, uint256 executionClaimExpiryDate, uint256 executorFee)"
      ];

      let iface = new ethers.utils.Interface(abi)

      const filter = {
        address: gelatoCoreAddress,
        fromBlock: 6660070,
        topics: [topic]
      };
      const logs = await signer.provider.getLogs(filter);
      logs.forEach((log) => {
        let decodedLogs = iface.parseLog(log).values;
        console.log(decodedLogs)
        // Do something with decoded data
      });
      }
  }

  fetchExecutionClaims()


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

  function updateSelectedTokenDetails(newSelectedTokenDetails) {
    console.log(`Updating Selected Token Details`);
    console.log(`${newSelectedTokenDetails}`);
    setSelectedTokenDetails(newSelectedTokenDetails)
  }

  // function updateRows(newRows) {
  //   setRows(newRows)
  // }


  // function fetchOrderFromLocalStorage() {
  //   console.log("fetchOrderFromLocalStorage")
  //   if (localStorage.getItem(`triggered-${context.account}`) !== null) {
  //     const ordersInStorage = localStorage.getItem(`triggered-${context.account}`)
  //     return(ordersInStorage)

  //   }
  // }
  return (
    <React.Fragment>
      <ProxyProvider value={proxyStatus}>
        <CoinProvider value={activeCoins}>
          <OrderProvider value={ordersContext}>
            <TimeProvider value={timePackage}>
              <TimeOrderWrapper proxyStatus={proxyStatus} networkId={context.networkId} updateProxyStatus={updateProxyStatus} updateSelectedTokenDetails={updateSelectedTokenDetails} selectedTokenDetails={selectedTokenDetails} updateActiveCoins={updateActiveCoins} >
              </TimeOrderWrapper>
            </TimeProvider>
          </OrderProvider>
        </CoinProvider>
      </ProxyProvider>
    </React.Fragment>
  );
}

export default Page;
