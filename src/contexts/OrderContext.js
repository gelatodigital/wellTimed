import React from 'react'

const OrderContext = React.createContext({
    if: "",
    swap: "",
    created: "",
    status: "",
    action: true

})

export const OrderProvider = OrderContext.Provider
export const OrderConsumer = OrderContext.Consumer
export default OrderContext