import React, { useState } from 'react'
import { useWebSocket } from '@hooks/useWebSocket'
import { Candlestick } from '@components/candlestick/candlestick.component.tsx'
import { RequestControls } from '@components/request/request-controls/request-controls'
import { RequestParams } from '@dt-types'
import './alpha-socket-monitor.scss'

export const AlphaSocketMonitor: React.FC = () => {
  const [requestParams, setRequestParams] = useState<Partial<RequestParams>>({
    requestType: undefined,
    symbol: undefined,
    interval: undefined,
    month: undefined,
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
    setRequestParams(params)
  }

  return (
    <form onSubmit={setParams}>
      <div className="historical-container">
        <RequestControls requestType="historical" />
        <Candlestick
          messages={messages}
          headingData={headingData}
          requestParams={requestParams}
          requestType="historical"
          socketControls={socketControls}
        />
      </div>
    </form>
  )
}
