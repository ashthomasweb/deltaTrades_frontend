import React, { useState } from 'react'
import { useWebSocket } from '../../../hooks/useWebSocket'
import { Candlestick } from '../../candlestick/candlestick.component.tsx'
import './alpha-socket-monitor.scss'
import { RequestControls } from '../../request/request-controls/request-controls'
import { RequestParams } from '../../../types/types'

export const AlphaSocketMonitor: React.FC = () => {
  const [requestParams, setRequestParams] = useState<Partial<RequestParams>>({
    requestType: undefined,
    storeData: undefined,
    symbol: undefined,
    interval: undefined,
    month: undefined,
    savedData: undefined,
    dataSize: undefined,
    sendToQueue: undefined,
  })

  const { isConnected, messages, socketControls } = useWebSocket('ws://localhost:8080', requestParams, 'historical')

  const headingData = {
    title: 'Historical Data',
    connectionType: 'historical',
    isConnected,
  }

  const setParams = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const params: Partial<RequestParams> = {}

    for (const [key, value] of formData.entries()) {
      if (key.includes('primaryParam_')) {
        params[key.replace('primaryParam_', '') as keyof RequestParams] = value?.toString() ?? null
      }
      if (key.includes('algoParam_')) {
        params.algoParams[key.replace('algoParam_', '') as keyof RequestParams] = value?.toString() ?? null
      }
    }

    params.dataSource = 'alpha-vantage'
    if (params.savedData !== 'none') {
      params.requestType = 'storedData' // TODO: Check on need for this duplicated k:v - interacts in backend /data-adapter
      params.dataSource = 'storedData' // TODO: Check on need for this duplicated k:v - interacts in backend /data-adapter
    }
    setRequestParams(params)
  }

  return (
    <form onSubmit={setParams}>
      <div className="historical-container">
        <Candlestick
          messages={messages}
          headingData={headingData}
          requestParams={requestParams}
          requestType="historical"
          socketControls={socketControls}
        />
        <RequestControls requestType="historical" />
      </div>
    </form>
  )
}
