import { useState } from 'react'
import { useWebSocket } from '../../hooks/useWebSocket'
import './tradier-socket-monitor.scss'
import { Candlestick } from '../candlestick/candlestick'
import { RequestControls } from '../request-controls/request-controls'
import { RequestParams } from '../../types/types'

export const TradierSocketMonitor = () => {
  const [requestParams, setRequestParams] = useState<Partial<RequestParams> | null>({
    symbol: null,
    beginDate: null,
    endDate: null,
    interval: null,
    savedData: null,
    isCompact: null,
  })

  const { isConnected, messages } = useWebSocket('ws://localhost:8080', requestParams)

  const headingData = {
    title: 'Real-Time Data',
    isConnected,
  }

  const setParams = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formValues = Object.fromEntries(formData.entries())
    const params: Partial<RequestParams> = {
      type: formValues.type?.toString() ?? null,
      symbol: formValues.symbol?.toString() ?? null,
      beginDate: formValues.beginDate?.toString() ?? null,
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
        requestType="real-time"
      />
      <RequestControls
        setParams={setParams}
        requestType="real-time"
      />
    </div>
  )
}
