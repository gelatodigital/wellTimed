import React from 'react'

const ProxyContext = React.createContext()

export const ProxyProvider = ProxyContext.Provider
export const ProxyConsumer = ProxyContext.Consumer
export default ProxyContext