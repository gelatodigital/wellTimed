export const multiMintKyberTrade = {
    address: '0xD10b3f4b06439b2b8B2D9788b6A5278d6055B19B',
    dataTypesWithName: [
        {type: 'address', name: '_timeTrigger'},
        {type: 'uint256', name: '_startTime'},
        {type: 'address', name: '_action'},
        {type: 'bytes', name: '_specificActionParams'},
        {type: 'address', name: '_selectedExecutor'},
        {type: 'uint256', name: '_intervalSpan'},
        {type: 'uint256', name: '_numberOfMints'}
    ],
    funcSelector: "multiMint"
}