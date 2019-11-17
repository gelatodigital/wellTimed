export const multiMintKyberTrade = {
    address: {
        3: '0xcD816f760BBd8d63740a82cff56c04288667D921',
        4: '0xa9370d2c5f24866448b129a0Ff81aF99689CD23a'
    },
    dataTypesWithName: [
        {type: 'address', name: '_timeTrigger'},
        {type: 'uint256', name: '_startTime'},
        {type: 'address', name: '_action'},
        {type: 'bytes', name: '_actionPayload'},
        {type: 'address', name: '_selectedExecutor'},
        {type: 'uint256', name: '_intervalSpan'},
        {type: 'uint256', name: '_numberOfMints'}
    ],
    funcSelector: "multiMint"
}