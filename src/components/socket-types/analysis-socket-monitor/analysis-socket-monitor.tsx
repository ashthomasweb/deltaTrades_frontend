import React, { useState } from 'react'
import { useWebSocket } from '@hooks/useWebSocket'
import { Candlestick } from '@components/candlestick/candlestick.component.tsx'
import { RequestControls } from '@components/request/request-controls/request-controls'
import { RequestParams } from '@dt-types'
import { AlgoParams } from '@components/request/algo-params/algo-params.tsx'
import './analysis-socket-monitor.scss'

export const AnalysisSocketMonitor: React.FC = () => {
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

  const { isConnected, messages, socketControls } = useWebSocket('ws://localhost:8080', requestParams, 'analysis')

  const headingData = {
    title: 'Analysis',
    connectionType: 'analysis',
    isConnected,
  }

  const setParams = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const params: Partial<RequestParams> = {
      dataSource: 'storedData',
      algoParams: {},
    }

    for (const [key, value] of formData.entries()) {
      if (key.includes('primaryParam_')) {
        params[key.replace('primaryParam_', '') as keyof RequestParams] = value?.toString() ?? null
      }
      if (key.includes('algoParam_')) {
        params.algoParams[key.replace('algoParam_', '') as keyof RequestParams] = value?.toString() ?? null
      }
    }
    console.log(params)

    setRequestParams(params)
  }

  return (
    <form onSubmit={setParams}>
      <div className="analysis-container">
        <RequestControls requestType="analysis" />
        <div className="upper-container">
          <Candlestick
            messages={messages}
            headingData={headingData}
            requestParams={requestParams}
            requestType="analysis"
            socketControls={socketControls}
          />
          <AlgoParams />
        </div>
      </div>
    </form>
  )
}
