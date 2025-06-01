import { AlphaVantageMetaDataType, TradierMetaDataType } from '../../types/types'

const upColor = '#ec0000'
const downColor = '#00da3c'

export const buildOptions = (
  data: any,
  metaData: AlphaVantageMetaDataType | TradierMetaDataType,
  ...args: any
): any => {
  const analysisSingleDirBlocks = []
  const analysisNoiseWindows = []
  let analysisMA10 = {}
  if (data.analysis) {
    // console.log(data.analysis)
    for (const entry in data.analysis.singleDirBlocks) {
      // console.log(data.analysis[entry])
      analysisSingleDirBlocks.push([
        {
          // name: 'Single Direction',
          xAxis: data.analysis.singleDirBlocks[entry].start,
        },
        {
          xAxis: data.analysis.singleDirBlocks[entry].end,
        },
      ])
    }

    for (const entry in data.analysis.noiseWindows) {
      // console.log(data.analysis[entry])
      analysisNoiseWindows.push([
        {
          // name: 'Single Direction',
          xAxis: data.analysis.noiseWindows[entry].start,
        },
        {
          xAxis: data.analysis.noiseWindows[entry].end,
        },
      ])
    }

    analysisMA10 = data.analysis.MA10
  }

  const legend = [
    {
      bottom: 10,
      left: 'center',
      selected: {
        'Single Direction': false,
      },
      data: [metaData ? metaData?.tickerSymbol : '', 'Volume', 'Single Direction', 'MA', 'Noise Windows'],
    },
    // { // TODO: Find out where we can set the positioning of the 'Volume' chart legend ...
    //   bottom: 50,
    //   left: 'center',
    //   data: [metaData ? Object?.entries(metaData)?.[1][1] : '', 'Volume'],
    // },
  ]

  const xAxis = [
    {
      type: 'category',
      data: data?.categoryData,
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
      data: data?.categoryData,
      boundaryGap: false,
      axisLine: { onZero: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      min: 'dataMin',
      max: 'dataMax',
    },
  ]

  const series = [
    {
      data: data?.values,
      type: 'candlestick',
      name: metaData ? metaData?.tickerSymbol : '',
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
      data: data?.volumes,
      large: true,
      largeThreshold: 1000,
      progressive: 200,
      progressiveThreshold: 400,
    },
    {
      type: 'scatter',
      name: 'Single Direction',
      data: [
        {
          value: ['2016-04-19', null], // y-value can be null or some high/low point
          tooltip: {
            formatter: () => 'Signal: Single Direction',
          },
        },
      ],
      markArea: {
        itemStyle: {
          color: 'rgba(255, 173, 177, 0.2)',
        },
        data: analysisSingleDirBlocks,
      },
      symbolSize: 1,
      itemStyle: {
        opacity: 0,
      },
      tooltip: {
        show: true,
      },
    },
    {
      type: 'scatter',
      name: 'Noise Windows',
      data: [
        {
          value: ['2016-04-19', null], // y-value can be null or some high/low point
          tooltip: {
            formatter: () => 'Noise Windows',
          },
        },
      ],
      markArea: {
        itemStyle: {
          color: 'rgba(155, 73, 177, 0.2)',
        },
        data: analysisNoiseWindows,
      },
      symbolSize: 1,
      itemStyle: {
        opacity: 0,
      },
      tooltip: {
        show: true,
      },
    },
    {
      type: 'scatter',
      name: 'Buy Signals',
      data: [
        {
          value: ['2016-04-19', null], // y-value can be null or some high/low point
          tooltip: {
            formatter: () => 'Signal: Single Direction',
          },
        },
      ],
      markLine: {
        data: data?.analysis?.crossingSignal?.map((entry: { xAxis: string }) => {
          return { xAxis: entry }
        }),
        lineStyle: { color: 'white', width: 0.5, opacity: 0.8 },
        symbol: 'none',
        label: { show: false },
      },
      symbolSize: 1,
      itemStyle: {
        opacity: 0,
      },
      tooltip: {
        show: true,
      },
    },
    {
      name: 'MA',
      symbolSize: 0,
      ...analysisMA10,
    },
  ]

  const dataZoom = [
    {
      ...options.dataZoom[0],
      ...args[0].zoom.current,
    },
    {
      ...options.dataZoom[1],
      ...args[0].zoom.current,
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

export const options = {
  animation: false,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    textStyle: {
      color: '#000',
    },
    position: function (pos: any, params: any, el: any, elRect: any, size: any) {
      const obj: any = {
        top: 10,
      }
      obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30
      return obj
    },
  },
  axisPointer: {
    link: [
      {
        xAxisIndex: 'all',
      },
    ],
    label: {
      backgroundColor: '#777',
    },
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: false,
      },
      brush: {
        type: ['lineX', 'clear'],
      },
    },
  },
  brush: {
    xAxisIndex: 'all',
    brushLink: 'all',
    outOfBrush: {
      colorAlpha: 0.1,
    },
  },
  visualMap: {
    show: true,
    seriesIndex: 1,
    dimension: 2,
    pieces: [
      {
        value: -1,
        color: upColor,
        label: 'Gain',
      },
      {
        value: 1,
        color: downColor,
        label: 'Loss',
      },
    ],
  },
  grid: [
    {
      left: '10%',
      right: '8%',
      height: '50%',
    },
    {
      left: '10%',
      right: '8%',
      top: '63%',
      height: '16%',
    },
  ],
  yAxis: [
    {
      scale: true,
      splitArea: {
        show: true,
      },
    },
    {
      scale: true,
      gridIndex: 1,
      splitNumber: 2,
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
  ],
  dataZoom: [
    {
      type: 'inside',
      xAxisIndex: [0, 1],
      filterMode: 'weakFilter',
      // start: 96,
      // end: 100,
    },
    {
      show: true,
      xAxisIndex: [0, 1],
      type: 'slider',
      filterMode: 'weakFilter',
      top: '85%',
      // start: 96,
      // end: 100,
    },
  ],
}
