// Not used
import React, { useContext } from "react";
import {
	Input,
	Button,
	DialogTitle,
	Dialog,
	makeStyles,
	MenuItem
} from "@material-ui/core";

// Contexts
import CoinContext from "../contexts/CoinContext";

// Helpers
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

function TokenInput(props) {

	// fetch params
	const inputData = props.inputData
    const tokenType = inputData.tokenType
    const amountType = inputData.amountType
    const amountPlaceholder = inputData.amountPlaceholder
    const disabledAmount = inputData.disabledAmount
	const defaultToken = inputData.defaultToken
	const classes = useStyles();
	const coinContext = useContext(CoinContext);

	// State

	const [state, setState] = React.useState({
		open: false,
		coin: "",
		amount: 0,
		availableCoins: Object.values(getCorrectImageLink(context.networkId))
	});

	const handleChange = coin => {
		const newState = { ...state };
		newState["coin"] = coin;
		setState({ ...state, ["coin"]: coin, open: false });
		coinContext[tokenType] = coin;
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
				defaultToken
			);
		}
	};

	const handleAmount = name => event => {
		setState({ ...state, [name]: event.target.value || "" });
		coinContext[amountType] = event.target.value;
	};

	return (
		<div className={classes.container}>
			{ disabledAmount &&
				<Input
					onChange={handleAmount("amount")}
					type="number"
					autoComplete="off"
					placeholder={amountPlaceholder}
					disabled
				/>
			}
			{ !disabledAmount &&
				<Input
					onChange={handleAmount("amount")}
					type="number"
					autoComplete="off"
					placeholder={amountPlaceholder}
				/>
			}
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

export default TokenInput;
