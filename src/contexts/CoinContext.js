import React from 'react'

const CoinContext = React.createContext({
    lockFrom: '',
    lockTo: '',
    ERC20: '',
    swapTo: '',
    bigger: true,
    amountLockFrom: 0,
    amountLockTo: 0,
    amountSwapTo: 0
})

export const CoinProvider = CoinContext.Provider
export const CoinConsumer = CoinContext.Consumer
export default CoinContext