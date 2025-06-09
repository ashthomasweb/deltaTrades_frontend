/**
 * 🚨 Important Note / Lessons Learned 🚨
 *
 * During chart updates (e.g., when new data arrives or the user zooms),
 * ECharts can momentarily display a stale zoom position that was present in the last chart render.
 *
 * This happens because:
 * - ECharts' internal render cycle applies dataZoom AFTER the new data layout is computed.
 * - The "options" object passed to the chart includes deeply nested zoom values from the previous render.
 * - These nested zoom values momentarily appear in the new chart, even if the user has changed them.
 *
 * Simplified:
 * - React's state updates do not deeply track nested objects like "dataZoom" inside ECharts.
 * - ECharts reuses this nested structure temporarily, causing a brief flicker to the old zoom position.
 *
 * ✅ Solution:
 * We debounce updates to zoomRef, and on each zoom event, we forcibly rebuild the entire chart "options" object
 * with the updated zoom. This ensures that no stale deep references remain in ECharts' render cycle.
 *
 * This pattern avoids flickers and ensures smooth, correct zoom transitions.
 */

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
  data?: Record<string, any>
  chartData?: Record<string, any>
  algoResults?: Record<string, any>
  id?: string
}

export const Candlestick: React.FC<CandleStickProps> = (props: CandleStickProps) => {
  const [metaData, setMetaData] = useState<AlphaVantageMetaDataType | TradierMetaDataType | null>(null)
  const [chartData, setChartData] = useState<any>(null)
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [options, setOptions] = useState<EChartsOption | null>(null)
  const zoomRef = useRef<any>(null)
  const legendRef = useRef<any>(null)

  const zoomTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const onDataZoom = (params: any) => {
    if (zoomTimeoutRef.current) {
      clearTimeout(zoomTimeoutRef.current)
    }

    zoomTimeoutRef.current = setTimeout(() => {
      if (params) {
        zoomRef.current = { start: params.start, end: params.end }
        setOptions(
          buildOptions({ ...chartData, analysis: analysisData }, metaData!, { zoom: zoomRef }, { legend: legendRef }),
        ) // The Fix!
      }
    }, 250)
  }

  const onLegendSelectChanged = (params: { name: string; selected: Record<string, boolean>; type: string }) => {
    // console.log(params)

    if (params) {
      legendRef.current = { selected: params.selected }
      setOptions(
        buildOptions({ ...chartData, analysis: analysisData }, metaData!, { zoom: zoomRef }, { legend: legendRef }),
      ) // The Fix!
    }
  }

  useEffect(() => {
    if (!props.messages || props.messages.length === 0) return
    const latestMessage = props.messages[props.messages.length - 1] as MessageType
    if (!latestMessage?.data) return // TODO: Shouldn't this handle the possible 'undefined' that is currently requiring a non-null assertion below???

    const historicalOrStoredDataHandler = () => {
      const metaData = latestMessage.data!.metaData as AlphaVantageMetaDataType
      const latestChartData = latestMessage.data!.chartData

      setMetaData(metaData)
      setChartData(latestChartData)
      setOptions(buildOptions(latestChartData, metaData, { zoom: zoomRef }))
    }

    const realTimeHandler = () => {
      // Check id returned from BE - early return in the event that multiple charts are active.
      // This could be avoided if the EventBus was instanced to each websocket, or if the bus used
      // separate channels with the chartId assigned to it. But checking here would still give redundant security
      if (latestMessage.id !== props.headingData.chartId) return // Needs handling for historical data. Currently, no id is passed back, and no id is generated. They both === undefined and pass early return

      const metaData = latestMessage.data!.metaData as TradierMetaDataType
      const latestChartData = (latestMessage.data!.chartData as any) || { categoryData: [], values: [], volumes: [] }
      let existingChartData = chartData || { categoryData: [], values: [], volumes: [] }
      existingChartData = {
        categoryData: [...existingChartData.categoryData, ...latestChartData.categoryData],
        values: [...existingChartData.values, ...latestChartData.values],
        volumes: [...existingChartData.volumes, ...latestChartData.volumes],
      }

      setMetaData(metaData)
      setChartData(existingChartData)
      setOptions(buildOptions(existingChartData, metaData))
    }

    const algo1AnalysisHandler = () => {
      // TODO: RETIRE??
      setAnalysisData(latestMessage.data)
      setOptions(
        buildOptions(
          { ...chartData, analysis: latestMessage.data },
          metaData!,
          { zoom: zoomRef },
          { legend: legendRef },
        ),
      )
    }

    const analysisHandler = () => {
      const metaData = latestMessage.data!.metaData as AlphaVantageMetaDataType
      const latestChartData = latestMessage.data!.chartData

      setMetaData(metaData)
      setChartData(latestChartData)
      setAnalysisData(latestMessage.algoResults)
      setOptions(
        buildOptions(
          { ...latestChartData, analysis: latestMessage.algoResults },
          metaData,
          { zoom: zoomRef },
          { legend: legendRef },
        ),
      )
    }

    if (latestMessage.type.match(/historical|storedData/)) {
      // TODO: Refactor to switch case once historic/storedData is refactored
      historicalOrStoredDataHandler()
    } else if (latestMessage.type === 'real-time') {
      realTimeHandler()
    } else if (latestMessage.type === 'algo1Analysis') {
      algo1AnalysisHandler()
    } else if (latestMessage.type === 'analysis') {
      analysisHandler()
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
          onEvents={{
            datazoom: onDataZoom,
            legendselectchanged: onLegendSelectChanged,
          }}
        />
      ) : null}
    </div>
  )
}
