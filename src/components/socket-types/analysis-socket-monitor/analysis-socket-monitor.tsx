import React, { useState } from 'react'
import { useWebSocket } from '../../../hooks/useWebSocket'
import { Candlestick } from '../../candlestick/candlestick.component.tsx'
import './analysis-socket-monitor.scss'
import { RequestControls } from '../../request/request-controls/request-controls'
import { RequestParams } from '../../../types/types'
import { AlgoParams } from '../../request/algo-params/algo-params.tsx'

export const AnalysisSocketMonitor: React.FC = () => {
  const [requestParams, setRequestParams] = useState<Partial<RequestParams>>({
    type: undefined,
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
    const formValues = Object.fromEntries(formData.entries())

    const params: Partial<RequestParams> = {
      type: formValues.type.toString(),
      dataSource: 'storedData',
      storeData: formValues.storeData?.toString() ?? null,
      symbol: formValues.symbol?.toString() ?? null,
      interval: formValues.interval?.toString() ?? null,
      month: formValues.month?.toString() ?? null,
      savedData: formValues.savedData?.toString() ?? null,
      dataSize: formValues.dataSize?.toString() ?? null,
      sendToQueue: formValues.sendToQueue?.toString() ?? null,
      algoParams: {
        algorithm: formValues.algorithm?.toString() ?? null,
        altThreshold: formValues.altThreshold?.toString() ?? null,
        atrMultiplier: formValues.atrMultiplier?.toString() ?? null,
        avgPeriod: formValues.avgPeriod?.toString() ?? null,
        enableTrading: formValues.enableTrading?.toString() ?? null,
        hugRatio: formValues.hugRatio?.toString() ?? null,
        maAvgType: formValues.maAvgType?.toString() ?? null,
        minCandleBodyDist: formValues.minCandleBodyDist?.toString() ?? null,
        noiseWindow: formValues.noiseWindow?.toString() ?? null,
        noiseWindowLength: formValues.noiseWindowLength?.toString() ?? null,
        oppThreshold: formValues.oppThreshold?.toString() ?? null,
        singleDirMin: formValues.singleDirMin?.toString() ?? null,
      },
    }
    setRequestParams(params)
  }

  return (
    <form onSubmit={setParams}>
      <div className="analysis-container">
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
        <RequestControls requestType="analysis" />
      </div>
    </form>
  )
}
