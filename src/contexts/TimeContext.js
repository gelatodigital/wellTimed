import React from 'react'

const TimeContext = React.createContext(0)

export const TimeProvider = TimeContext.Provider
export const TimeConsumer = TimeContext.Consumer
export default TimeContext