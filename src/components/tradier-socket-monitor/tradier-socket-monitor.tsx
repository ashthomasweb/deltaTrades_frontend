import { useEffect, useState } from 'react'
import { useWebSocket } from '../../hooks/useWebSocket'
import './tradier-socket-monitor.scss'
import { Candlestick } from '../candlestick/candlestick'
import { RequestControls } from '../request-controls/request-controls'
import { RequestParams } from '../../types/types'

export const TradierSocketMonitor = () => {
  const [requestParams, setRequestParams] = useState<Partial<RequestParams> | null>({
    type: null,
    storeData: null,
    symbol: null,
    backfill: null,
    sendToQueue: null,
    algorithm: null,
    enableTrading: null,
  })

  // const [connectionControl, setConnectionControl] = useState<boolean>(false)

  const { isConnected, messages, socketControls } = useWebSocket('ws://localhost:8080', requestParams, 'realTime')

  const headingData = {
    title: 'Real-Time Data',
    connectionType: 'realTime',
    isConnected,
  }

  const setParams = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formValues = Object.fromEntries(formData.entries())
    console.log(formValues)
    const params: Partial<RequestParams> = {
      type: formValues.type?.toString() ?? null,
      dataSource: 'tradier',
      storeData: formValues.storeData?.toString() ?? null,
      symbol: formValues.symbol?.toString() ?? null,
      backfill: formValues.backfill?.toString() ?? null,
      sendToQueue: formValues.sendToQueue?.toString() ?? null,
      algorithm: formValues.algorithm?.toString() ?? null,
      enableTrading: formValues.enableTrading?.toString() ?? null,
      getPrevious: formValues.getPrevious?.toString() ?? null,
      beginDate: formValues.beginDate?.toString() ?? null,
    }
    setRequestParams(params)
  }

  // const handleConnection = () => {
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

  // useEffect(() => {
  //   setConnectionControl(isConnected)
  // }, [isConnected])

  return (
    <div className="historical-container">
      <Candlestick
        messages={messages}
        headingData={headingData}
        requestParams={requestParams}
        requestType="real-time"
        socketControls={socketControls}
      />
      <RequestControls
        setParams={setParams}
        requestType="real-time"
      />
    </div>
  )
}
