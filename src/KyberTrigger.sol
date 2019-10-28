pragma solidity ^0.5.10;

contract GelatoTriggersStandard {
    bytes4 internal triggerSelector;


    // Split Sell Mint func

    // function splitSellMint(address _timeTrigger, address _kyberSwapAction, bytes calldata _actionPayload, address _excecutor, uint256 _startingTime, uint256 _intervalTime, uint256 _noOfOrders, uint256 _prepayment)
    //     external
    // {
    //     uint256 prepaymentAmount = gelatoCore.getMintingDepositPayable(_kyberSwapAction, _excecutor);
    //     require(msg.value == prepaymentAmount.mul(_noOfOrders));

    //     for (uint256 counter; counter < _noOfOrders; counter ++)
    //     {
    //         _startingTime = _startingTime.add(_intervalTime.mul(counter));
    //         bytes memory triggerPayload = abi.encodePacked(_startingTime);
    //         gelatoCore.mintExecutionClaim(_timeTrigger, triggerPayload, _kyberSwapAction, _actionPayload, _excecutor).value(prepaymentAmount);

    //     }


    // }

    // Split sell mint func end

    function getTriggerSelector()
        external
        view
        returns(bytes4)
    {
        return triggerSelector;
    }

    constructor(string memory _triggerSignature)
        internal
    {
        triggerSelector = bytes4(keccak256(bytes(_triggerSignature)));
    }
}

contract KyberInterface {
    function trade(
        address src,
        uint srcAmount,
        address dest,
        address destAddress,
        uint maxDestAmount,
        uint minConversionRate,
        address walletId
        ) public payable returns (uint);

    function getExpectedRate(
        address src,
        address dest,
        uint srcQty
        ) public view returns (uint, uint);
}


contract KyberTrigger is GelatoTriggersStandard {

    constructor()
        public
        GelatoTriggersStandard("fired(address,address,uint256,bool,uint256)")
    {

    }

    function fired(address _sellToken, address _buyToken, uint256 _sellAmount, bool isGreater, uint256 _buyAmount)
        external
        view
        returns(bool)
    {
        (, uint256 receivable) = firedView(_sellToken, _buyToken, _sellAmount);
        if (isGreater)
        {
            if (receivable >= _buyAmount)
            {
                return true;
            } else
            {
                return false;
            }

        } else if (!isGreater)
        {
            if (receivable >= _buyAmount)
            {
                return false;
            } else
            {
                return true;
            }
        }

    }


    function firedView(
        address src,
        address dest,
        uint srcAmt
    ) public view returns (
        uint expectedRate,
        uint slippageRate
    )
    {
        (expectedRate,) = KyberInterface(0x818E6FECD516Ecc3849DAf6845e3EC868087B755).getExpectedRate(src, dest, srcAmt);
        slippageRate = (expectedRate / 100) * 99; // slippage rate upto 99%
    }

}