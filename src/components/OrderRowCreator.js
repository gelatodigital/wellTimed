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

    return (
        <React.Fragment>
            <ConnectBtn proxyStatus={proxyStatus} networkId={context.networkId} updateProxyStatus={updateProxyStatus} />
              <h1>TriggeredX</h1>
              <h3>Cross-Token Conditional Limit Orders for DEXs</h3>
              <Card className={classes.card} raised>
                <CardContent>
                  <h4 className={classes.title}>If this condition is true</h4>
                  <LockFrom></LockFrom>
                  <ConditionialSwitch></ConditionialSwitch>
                  <LockTo></LockTo>
                </CardContent>
              </Card>
              <Icon>arrow_downward</Icon>
              <Card className={classes.card} raised>
                <CardContent>
                  <h4 className={classes.title}>Then swap these coins</h4>
                  <ERC20Input needAllowance={needAllowance} updateAllowance={updateAllowance} updateActiveCoins={updateActiveCoins}></ERC20Input>
                  <br></br>
                  <ApproveBtn updateAllowance={updateAllowance} needAllowance={needAllowance}></ApproveBtn>
                  <br></br>
                  <Icon className={classes.arrow}>arrow_downward</Icon>
                  <SwapTo></SwapTo>
                </CardContent>
              </Card>
              <ActionBtn   updateProxyStatus={updateProxyStatus}></ActionBtn>
              <Order orderRows={orderRows}></Order>
        </React.Fragment>
    )
}

export default OrderRowCreator