import React from 'react'
import './chart-header.scss'
import { ChartHeaderType } from '../../types/types'

export const ChartHeader: React.FC<ChartHeaderType> = props => {
  return (
    <div className="meta-data">
      <header>
        <h2>{props.headingData?.title}</h2>
        <h3 className={`status ${props.headingData.isConnected ? 'connected' : ''}`}>
          <span>Status: </span>
          <span>{props.headingData?.isConnected ? '🟢 Connected' : '🔴 Disconnected'}</span>
        </h3>
      </header>
      <span>Symbol: {props.metaData?.['2. Symbol']}</span>
      <span>Interval: {props.metaData?.['4. Interval']}</span>
    </div>
  )
}
