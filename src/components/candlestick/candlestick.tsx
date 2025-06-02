import React, { useEffect, useState, useRef } from 'react'
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
  requestType: 'historical' | 'real-time' | 'analysis'
  socketControls: any
}

export type MessageType = {
  type: string
  data: Record<string, any>
  id?: string
}

export const Candlestick: React.FC<CandleStickProps> = (props: CandleStickProps) => {
  const [metaData, setMetaData] = useState<AlphaVantageMetaDataType | TradierMetaDataType | null>(null)
  const [chartData, setChartData] = useState<any>(null)
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [options, setOptions] = useState<EChartsOption | null>(null)
  const zoomRef = useRef<any>(null)

  const onDataZoom = (params: any) => {
    // Buggy - stale value get passed to chart immediately on re-render, but then corrects itself. Works enough for basic analysis at this time. Needs to be fixed.
    // const zoomEvent = params.batch?.[0]
    if (params) {
      zoomRef.current = { start: params.start, end: params.end }
    }
  }

  useEffect(() => {
    if (!props.messages || props.messages.length === 0) return
    const latestMessage = props.messages[props.messages.length - 1] as MessageType
    if (!latestMessage?.data) return

    if (latestMessage.type.match(/historical|storedData/)) {
      console.log('***\n%cTRACE: historical/stored', 'color: green; font-weight: 900')

      const metaData = latestMessage.data.metaData as AlphaVantageMetaDataType
      const latestChartData = latestMessage.data.chartData

      setMetaData(metaData)
      setChartData(latestChartData)
      setOptions(buildOptions(latestChartData, metaData, { zoom: zoomRef }))
    } else if (latestMessage.type === 'real-time') {
      console.log('***\n%cTRACE: real-time', 'color: green; font-weight: 900')

      // Check id returned from BE - early return in the event that multiple charts are active.
      // This could be avoided if the EventBus was instanced to each websocket, or if the bus used
      // separate channels with the chartId assigned to it. But checking here would still give redundant security
      if (latestMessage.id !== props.headingData.chartId) return // Needs handling for historical data. Currently, no id is passed back, and no id is generated. They both === undefined and pass early return

      const metaData = latestMessage.data.metaData as TradierMetaDataType
      const latestChartData = (latestMessage.data.chartData as any) || { categoryData: [], values: [], volumes: [] }
      let existingChartData = chartData || { categoryData: [], values: [], volumes: [] }
      existingChartData = {
        categoryData: [...existingChartData.categoryData, ...latestChartData.categoryData],
        values: [...existingChartData.values, ...latestChartData.values],
        volumes: [...existingChartData.volumes, ...latestChartData.volumes],
      }

      setMetaData(metaData)
      setChartData(existingChartData)
      setOptions(buildOptions(existingChartData, metaData))
    } else if (latestMessage.type === 'algo1Analysis') {
      console.log('***\n%cTRACE: algo1Analysis', 'color: green; font-weight: 900')

      setAnalysisData(latestMessage.data)
      setOptions(buildOptions({ ...chartData, analysis: latestMessage.data }, metaData!, { zoom: zoomRef }))
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
          onEvents={{ datazoom: onDataZoom }}
        />
      ) : null}
    </div>
  )
}
