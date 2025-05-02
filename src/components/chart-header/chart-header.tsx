import React, { useContext } from 'react'
import './chart-header.scss'
import { AlphaVantageMetaDataType, TradierMetaDataType } from '../../types/types'
import { MainContext } from '../../_context/MainContext'

interface ChartHeaderProps {
  headingData: {
    title: string
    isConnected: boolean
  }
  metaData: AlphaVantageMetaDataType | TradierMetaDataType | null
  socketControls: any
  requestType: string
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
        <h2>{props.headingData?.title}</h2>
        <h3 className={`status ${props.headingData.isConnected ? 'connected' : ''}`}>
          <span>Status: </span>
          <span>{props.headingData?.isConnected ? '🟢 Connected' : '🔴 Disconnected'}</span>
          <br />
          <button
            type="button"
            onClick={handleConnectionStatus}
          >{`${
            props?.requestType === 'historical'
              ? historicalConnectionStatus.isConnected
                ? 'Disconnect'
                : 'Connect'
              : realTimeConnectionStatus.isConnected
                ? 'Disconnect'
                : 'Connect'
          }`}</button>
        </h3>
      </header>
      <span>Symbol: {props.metaData?.tickerSymbol}</span>
      <span>Interval: {props.metaData?.interval}</span>
    </div>
  )
}
