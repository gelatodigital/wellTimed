pragma solidity ^0.5.10;

contract GelatoTriggersStandard {
    bytes4 internal triggerSelector;

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