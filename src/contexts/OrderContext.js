import React from 'react'

// const OrderContext = React.createContext([{
//     ifThis: "10000 WETH >= 2000 DAI", thenSwap: "200 KNC => 2000 DAI", created: "10/20/19 - 19:02:43", status: "open", action: "cancel"

// }])


const OrderContext = React.createContext([{
    swap: "10000 WETH >= 2000 DAI", when: "200 KNC => 2000 DAI", status: "10/20/19 - 19:02:43"
}])

export const OrderProvider = OrderContext.Provider
export const OrderConsumer = OrderContext.Consumer
export default OrderContext