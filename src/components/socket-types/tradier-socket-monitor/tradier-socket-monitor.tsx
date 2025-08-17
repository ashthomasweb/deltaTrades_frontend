import { useEffect, useState } from 'react'
import { useWebSocket } from '@hooks/useWebSocket'
import { Candlestick } from '@components/candlestick/candlestick.component.tsx'
import { RequestControls } from '@components/request/request-controls/request-controls'
import { ChartHeadingData, RequestParams } from '@dt-types'
import './tradier-socket-monitor.scss'

export const TradierSocketMonitor = () => {
  const [requestParams, setRequestParams] = useState<Partial<RequestParams>>({
    requestType: undefined,
    symbol: undefined,
    backfill: undefined,
    sendToQueue: undefined,
    algorithm: undefined,
    enableTrading: undefined,
  })

  const [chartId, setChartId] = useState<string | null>(null)

  useEffect(() => {
    setChartId(Math.ceil(Math.random() * 10e20).toString())
  }, [])

  const { isConnected, messages, socketControls } = useWebSocket('ws://localhost:8080', requestParams, 'realTime')

  const headingData: ChartHeadingData = {
    title: 'Real-Time Data',
    connectionType: 'realTime',
    isConnected,
    chartId,
  }

  // TODO: Analyze and clean up 'getPrevious' logic and 'backfill' length
  const setParams = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const params: Partial<RequestParams> = {
      dataSource: 'tradier',
      chartId,
    }

    for (const [key, value] of formData.entries()) {
      if (key.includes('primaryParam_')) {
        params[key.replace('primaryParam_', '') as keyof RequestParams] = value?.toString() ?? null
      }
      if (key.includes('algoParam_')) {
        params.algoParams[key.replace('algoParam_', '') as keyof RequestParams] = value?.toString() ?? null
      }
    }
    setRequestParams(params)
  }

  return (
    <form onSubmit={setParams}>
      <div className="historical-container">
        <RequestControls requestType="realTime" />
        <Candlestick
          messages={messages}
          headingData={headingData}
          requestParams={requestParams}
          requestType="realTime"
          socketControls={socketControls}
        />
      </div>
    </form>
  )
}
