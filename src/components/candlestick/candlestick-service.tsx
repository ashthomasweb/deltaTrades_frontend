import { BuildOptionsArgsType } from '../../types/types'
import { downColor, options, upColor } from './candlestick-config'

export const buildOptions = (dataOptions: BuildOptionsArgsType): unknown => {
  const analysisSingleDirBlocks = []
  const analysisNoiseWindows = []
  let analysisMA10 = {}
  let analysisBollinger = []
  // let extendedTickDataIndexArray = []
  console.log(dataOptions)

  if (dataOptions.analysisData.analysis) {
    for (const entry in dataOptions.analysisData.analysis.singleDirBlocks) {
      analysisSingleDirBlocks.push([
        {
          xAxis: dataOptions.analysisData.analysis.singleDirBlocks[entry].start,
        },
        {
          xAxis: dataOptions.analysisData.analysis.singleDirBlocks[entry].end,
        },
      ])
    }

    for (const entry in dataOptions.analysisData.analysis.noiseWindows) {
      analysisNoiseWindows.push([
        {
          xAxis: dataOptions.analysisData.analysis.noiseWindows[entry].start,
        },
        {
          xAxis: dataOptions.analysisData.analysis.noiseWindows[entry].end,
        },
      ])
    }

    analysisMA10 = dataOptions.analysisData.analysis?.SMA1
    analysisBollinger = dataOptions.analysisData.analysis?.bollingerBands
    // extendedTickDataIndexArray = dataOptions.chartData?.categoryData.map(timestamp => [timestamp, null])
  }

  const legend = [
    {
      bottom: 10,
      left: 'center',
      selected: dataOptions.legendData ? dataOptions.legendData.current?.selected : { 'Single Direction': false },
      data: [
        {
          name: dataOptions.metaData?.tickerSymbol,
          // icon: '',
        },
        {
          name: 'Volume',
          // icon: '',
        },
      ],
      backgroundColor: '#222',
      textStyle: {
        color: '#00729b',
        padding: 0,
      },
      itemGap: 16,
      inactiveColor: '#555',
      padding: 8,
    },
  ]

  if (dataOptions.analysisData.analysis) {
    legend[0].data.push(
      {
        name: 'Single Direction',
        // icon: 'rect',
      },
      {
        name: 'SMA',
        // icon: '',
      },
      {
        name: 'Short EMA',
        // icon: '',
      },
      {
        name: 'Long EMA',
        // icon: '',
      },
      {
        name: 'Bollinger Band',
        // icon: '',
      },
      {
        name: 'Noise Windows',
        // icon: 'rect',
      },
      {
        name: 'Buy Signals',
        // icon: 'path://M8,0 L8,4 M8,6 L8,10 M8,12 L8,16',
      },
    )
  }

  const series: unknown = [
    {
      data: dataOptions.chartData?.values,
      type: 'candlestick',
      name: dataOptions.metaData ? dataOptions.metaData?.tickerSymbol : '',
      itemStyle: {
        color: downColor,
        color0: upColor,
        borderColor: undefined,
        borderColor0: undefined,
      },
      large: true,
      largeThreshold: 1000,
      progressive: 200,
      progressiveThreshold: 400,
    },
    {
      name: 'Volume',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: dataOptions.chartData?.volumes,
      large: true,
      largeThreshold: 1000,
      progressive: 200,
      progressiveThreshold: 400,
    },
  ]

  if (dataOptions.analysisData.analysis && Array.isArray(series)) {
    series.push(
      {
        type: 'scatter',
        name: 'Single Direction',
        data: [
          {
            value: ['2016-04-19', null], // y-value can be null or some high/low point
          },
        ],
        markArea: {
          itemStyle: {
            color: 'rgba(81, 89, 161, 0.36)',
          },
          data: analysisSingleDirBlocks,
        },
        symbolSize: 1,
        icon: 'rect',
        itemStyle: {
          opacity: 1,
          color: 'rgba(81, 89, 161, 0.36)',
          borderColor: 'rgb(81, 89, 161)',
          borderWidth: 1,
        },
        tooltip: {
          show: false,
        },
      },
      {
        type: 'scatter',
        name: 'Noise Windows',
        data: [
          {
            value: ['2016-04-19', null], // y-value can be null or some high/low point
          },
        ],
        markArea: {
          itemStyle: {
            color: 'rgba(155, 73, 177, 0.2)',
          },
          data: analysisNoiseWindows,
        },
        symbolSize: 5,
        itemStyle: {
          opacity: 1,
          color: 'rgba(155, 73, 177, 0.2)',
          borderColor: 'rgb(155, 73, 177)',
          borderWidth: 1,
        },
        tooltip: {
          show: false,
        },
      },
      {
        type: 'scatter',
        name: 'Buy Signals',
        data: [
          {
            value: ['2016-04-19', null], // y-value can be null or some high/low point
          },
        ],
        markLine: {
          data: dataOptions.analysisData.analysis?.crossingSignal?.map((entry: { xAxis: string }) => {
            return { xAxis: entry }
          }),
          lineStyle: { color: '#00729b', width: 1, opacity: 0.8 },
          symbol: 'none',
          label: { show: false },
        },
        symbolSize: 5,
        itemStyle: {
          opacity: 1,
          color: '#00729b',
        },
        tooltip: {
          show: false,
        },
      },
      {
        name: 'SMA',
        symbolSize: 1,
        ...analysisMA10,
        itemStyle: {
          color: '#a6a254',
        },
      },
      {
        name: 'Short EMA',
        symbolSize: 1,
        ...dataOptions.analysisData.analysis.EMA1,
        itemStyle: {
          color: 'white',
        },
      },
      {
        name: 'Long EMA',
        symbolSize: 1,
        ...dataOptions.analysisData.analysis.EMA2,
        itemStyle: {
          color: 'white',
        },
      },
      ...analysisBollinger,
      {
        type: 'scatter',
        name: 'Extended Tick Data',
        data: dataOptions.analysisData.extTickData,
        symbolSize: 0.1,
        itemStyle: { opacity: 0 },
        tooltip: { show: true },
        z: -999, // keep way behind
      },
      {
        name: 'ADX',
        symbolSize: 1,
        xAxisIndex: 2,
        yAxisIndex: 2,
        data: dataOptions.analysisData.analysis.ADX,
        type: 'line',
        smooth: true,
        itemStyle: {
          color: '#a6a254',
        },
      },
    )
  }

  const xAxis = [
    {
      type: 'category',
      data: dataOptions.chartData?.categoryData,
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false },
      min: 'dataMin',
      max: 'dataMax',
      axisPointer: {
        z: 100,
      },
    },
    {
      type: 'category',
      gridIndex: 1,
      data: dataOptions.chartData?.categoryData,
      boundaryGap: false,
      axisLine: { onZero: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      min: 'dataMin',
      max: 'dataMax',
    },
    {
      type: 'category',
      gridIndex: 2,
      data: dataOptions.chartData?.categoryData,
      boundaryGap: false,
      axisLine: { onZero: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      min: 'dataMin',
      max: 'dataMax',
    },
  ]

  const dataZoom = [
    {
      ...options.dataZoom[0],
      ...dataOptions.zoomData.current,
    },
    {
      ...options.dataZoom[1],
      ...dataOptions.zoomData.current,
    },
  ]

  const newOptions = {
    ...options,
    legend,
    xAxis,
    series,
    dataZoom,
  }

  return newOptions
}
