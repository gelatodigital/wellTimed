import React from 'react'

const CoinContext = React.createContext({
    triggerFrom: "0x4e470dc7321e84ca96fcaedd0c8abcebbaeb68c6",
    triggerTo: "",
    actionFrom: "0xb4f7332ed719eb4839f091eddb2a3ba309739521",
    actionTo: "",
    bigger: true,
    amountTriggerFrom: 100,
    amountTriggerTo: 0,
    amountActionTo: 0,
    amountActionFrom: 0
})

export const CoinProvider = CoinContext.Provider
export const CoinConsumer = CoinContext.Consumer
export default CoinContext