import React from 'react'

const CoinContext = React.createContext({
    triggerFrom: "",
    triggerTo: "",
    actionFrom: "",
    actionTo: "",
    bigger: true,
    amountTriggerFrom: 0,
    amountTriggerTo: 0,
    amountActionTo: 0,
    amountActionFrom: 0
})

export const CoinProvider = CoinContext.Provider
export const CoinConsumer = CoinContext.Consumer
export default CoinContext