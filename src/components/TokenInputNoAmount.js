import React, { useContext } from "react";
import {
	Input,
	Button,
	DialogTitle,
	Dialog,
	makeStyles,
	MenuItem
} from "@material-ui/core";

import { useWeb3Context } from "web3-react";
import CoinContext from "../contexts/CoinContext";
import { getCorrectImageLink } from "../helpers";

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
		height: "24px"
	},
	coins: {
		display: "flex",
		justifyContent: "space-between"
	}
}));

function TokenInputNoAmount(props) {

	// fetch params
	const inputData = props.inputData
    const tokenType = inputData.tokenType
    const amountType = inputData.amountType
    const amountPlaceholder = inputData.amountPlaceholder
    const disabledAmount = inputData.disabledAmount
	const defaultToken = inputData.defaultToken


    // defaultToken => none if 'Select a Token'
    // const defaultToken = props.defaultToken
    // value for coinContext => e.g. 'triggerFrom' or 'actionTp'
    const selectType = props.selectType

	const classes = useStyles();
	const coinContext = useContext(CoinContext);

	// State

	const [state, setState] = React.useState({
		open: false,
		coin: "",
		amount: 0,
		availableCoins: Object.values(getCorrectImageLink())
	});

	// const handleChange = name => event => {
	//   console.log(name)
	//   console.log(event)
	//   const newState = { ...state };
	//   newState[name] = event.target.value;
	//   setState({ ...state, [name]: event.target.value , open: false});
	//   coinContext.triggerFrom = event.target.value;
	//   // handleClose()
	// };

	const handleChange = coin => {
		console.log(coin);
		const newState = { ...state };
		newState["coin"] = coin;
		setState({ ...state, ["coin"]: coin, open: false });
		coinContext[tokenType] = coin;
		// handleClose()
	};

	const handleClickOpen = async () => {
		console.log("open");
		setState({ ...state, open: true });
	};

	const handleClose = () => {
		setState({ ...state, open: false });
	};

	const userChoice = () => {
		if (state.coin) {
			return (
				<span className={classes.coins}>
					{state.coin.name}
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
					{"Kyber Network"}
					<img
					src={
						"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdd974d5c2e2928dea5f71b9825b8b646686bd200/logo.png"
					}
					alt="coin logo"
					className={classes.img}
					/>
				  </span>
				  )

		}
	};

	const handleAmount = name => event => {
		setState({ ...state, [name]: event.target.value || "" });
		coinContext[amountType] = event.target.value;
	};

	return (
		<div className={classes.container}>
			<Button
				color={state.coin ? "primary" : "secondary"}
				onClick={handleClickOpen}
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
								console.log(coin);
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
