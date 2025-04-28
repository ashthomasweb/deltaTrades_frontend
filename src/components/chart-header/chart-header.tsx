import React from 'react'
import './chart-header.scss'
import { AlphaVantageMetaDataType, TradierMetaDataType } from '../../types/types'

interface ChartHeaderProps {
  headingData: {
    title: string
    isConnected: boolean
  }
  metaData: AlphaVantageMetaDataType | TradierMetaDataType | null
  handleConnect: () => void
}

export const ChartHeader: React.FC<ChartHeaderProps> = props => {
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
            onClick={props.handleConnect}
          >{`${props.headingData?.isConnected ? 'Disconnect' : 'Connect'}`}</button>
        </h3>
      </header>
      <span>Symbol: {props.metaData?.tickerSymbol}</span>
      <span>Interval: {props.metaData?.interval}</span>
    </div>
  )
}
