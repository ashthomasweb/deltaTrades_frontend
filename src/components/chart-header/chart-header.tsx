import React, { useContext } from 'react'
import { AlphaVantageResponseMetaData, ChartHeadingData, SocketControls, TradierResponseMetaData } from '@dt-types'
import { MainContext } from '@context/MainContext'
import './chart-header.scss'

interface ChartHeaderProps {
  headingData: ChartHeadingData
  metaData: AlphaVantageResponseMetaData | TradierResponseMetaData | null
  socketControls: SocketControls
  requestType: string
  clearChart: () => void
}

export const ChartHeader: React.FC<ChartHeaderProps> = props => {
  const {
    mainState: { realTimeConnectionStatus, historicalConnectionStatus },
  } = useContext(MainContext)

  const handleConnectionStatus = () => {
    if (props.headingData?.isConnected) {
      props.socketControls.disconnect()
    } else if (!props.headingData.isConnected) {
      props.socketControls.connect()
    }
  }

  return (
    <div className="meta-data">
      <header>
        <h2>
          {props.headingData?.title}{' '}
          <span style={{ fontSize: 12, opacity: '0.6' }}>ChartId: {props.headingData?.chartId}</span>
        </h2>
        <h3 className={`status ${props.headingData.isConnected ? 'connected' : ''}`}>
          <span>Status: </span>
          <span>{props.headingData?.isConnected ? '🟢 Connected' : '🔴 Disconnected'}</span>
          <br />
          <button
            type="button"
            onClick={handleConnectionStatus}
          >{`${
            props?.requestType === 'historical'
              ? historicalConnectionStatus?.isConnected
                ? 'Disconnect'
                : 'Connect'
              : realTimeConnectionStatus?.isConnected
                ? 'Disconnect'
                : 'Connect'
          }`}</button>
          <button
            type="button"
            onClick={props.clearChart}
          >
            Clear Chart
          </button>
        </h3>
      </header>
      <span>Symbol: {props.metaData?.tickerSymbol}</span>
      <span>Interval: {props.metaData?.interval}</span>
    </div>
  )
}
