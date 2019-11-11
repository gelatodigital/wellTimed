import React, { useContext } from "react";
import {
  Input,
  Button,
  DialogTitle,
  Dialog,

  makeStyles,
  MenuItem
} from "@material-ui/core";

import { ethers } from "ethers";
import proxyRegistryABI from "../constants/ABIs/proxy-registry.json";
import kyberProxyABI from "../constants/ABIs/kyberProxy.json";

import { useWeb3Context } from "web3-react";
import CoinContext from "../contexts/CoinContext";
import TimeContext from "../contexts/TimeContext";

import { getCorrectImageLink } from "../helpers";
import { getTokenBalance, getTokenAllowance, updateEstimatedOrders } from "../helpers";
import { DS_PROXY_REGISTRY, KYBER_PROXY } from "../constants/contractAddresses";

const useStyles = makeStyles(theme => ({
  root: {
    width: '32px'
  },
  container: {
    display: "flex",
    justifyContent: "center",
    paddingLeft: '4px',


  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,

  },
  amountInput: {
    marginTop: '2px',
    width: '50px',
    textAlign: 'right'
  },
  img: {
    width: "24px",
    height: "24px",
    marginLeft: '3px'
  },
  coins: {
    display: "flex",
    justifyContent: "space-between",
    padding: '26px'
  },
  buttonPadding: {
    marginTop: '1.5px',
    width: '32px'
  }
}));

function ERC20Input(props) {
  const context = useWeb3Context();
  const classes = useStyles();
  const coinContext = useContext(CoinContext);
  const timeContext = useContext(TimeContext)
  const time = timeContext.time
  const updateSelectedTokenDetails = props.updateSelectedTokenDetails
  const selectedTokenDetails = props.selectedTokenDetails
  const updateActiveCoins = props.updateActiveCoins
  // State

  const [state, setState] = React.useState({
    open: false,
    coin: "",
    amount: 0,
    availableCoins: Object.values(getCorrectImageLink())
  });

  const handleChange = coin => {

    const newState = { ...state };
		newState["coin"] = coin;
    setState({ ...state, "coin": coin, open: false });
    coinContext.actionFrom = coin;
    const updatedCoinContext = updateEstimatedOrders(coinContext, time)
		updateActiveCoins(updatedCoinContext)
    checkERC20ApprovalStatus()
  };

  const handleClickOpen = () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };



  const userChoice = () => {
    if (state.coin) {
      return (
        <span className={classes.coins}>
          {state.coin.symbol}
          <img
            src={state.coin.logo(state.coin.mainnet)}
            alt="coin logo"
            className={classes.img}
          />
        </span>
      );
    } else {
      return  (<span className={classes.coins}>
        {"DAI"}
        <img
          src={"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359/logo.png"}
          alt="coin logo"
          className={classes.img}
        />
      </span>)
    }
  };

  const handleAmount = name => event => {
    const decimals = coinContext.actionFrom.decimals
    let value = event.target.value
    if (value === "") {
      setState({ ...state, [name]: 0 || "" });
      coinContext.amountActionFrom = 0;
    } else {
      const selectedAmount = ethers.utils.parseUnits(value, decimals)

      setState({ ...state, [name]: selectedAmount || "" });
      coinContext.amountActionFrom = selectedAmount;
    }
    const updatedCoinContext = updateEstimatedOrders(coinContext, time)
		updateActiveCoins(updatedCoinContext)
    checkERC20ApprovalStatus()
  };

  async function checkERC20ApprovalStatus() {
    // check if context has an actionFrom
    let copySelectedTokenDetails = {...selectedTokenDetails}
    if (context.active)
    {
      if (coinContext['actionFrom']['address']) {
        let sellTokenAddress = coinContext['actionFrom']['address'];

        // Check balance
        const signerAddress = context.account;
        const signer = context.library.getSigner();
        let sellTokenBalance = await getTokenBalance(sellTokenAddress, signer, signerAddress)


        // console.log(`SellTokenBalance: ${sellTokenBalance}`)
        let sellAmount = coinContext['amountActionFrom']

        // Check if user has sufficient Token Balance
        if (parseInt(sellTokenBalance) >= parseInt(sellAmount))
        {
          // Store that user has sufficinet balance
          copySelectedTokenDetails.sufficientBalance = true
          // Check if proxy is approved
          const proxyRegistryAddress = DS_PROXY_REGISTRY[context.networkId];
          const proxyRegistryContract = new ethers.Contract(
            proxyRegistryAddress,
            proxyRegistryABI,
            signer
          );
          const proxyAddress = await proxyRegistryContract.proxies(
            context.account)

          if (sellAmount && parseInt(sellAmount) > 0)
          {
            let sellTokenAllowance = await getTokenAllowance(
              sellTokenAddress,
              proxyAddress,
              signer,
              context.account
            );
            // console.log(`SellTokenAllowance: ${sellTokenAllowance}`)

            if (parseInt(sellTokenAllowance) < parseInt(sellAmount))
            {
              // Render approve button
              // console.log("User has enough tokens, but needs allowance")
              copySelectedTokenDetails.needAllowance = true
              // console.log(copySelectedTokenDetails)
              updateSelectedTokenDetails(copySelectedTokenDetails)
            } else {
              // console.log("has sufficient Tokens, and has sufficient balanece")
              // console.log("We can directly split sell")
              copySelectedTokenDetails.needAllowance = false
              updateSelectedTokenDetails(copySelectedTokenDetails)
            }

          }


        } else {
          copySelectedTokenDetails.sufficientBalance = false
          console.log("Render Modal: You don't have enough balance of Token X")
          updateSelectedTokenDetails(copySelectedTokenDetails)
        }
      }

    } else {
      updateSelectedTokenDetails(copySelectedTokenDetails)
    }
  }

  function renderDefaultValue() {
    console.log(coinContext.amountActionFrom)
    if (coinContext.amountActionFrom === undefined )
    {
      console.log("here")
      return 1.0
    } else {
      const actionSellAmount = coinContext["amountActionFrom"];
      const decimals = coinContext.actionFrom.decimals
      let userfriendlyAmount = ethers.utils.formatUnits(actionSellAmount, decimals)
      return userfriendlyAmount.toString()
    }

  }

  return (
    <div className={classes.container}>
      <Input
        className={classes.amountInput}
        disableUnderline={true}
        onChange={handleAmount("amount")}
        type="number"
        autoComplete="off"
        value={renderDefaultValue()}
      />
      <Button
        className={classes.buttonPadding}
        // color={state.coin ? "primary" : "secondary"}
        // color={state.coin ? "primary" : "secondary"}
        onClick={handleClickOpen}
      >
        {" "}
        {userChoice()}
      </Button>
      <Dialog
				disableBackdropClick
				disableEscapeKeyDown
				open={state.open}
				onClose={handleClose}
				value={state.coin}
				// onChange={handleChange("coin")}
			>
				<DialogTitle>Choose coin from dropdown</DialogTitle>
				{/* <Select value={state.coin} onChange={handleChange("coin")} onClick={console.log("click")} > */}
				{/* // <div value={state.coin} onChange={handleChange("coin")}> */}
				{state.availableCoins.map((coin, key) => {
					return (
						<MenuItem
							// onChange={handleChange("coin")}
							// onClick={handleClose}
							onClick={() => {
								handleChange(coin);
							}}
							key={key}
							value={coin}
							className={classes.coins}
						>
							{coin.symbol}
							<img
								className={classes.img}
								src={coin.logo(coin.mainnet)}
								alt="coin logo"
							/>
						</MenuItem>
					);
				})}
			</Dialog>
    </div>
  );
}

export default ERC20Input;
