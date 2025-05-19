import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import './candlestick.scss'
import { buildOptions } from './config'
import { ChartHeader } from '../chart-header/chart-header'
import { AlphaVantageMetaDataType, ChartHeadingData, RequestParams, TradierMetaDataType } from '../../types/types'
import { EChartsOption } from 'echarts'

export interface CandleStickProps {
  messages: unknown[]
  headingData: ChartHeadingData
  requestParams: Partial<RequestParams> | null
  requestType: 'historical' | 'real-time'
  socketControls: any
}

export const Candlestick: React.FC<CandleStickProps> = (props: CandleStickProps) => {
  const [metaData, setMetaData] = useState<AlphaVantageMetaDataType | TradierMetaDataType | null>(null)
  const [chartData, setChartData] = useState<any>(null)
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [options, setOptions] = useState<EChartsOption | null>(null)

  useEffect(() => {
    if (!props.messages || props.messages.length === 0) return

    const latestMessage = props.messages[props.messages.length - 1] as any

    if (!latestMessage?.data) return

    // Check id returned from BE - early return in the event that multiple charts are active.
    // This could be avoided if the EventBus was instanced to each websocket, or if the bus used
    // separate channels with the chartId assigned to it. But checking here would still give redundant security
    if (latestMessage.id !== props.headingData.chartId) return // Needs handling for historical data. Currently, no id is passed back, and no id is generated. They both === undefined and pass early return

    if (latestMessage.type.match(/historical|storedData/)) {
      const metaData = latestMessage.data.metaData as AlphaVantageMetaDataType
      setMetaData(metaData)

      const latestChartData = latestMessage.data.chartData
      setChartData(latestChartData)
      setOptions(buildOptions(latestChartData, metaData))
    } else if (latestMessage.type === 'real-time') {
      const metaData = latestMessage.data.metaData as TradierMetaDataType
      setMetaData(metaData)

      const latestChartData = (latestMessage.data.chartData as any) || { categoryData: [], values: [], volumes: [] }
      let existingChartData = chartData || { categoryData: [], values: [], volumes: [] }
      existingChartData = {
        categoryData: [...existingChartData.categoryData, ...latestChartData.categoryData],
        values: [...existingChartData.values, ...latestChartData.values],
        volumes: [...existingChartData.volumes, ...latestChartData.volumes],
      }
      setChartData(existingChartData)
      setOptions(buildOptions(existingChartData, metaData))
    } else if (latestMessage.type === 'algo1Analysis') {
      console.log(latestMessage)
      setAnalysisData(latestMessage.data)
      setOptions(buildOptions({ ...chartData, analysis: latestMessage.data }, metaData!))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.messages])

  const styles = {
    height: '90%',
  }

  const clearChart = () => {
    setChartData(null)
    setOptions(null)
  }

  return (
    <div className="candlestick-container">
      <ChartHeader
        metaData={metaData}
        headingData={props.headingData}
        requestType={props.requestType}
        socketControls={props.socketControls}
        clearChart={clearChart}
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
