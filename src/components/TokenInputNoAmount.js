import React, { useContext } from "react";
import {
	Button,
	DialogTitle,
	Dialog,
	makeStyles,
	MenuItem
} from "@material-ui/core";

import { ethers } from "ethers";
import CoinContext from "../contexts/CoinContext";
import TimeContext from "../contexts/TimeContext";
import { getCorrectImageLink, updateEstimatedOrders } from "../helpers";

const useStyles = makeStyles(theme => ({
	container: {
		display: "flex",
		justifyContent: "center"
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
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

function TokenInputNoAmount(props) {

    // defaultToken => none if 'Select a Token'
    // const defaultToken = props.defaultToken
    // value for coinContext => e.g. 'triggerFrom' or 'actionTp'

	const classes = useStyles();
	const coinContext = useContext(CoinContext);
	const timeContext = useContext(TimeContext)
	const time = timeContext.time

	// Props
	const updateActiveCoins = props.updateActiveCoins

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
		const coinContextCopy = {...coinContext}
		coinContextCopy['actionTo'] = coin;
		// Call helper function to updated estimated orders
		const updatedCoinContext = updateEstimatedOrders(coinContextCopy, time)
		updateActiveCoins(updatedCoinContext)
		// handleClose()
	};

	const handleClickOpen = async () => {
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
			return (
					<span className={classes.coins}>
					{"KNC"}
					<img
					src={
						"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdd974D5C2e2928deA5F71b9825b8b646686BD200/logo.png"
					}
					alt="coin logo"
					className={classes.img}
					/>
				  </span>
				  )

		}
	};

	// const handleAmount = name => event => {
	// 	setState({ ...state, [name]: event.target.value || "" });
	// 	coinContext[amountType] = event.target.value;
	// };

	return (
		<div className={classes.container}>
			<Button
				// color={state.coin ? "primary" : "secondary"}
				onClick={handleClickOpen}
				className={classes.buttonPadding}
			>
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
				{state.availableCoins.map(coin => {
					return (
						<MenuItem
							// onChange={handleChange("coin")}
							// onClick={handleClose}
							onClick={() => {
								handleChange(coin);
							}}
							key={coin.id}
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

export default TokenInputNoAmount;
