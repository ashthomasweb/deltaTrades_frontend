import React, { useState } from 'react'
import { useWebSocket } from '../../hooks/useWebSocket'
import { Candlestick } from '../candlestick/candlestick'
import './alpha-socket-monitor.scss'
import { RequestControls } from '../request-controls/request-controls'
import { RequestParams } from '../../types/types'

export const AlphaSocketMonitor: React.FC = () => {
  const [requestParams, setRequestParams] = useState<RequestParams | null>({
    symbol: null,
    // beginDate: null,
    endDate: null,
    interval: null,
    savedData: null,
    isCompact: null,
  })
  const { isConnected, messages } = useWebSocket(
    'ws://localhost:8080',
    requestParams,
  )

  const headingData = {
    title: 'Historical Data',
    isConnected,
  }

  const setParams = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formValues = Object.fromEntries(formData.entries())
    const params: RequestParams = {
      symbol: formValues.symbol?.toString() ?? null,
      // beginDate: formValues.beginDate?.toString() ?? null,
      endDate: formValues.endDate?.toString() ?? null,
      interval: formValues.interval?.toString() ?? null,
      savedData: formValues.savedData?.toString() ?? null,
      isCompact: formValues.isCompact === 'on',
    }
    setRequestParams(params)
  }

  return (
    <div className="historical-container">
      <Candlestick
        messages={messages}
        headingData={headingData}
        requestParams={requestParams}
      />
      <RequestControls setParams={setParams} requestType="historical" />
    </div>
  )
}
