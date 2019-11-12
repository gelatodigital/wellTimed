import React, { useContext }  from 'react'
import { useWeb3Context } from "web3-react";

// Import Components
import ActionBtn from "./ActionBtn";
import ConnectBtn from "./ConnectBtn";
import ERC20Input from "./ERC20Input";
import TimeInterval from "./TimeInterval";
import Orders from "./Orders"
import TokenInputNoAmount from "./TokenInputNoAmount";
import NoOfSwaps from "./NoOfSwaps";
import TimeBetween from "./TimeBetween";
import MinOrders from "./MinOrders"

import OrderContext from "../contexts/OrderContext";


// Style
import { Button, Divider, makeStyles, Card, CardContent } from "@material-ui/core";

const backgroundColor = 'pink'
const style = makeStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      height: '10%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    card: {
      // margin: "25px"
      marginTop: "50px",
      marginBottom: "25px"
    },
    card2: {
      // margin: "25px"
      marginTop: "10px",
      marginBottom: "10px",
      minWidth: '40%',
    },
    card3: {
      // margin: "25px"
      marginTop: "10px",
      marginBottom: "10px",
      width: '25%',
      // height: '10rem'
    },
    box: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    cardContent: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'start',
      alignItems: 'center',
      paddingBottom: '0px !important',
      paddingTop: '0px !important'
    },
    arrow: {
      marginTop: "20px"
    },
    title: {
      textAlign: "left"
    },
    inputs: {
      textAlign: "center",
      // marginTop: '35px',
      marginRight: '10px',
      backgroundColor: 'd3d3d3'
    },
    titles: {
      textAlign: "left",
      marginTop: '15px',
      marginLeft: '25px'
    },
    dividerClass: {
      marginTop: '20px',
      marginBottom: '10px'
    }
  });


function TimeOrderWrapper(props) {

    const context = useWeb3Context()
    const classes = style();
    const selectedTokenDetails = props.selectedTokenDetails
    const updateSelectedTokenDetails = props.updateSelectedTokenDetails
    const ordersContext = useContext(OrderContext);


    // Props
    const proxyStatus = props.proxyStatus
    const updateProxyStatus = props.updateProxyStatus
    const updateActiveCoins = props.updateActiveCoins

    return (
      <React.Fragment>
        <ConnectBtn proxyStatus={proxyStatus} networkId={context.networkId} updateProxyStatus={updateProxyStatus} />
        <h1>Well Timed <span role="image">🐎</span></h1>
        <h3>Time-based order splitting on Kyber</h3>
        <div className={classes.box}>
          <Card className={classes.card2} raised>
          {/* <h4 className={classes.title}>Title</h4> */}
            <p className={classes.titles}>Total Sell Volume</p>
            <CardContent className={classes.cardContent}>


              <ERC20Input selectedTokenDetails={selectedTokenDetails} updateSelectedTokenDetails={updateSelectedTokenDetails} updateActiveCoins={updateActiveCoins}></ERC20Input>
              <p className={classes.inputs}>to</p>
              <TokenInputNoAmount updateActiveCoins={updateActiveCoins} selectedTokenDetails={selectedTokenDetails} updateSelectedTokenDetails={updateSelectedTokenDetails} ></TokenInputNoAmount>

            </CardContent>
          </Card>

          <Card className={classes.card3} raised>
            <p className={classes.titles}>Split into</p>
            <CardContent className={classes.cardContent}>

              <NoOfSwaps updateActiveCoins={updateActiveCoins} ></NoOfSwaps>
              <p className={classes.inputs}>order(s)</p>

            </CardContent>
          </Card>

          <Card className={classes.card3} raised>
            <p className={classes.titles}>Interval between orders</p>
            <CardContent className={classes.cardContent}>

              <TimeBetween updateActiveCoins={updateActiveCoins}></TimeBetween>
              <TimeInterval updateActiveCoins={updateActiveCoins}></TimeInterval>
              {/* <p className={classes.inputs}>day(s)</p> */}

            </CardContent>
          </Card>

        </div>
        <h3>Resulting orders</h3>
        <MinOrders orders2={props.orders2}   ></MinOrders>
        <ActionBtn updateSelectedTokenDetails={updateSelectedTokenDetails} selectedTokenDetails={selectedTokenDetails} updateProxyStatus={updateProxyStatus}></ActionBtn>
        <Divider variant="middle" className={classes.dividerClass}/>
        <h3>Your scheduled orders</h3>
        <Button color={"secondary"} onClick={ordersContext.fetchExecutionClaims}>Fetch past Orders</Button>
        <Orders></Orders>
      </React.Fragment>
    )
}

export default TimeOrderWrapper