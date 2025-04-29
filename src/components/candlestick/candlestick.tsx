import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import './candlestick.scss'
import { buildOptions } from './config'
import { ChartHeader } from '../chart-header/chart-header'
import { AlphaVantageMetaDataType, RequestParams, TradierMetaDataType } from '../../types/types'
import { EChartsOption } from 'echarts'

export interface CandleStickProps {
  messages: unknown[]
  headingData: {
    title: string
    isConnected: boolean
  }
  requestParams: Partial<RequestParams> | null
  requestType: 'historical' | 'real-time',
  socketControls: any
}

export const Candlestick: React.FC<CandleStickProps> = (props: CandleStickProps) => {
  const [metaData, setMetaData] = useState<AlphaVantageMetaDataType | TradierMetaDataType | null>(null)
  const [chartData, setChartData] = useState<any>(null)
  const [options, setOptions] = useState<EChartsOption | null>(null)

  useEffect(() => {
    if (!props.messages || props.messages.length === 0) return

    const latestMessage = props.messages[props.messages.length - 1] as any

    if (!latestMessage?.data) return

    if (props.requestType === 'historical') {
      const metaData = latestMessage.data.metaData as AlphaVantageMetaDataType
      setMetaData(metaData)

      const latestChartData = latestMessage.data.chartData
      setChartData(latestChartData)

      setOptions(buildOptions(latestChartData, metaData))
    } else if (props.requestType === 'real-time') {
      const metaData = latestMessage.data.metaData as TradierMetaDataType
      setMetaData(metaData)

      const latestChartData = (latestMessage.data.chartData as any) || { categoryData: [], values: [], volumes: [] }
      let existingChartData = chartData || { categoryData: [], values: [], volumes: [] }
      existingChartData = {
        categoryData: [...existingChartData.categoryData, latestChartData.categoryData[0]],
        values: [...existingChartData.values, latestChartData.values[0]],
        volumes: [...existingChartData.volumes, latestChartData.volumes[0]],
      }

      setChartData(existingChartData)
      setOptions(buildOptions(existingChartData, metaData))
    }
  }, [props.messages])

  const styles = {
    height: '90%',
  }

  return (
    <div className="candlestick-container">
      <ChartHeader
        metaData={metaData}
        headingData={props.headingData}
        socketControls={props.socketControls}
      />
      {options ? (
        <ReactECharts
          notMerge={true}
          lazyUpdate={false}
          option={options}
          style={styles}
        />
      ) : null}
    </div>
  )
}
