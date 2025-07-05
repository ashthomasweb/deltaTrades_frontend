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

import React, { useEffect, useState, useRef, useCallback } from 'react'
import ReactECharts from 'echarts-for-react'
import './candlestick.scss'
import { buildOptions } from './candlestick-service'
import { ChartHeader } from '../chart-header/chart-header'
import {
  AlphaVantageMetaDataType,
  AnalysisDataPacket,
  ChartData,
  ChartHeadingData,
  RequestParams,
  RequestType,
  MessageType,
  SocketControls,
  TradierMetaDataType,
} from '../../types/types'

export interface CandleStickProps {
  messages: unknown[]
  headingData: ChartHeadingData
  requestParams: Partial<RequestParams> | null
  requestType: RequestType
  socketControls: SocketControls
}

export const Candlestick: React.FC<CandleStickProps> = (props: CandleStickProps) => {
  const [metaData, setMetaData] = useState<AlphaVantageMetaDataType | TradierMetaDataType | null>(null)
  const [chartData, setChartData] = useState<ChartData | null>(null)
  const [analysisData, setAnalysisData] = useState<AnalysisDataPacket | null | undefined>(null)
  const [options, setOptions] = useState<unknown | null>(null)
  const zoomRef = useRef<Partial<echarts.DataZoomComponentOption> | null>(null)
  const legendRef = useRef<Partial<echarts.LegendComponentOption> | null>(null)
  const zoomTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const extendedTickDataRef = useRef<any>(null)
  // const extendedTickDataHovered = useRef<any>(null)

  const onDataZoom = (params: echarts.DataZoomComponentOption) => {
    if (zoomTimeoutRef.current) {
      clearTimeout(zoomTimeoutRef.current)
    }

    zoomTimeoutRef.current = setTimeout(() => {
      if (params) {
        zoomRef.current = { start: params.start, end: params.end }
        setOptions(buildOptions(getOptionsArgs(chartData, metaData, analysisData)))
      }
    }, 500)
  }

  const onLegendSelectChanged = (params: echarts.LegendComponentOption) => {
    if (params) {
      legendRef.current = { selected: params.selected }
      setOptions(buildOptions(getOptionsArgs(chartData, metaData, analysisData)))
    }
  }

  const getOptionsArgs = useCallback(
    (
      chartData: ChartData | null,
      metaData: AlphaVantageMetaDataType | TradierMetaDataType | null,
      analysisData: AnalysisDataPacket | null | undefined,
    ) => {
      return {
        chartData: chartData,
        metaData: metaData,
        analysisData: analysisData,
        zoomData: zoomRef,
        legendData: legendRef,
      }
    },
    [],
  )

  const clearChart = () => {
    setChartData(null)
    setOptions(null)
  }

  useEffect(() => {
    if (!props.messages || props.messages.length === 0) return
    const latestMessage = props.messages[props.messages.length - 1] as MessageType
    if (!latestMessage?.data) return // TODO: Shouldn't this handle the possible 'undefined' that is currently requiring a non-null assertion below???

    const historicalOrStoredDataHandler = () => {
      const latestMetaData = latestMessage.data!.metaData as AlphaVantageMetaDataType
      const latestChartData = latestMessage.data!.chartData

      setMetaData(latestMetaData)
      setChartData(latestChartData)
      setOptions(buildOptions(getOptionsArgs(latestChartData, latestMetaData, null)))
    }

    const realTimeHandler = () => {
      // Check id returned from BE - early return in the event that multiple charts are active.
      // This could be avoided if the EventBus was instanced to each websocket, or if the bus used
      // separate channels with the chartId assigned to it. But checking here would still give redundant security
      if (latestMessage.id !== props.headingData.chartId) return // Needs handling for historical data. Currently, no id is passed back, and no id is generated. They both === undefined and pass early return

      const latestMetaData = latestMessage.data!.metaData as TradierMetaDataType
      const latestChartData = latestMessage.data!.chartData || { categoryData: [], values: [], volumes: [] }
      let existingChartData = chartData || { categoryData: [], values: [], volumes: [] }
      existingChartData = {
        categoryData: [...existingChartData.categoryData, ...latestChartData.categoryData],
        values: [...existingChartData.values, ...latestChartData.values],
        volumes: [...existingChartData.volumes, ...latestChartData.volumes],
      }

      setMetaData(latestMetaData)
      setChartData(existingChartData)
      setOptions(buildOptions(getOptionsArgs(existingChartData, latestMetaData, null)))
    }

    const analysisHandler = () => {
      console.log('trace: analysisHandler')
      const latestMetaData = latestMessage.data!.metaData as AlphaVantageMetaDataType
      const latestChartData = latestMessage.data!.chartData

      setMetaData(latestMetaData)
      setChartData(latestChartData)
      setAnalysisData(latestMessage.algoResults)
      extendedTickDataRef.current = latestMessage.algoResults?.extTickData
      // console.log(latestMessage.algoResults.extTick)
      setOptions(buildOptions(getOptionsArgs(latestChartData, latestMetaData, latestMessage.algoResults)))
    }

    if (latestMessage.type.match(/historical|storedData/)) {
      // TODO: Refactor to switch case once historic/storedData is refactored
      historicalOrStoredDataHandler()
    } else if (latestMessage.type === 'realTime') {
      realTimeHandler()
    } else if (latestMessage.type === 'analysis') {
      analysisHandler()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.messages])

  const onHover = params => {
    // console.log(extendedTickDataRef.current[params.dataIndex])
    // extendedTickDataHovered.current = extendedTickDataRef.current[params.dataIndex]
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
      {/* {extendedTickDataRef ? (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            height: 200,
            width: 200,
          }}
        >
          <span>{extendedTickDataHovered?.current?.percentChange}</span>
          <br />
          <span>{extendedTickDataHovered?.current?.isWickCrossing}</span>
        </div>
      ) : null} */}

      {options ? (
        <ReactECharts
          notMerge={true}
          lazyUpdate={false}
          option={options}
          style={{
            height: '90%',
          }}
          onEvents={{
            datazoom: onDataZoom,
            legendselectchanged: onLegendSelectChanged,
            updateAxisPointer: onHover,
          }}
        />
      ) : null}
    </div>
  )
}
