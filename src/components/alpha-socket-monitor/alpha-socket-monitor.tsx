import React, { useState } from 'react'
import { useWebSocket } from '../../hooks/useWebSocket'
import Candlestick from '../candlestick/candlestick'
import './alpha-socket-monitor.scss'
import { RequestControls } from '../request-controls/request-controls'

export interface RequestParams {
  symbol: string | null | FormDataEntryValue
  beginDate: string | null | FormDataEntryValue
  endDate: string | null | FormDataEntryValue
  interval: string | null | FormDataEntryValue
}

export const AlphaSocketMonitor: React.FC = () => {
  const [requestParams, setRequestParams] = useState<RequestParams | null>({symbol: null, beginDate: null, endDate: null, interval: null})
  const { isConnected, messages } = useWebSocket('ws://localhost:8080', requestParams)

  const headingData = {
    title: 'Historical Data',
    isConnected
  }

  const setParams = (e: any, input: RequestParams) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formValues = Object.fromEntries(formData.entries())
    const params: RequestParams = {
      symbol: formValues.symbol,
      beginDate: formValues.beginDate,
      endDate: formValues.endDate,
      interval: formValues.interval
    }
    setRequestParams(params)

    // e.stopPropagation()
    // setRequestParams(input)
  }

  return (
    <div className="historical-container">
      {/* <h1>Historical Data</h1> */}
        <Candlestick messages={messages} headingData={headingData} requestParams={requestParams} />
        <RequestControls setParams={setParams} />
    </div>
  )
}
