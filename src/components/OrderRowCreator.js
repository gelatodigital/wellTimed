import React, {useContext, useEffect} from 'react'
import { useWeb3Context } from "web3-react";

// Import Components
import LockFrom from "./LockFrom";
import LockTo from "./LockTo";
import ConditionialSwitch from "./ConditionSwitch";
import ActionBtn from "./ActionBtn";
import ConnectBtn from "./ConnectBtn";
import Order from "./Orders";
import ApproveBtn from "./ApproveBtn";
import ERC20Input from "./ERC20Input";
import SwapTo from "./SwapTo";
import TokenInput from "./TokenInput";

// Style
import { Icon, makeStyles, Card, CardContent } from "@material-ui/core";


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

    // Props for <TokenInput>
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
      amountPlaceholder: 'MAX',
      disabledAmount: true,
      defaultToken: (
        <span>Select a Token</span>
      )
    }



    return (
        <React.Fragment>
            <ConnectBtn proxyStatus={proxyStatus} networkId={context.networkId} updateProxyStatus={updateProxyStatus} />
              <h1>TriggerdX</h1>
              <h3>Advanced ERC20 Trading using Contingent Orders</h3>
              <Card className={classes.card} raised>
                <CardContent>
                  <h4 className={classes.title}>If this condition is met</h4>
                  {/* <LockFrom></LockFrom> */}
                  <TokenInput inputData={triggerFrom}></TokenInput>
                  <ConditionialSwitch></ConditionialSwitch>
                  {/* <LockTo></LockTo> */}
                  <TokenInput inputData={triggerTo}></TokenInput>
                </CardContent>
              </Card>
              <Icon>arrow_downward</Icon>
              <Card className={classes.card} raised>
                <CardContent>
                  <h4 className={classes.title}>Place this market order</h4>
                  <ERC20Input needAllowance={needAllowance} updateAllowance={updateAllowance} updateActiveCoins={updateActiveCoins}></ERC20Input>
                  {/* <TokenInput inputData={actionFrom}></TokenInput> */}
                  <br></br>
                  <ApproveBtn updateAllowance={updateAllowance} needAllowance={needAllowance}></ApproveBtn>
                  <br></br>
                  <Icon className={classes.arrow}>arrow_downward</Icon>
                  {/* <SwapTo></SwapTo> */}
                  <TokenInput inputData={actionTo}></TokenInput>
                </CardContent>
              </Card>
              <ActionBtn   updateProxyStatus={updateProxyStatus}></ActionBtn>
              <Order orderRows={orderRows}></Order>
        </React.Fragment>
    )
}

export default OrderRowCreator