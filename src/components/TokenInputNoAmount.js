import React, { useContext } from "react";
import {
	Button,
	DialogTitle,
	Dialog,
	makeStyles,
	MenuItem
} from "@material-ui/core";

import { ethers } from "ethers";

// Contexts
import CoinContext from "../contexts/CoinContext";
import TimeContext from "../contexts/TimeContext";
import { useWeb3Context } from "web3-react";

// Helpers
import { getCorrectImageLink, updateEstimatedOrders } from "../helpers";



const useStyles = makeStyles(theme => ({
	container: {
		display: "flex",
		justifyContent: "center",
		paddingRight: '10px',
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},

	coins: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: 'center',
		// paddingTop: '6px',
		// backgroundColor: 'pink',

	},
	buttonPadding: {
		// marginTop: '1.5px',
		minWidth: '32px',
		height: '35px',
		backgroundColor: 'rgb(220,220,220, 0.3)',
		// paddingTop: '15px'
	},
	img: {
		width: "24px",
		height: "24px",
		marginLeft: '3px'
	},
}));

function TokenInputNoAmount(props) {

	const context = useWeb3Context()
	const classes = useStyles();
	const coinContext = useContext(CoinContext);
	const timeContext = useContext(TimeContext)
	const time = timeContext.time

	// Props
	const updateActiveCoins = props.updateActiveCoins

	const [state, setState] = React.useState({
		open: false,
		availableCoins: Object.values(getCorrectImageLink(context.networkId))
	});

	const handleChange = coin => {
		setState({ ...state, open: false });
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
		if (coinContext.actionTo) {
			return (
				<span className={classes.coins}>
					{coinContext.actionTo.symbol}
					<img
						src={coinContext.actionTo.logo(ethers.utils.getAddress(coinContext.actionTo.mainnet))}
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

	return (
		<div className={classes.container}>
			<Button

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
				value={coinContext.actionTo}

			>
				<DialogTitle>Choose Token to buy</DialogTitle>

				{state.availableCoins.map((coin, key) => {
					return (
						<div key={key} >
							<div key={key} style={{marginTop: '4px', marginBottom: '4px', borderBottom: '1px solid rgb(220,220,220, 1)'}}></div>
							<MenuItem

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
						</div>
					);
				})}
			</Dialog>
		</div>
	);
}

export default TokenInputNoAmount;
