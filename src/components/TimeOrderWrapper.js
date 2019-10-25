import React from 'react'
import { useWeb3Context } from "web3-react";

// Import Components
import ActionBtn from "./ActionBtn";
import ApproveBtn from "./ApproveBtn";
import ConnectBtn from "./ConnectBtn";
import Order from "./Orders";
import ERC20Input from "./ERC20Input";
import TokenInputNoAmount from "./TokenInputNoAmount";
import NoOfSwaps from "./NoOfSwaps";
import TimeBetween from "./TimeBetween";
import Interval from "./TimeInterval";



// Style
import { Divider, makeStyles, Card, CardContent } from "@material-ui/core";


const style = makeStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    card: {
      // margin: "25px"
      marginTop: "50px",
      marginBottom: "25px"
    },
    cardContent: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'space-between'
    },
    arrow: {
      marginTop: "20px"
    },
    title: {
      textAlign: "left"
    },
    inputs: {
      textAlign: "center"
    },
    dividerClass: {
      marginTop: '20px',
      marginBottom: '10px'
    }
  });


function TimeOrderWrapper(props) {

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
              <h3>Time-based order splitting on Kyber</h3>

              <Card className={classes.card} raised>
                <CardContent className={classes.cardContent}>
                  {/* <h4 className={classes.title}>Title</h4> */}
                    <p className={classes.inputs}>Split my</p>
                    <ERC20Input needAllowance={needAllowance} updateAllowance={updateAllowance} updateActiveCoins={updateActiveCoins}></ERC20Input>
                    <p className={classes.inputs}>to</p>
                    <TokenInputNoAmount inputData={actionTo}></TokenInputNoAmount>
                    <p className={classes.inputs}>order over</p>
                    <TimeBetween ></TimeBetween>
                    <Interval></Interval>
                    <p className={classes.inputs}>using</p>
                    <NoOfSwaps></NoOfSwaps>
                    <p className={classes.inputs}>trades</p>
                </CardContent>
              </Card>

              <ActionBtn   updateProxyStatus={updateProxyStatus}></ActionBtn>
              <Divider variant="middle" className={classes.dividerClass}/>
              <h3>Your orders</h3>
              <Order orderRows={orderRows}></Order>
        </React.Fragment>
    )
}

export default TimeOrderWrapper