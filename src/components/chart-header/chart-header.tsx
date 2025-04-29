import React, { useEffect, useContext } from 'react'
import './chart-header.scss'
import { AlphaVantageMetaDataType, TradierMetaDataType } from '../../types/types'
import { MainContext } from '../../_context/MainContext'
import DisplayService from '../../services/display.service'

interface ChartHeaderProps {
  headingData: {
    title: string
    isConnected: boolean
    connectionType: string
  }
  metaData: AlphaVantageMetaDataType | TradierMetaDataType | null
  socketControls: any
}

export const ChartHeader: React.FC<ChartHeaderProps> = props => {
  const {
    mainState: { realTimeConnectionStatus, historicalConnectionStatus },
  } = useContext(MainContext)

  console.log(props.headingData.connectionType)

  const handleConnectionStatus = () => {
    if (props.headingData?.isConnected) {
      props.socketControls.disconnect()
    } else if (!props.headingData.isConnected) {
      props.socketControls.connect()
    }
    // if (props.headingData.connectionType === 'historical') {
    //   DisplayService.handleConnectionStatus(props.headingData.connectionType, {connected: !historicalConnectionStatus.isConnected})
    // } else if (props.headingData.connectionType === 'realTime') {
    //   DisplayService.handleConnectionStatus(props.headingData.connectionType, {connected: !realTimeConnectionStatus.isConnected})
    // }
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
            props.headingData?.connectionType === 'historical'
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
