import React, {useContext, useEffect} from 'react'
import { useWeb3Context } from "web3-react";

// Import Components
import ConditionialSwitch from "./ConditionSwitch";
import ActionBtn from "./ActionBtn";
import ConnectBtn from "./ConnectBtn";
import Order from "./Orders";
import ApproveBtn from "./ApproveBtn";
import ERC20Input from "./ERC20Input";
import TokenInput from "./TokenInput";
import NoOfSwaps from "./NoOfSwaps";
import TimeBetween from "./TimeBetween";
import Interval from "./Interval";
import Grid from '@material-ui/core/Grid';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';


// Style
import { Icon, makeStyles, Card, CardContent } from "@material-ui/core";


const style = makeStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
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


function OrderRowCreator(props) {

    const context = useWeb3Context()
    const classes = style();



    let ordersInStorage;
    if (localStorage.getItem(`triggered-${context.account}`) !== null) {
        ordersInStorage = []
        let returnData = JSON.parse(localStorage.getItem(`triggered-${context.account}`))
        returnData.forEach(value => {
            ordersInStorage.push(value)
        })

    } else {
        ordersInStorage = 0;
    }
    let dummy;
    if (context.active)
    {
        dummy = [{
            ifThis: "10000 WETH >= 2000 DAI", thenSwap: "200 KNC => 2000 DAI", created: "10/20/19 - 19:02:43", status: "open", action: "cancel"
        }, {
            ifThis: "10000 WETH >= 2000 DAI", thenSwap: "200 KNC => 2000 DAI", created: "10/20/19 - 19:02:43", status: "open", action: "cancel"
        }]

    }
    else {
        dummy = [{
            ifThis: "10000 WETH >= 2000 DAI", thenSwap: "200 KNC => 2000 DAI", created: "10/20/19 - 19:02:43", status: "open", action: "cancel"
        }]
    }

    // console.log(dummy)

    const [orderRows, setOrderRows] = React.useState(dummy)

    // Props
    const proxyStatus = props.proxyStatus
    const networkId = context.networkId
    const updateProxyStatus = props.updateProxyStatus

    const updateAllowance = props.updateAllowance
    const needAllowance = props.needAllowance
    const updateActiveCoins = props.updateActiveCoins

    // Props for <TokenInputNoAmount>
    // // TriggerFrom
    const triggerFrom = {
      tokenType: 'triggerFrom',
      amountType: 'amountTriggerFrom',
      amountPlaceholder: '0',
      disabledAmount: false,
      defaultToken: (
        <span className={"makeStyles-coins-78"}>
        {"Kyber Network"}
        <img
          src={
            "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdd974d5c2e2928dea5f71b9825b8b646686bd200/logo.png"
          }
          alt="coin logo"
          className={"makeStyles-img-77"}
        />
        </span>
      )
    }
    // // TriggerTo
    const triggerTo = {
      tokenType: 'triggerTo',
      amountType: 'amountTriggerTo',
      amountPlaceholder: '0',
      disabledAmount: false,
      defaultToken: (
        <span>Select a Token</span>
      )
    }

    // // ActionFrom
    const actionFrom = {
      tokenType: 'actionFrom',
      amountType: 'amountActionTo',
      amountPlaceholder: '0',
      disabledAmount: false,
      defaultToken: (
        <span className={"makeStyles-coins-78"}>
        {"Chain Link"}
        <img
          src={"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771af9ca656af840dff83e8264ecf986ca/logo.png"}
          alt="coin logo"
          className={"makeStyles-img-77"}
        />
      </span>
      )
    }

     // // ActionTo
     const actionTo = {
      tokenType: 'actionTo',
      amountType: 'amountActionTo',
      amountPlaceholder: 'Market Price',
      disabledAmount: true,
      defaultToken: (
        <span>Select a Token</span>
      )
    }



    return (
        <React.Fragment>
            <ConnectBtn proxyStatus={proxyStatus} networkId={context.networkId} updateProxyStatus={updateProxyStatus} />
              <h1>Well Timed 🐎</h1>
              <h3>Time-based order splitting on Kyber Network</h3>
              <Card className={classes.card} raised>
                <CardContent>
                  <h4 className={classes.title}>Swap</h4>
                  <Grid container spacing={2}>
                      <Grid item xs={5}>
                        <ERC20Input needAllowance={needAllowance} updateAllowance={updateAllowance} updateActiveCoins={updateActiveCoins}></ERC20Input>
                      </Grid>
                      <Grid item xs={2}>
                        <SwapHorizIcon></SwapHorizIcon>
                      </Grid>
                      <Grid item xs={5}>
                        <TokenInput inputData={actionTo}></TokenInput>
                      </Grid>
                  </Grid>
                  <ApproveBtn updateAllowance={updateAllowance} needAllowance={needAllowance}></ApproveBtn>

                  {/* <TokenInput inputData={actionFrom}></TokenInput> */}
                  {/* <br></br>
                  <br></br> */}

                  {/* <SwapTo></SwapTo> */}

                </CardContent>
              </Card>
              <Icon>arrow_downward</Icon>
              <Card className={classes.card} raised>
                <CardContent>


                  <h4 className={classes.title}>How often?</h4>
                  {/* <TokenInput inputData={actionTo}></TokenInput> */}
                  <form className={classes.root} autoComplete="off">
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <NoOfSwaps></NoOfSwaps>
                      </Grid>
                      <Grid item xs={6}>
                        <TimeBetween ></TimeBetween>
                        <Interval></Interval>
                      </Grid>
                      {/* <Grid item xs={4}>
                      </Grid> */}
                    </Grid>
                  </form>

                </CardContent>
              </Card>
              <ActionBtn   updateProxyStatus={updateProxyStatus}></ActionBtn>
              <Order orderRows={orderRows}></Order>
        </React.Fragment>
    )
}

export default OrderRowCreator