import React, { useState, useEffect } from 'react'
import { useWebSocket } from '../../hooks/useWebSocket'
import { Candlestick } from '../candlestick/candlestick'
import './alpha-socket-monitor.scss'
import { RequestControls } from '../request-controls/request-controls'
import { RequestParams } from '../../types/types'

export const AlphaSocketMonitor: React.FC = () => {
  const [requestParams, setRequestParams] = useState<Partial<RequestParams> | null>({
    type: null,
    storeData: null,
    symbol: null,
    interval: null,
    month: null,
    savedData: null,
    dataSize: null,
    sendToQueue: null,
  })
  // const [connectionControl, setConnectionControl] = useState<boolean>(false)
  const { isConnected, messages, socketControls } = useWebSocket('ws://localhost:8080', requestParams, 'historical')

  const headingData = {
    title: 'Historical Data',
    connectionType: 'historical',
    isConnected,
  }

  const setParams = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formValues = Object.fromEntries(formData.entries())
    console.log(formValues)
    const params: Partial<RequestParams> = {
      type: formValues.type?.toString() ?? null,
      dataSource: 'alpha-vantage',
      storeData: formValues.storeData?.toString() ?? null,
      symbol: formValues.symbol?.toString() ?? null,
      interval: formValues.interval?.toString() ?? null,
      month: formValues.month?.toString() ?? null,
      savedData: formValues.savedData?.toString() ?? null,
      dataSize: formValues.dataSize?.toString() ?? null,
      sendToQueue: formValues.sendToQueue?.toString() ?? null,
    }
    setRequestParams(params)
  }

  // const handleConnection = (e: React.MouseEvent<HTMLButtonElement>, input?: boolean) => {
  //   connectionControl()

  //   // if (forceInput !== undefined) {
  //   //   setConnectionControl(forceInput)
  //   //   return
  //   // }
  //   // if (connectionControl === true && window.confirm('Are you sure you want to DISCONNECT?')) {
  //   //   setConnectionControl(false)
  //   // } else {
  //   //   setConnectionControl(true)
  //   // }
  // }

  return (
    <div className="historical-container">
      <Candlestick
        messages={messages}
        headingData={headingData}
        requestParams={requestParams}
        requestType="historical"
        socketControls={socketControls}
      />
      <RequestControls
        setParams={setParams}
        requestType="historical"
      />
    </div>
  )
}
