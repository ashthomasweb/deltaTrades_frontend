const upColor = '#00da3c'
const downColor = '#ec0000'

export const buildOptions = (data, metaData) => {
  let result

  const legend = [
    {
      bottom: 10,
      left: 'center',
      data: [metaData ? Object?.entries(metaData)?.[1][1] : '', 'Volume'],
    },
    // {
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
      name: metaData ? Object?.entries(metaData)?.[1][1] : '',
      itemStyle: {
        color: downColor,
        color0: upColor,
        borderColor: undefined,
        borderColor0: undefined,
      },
    },
    {
      name: 'Volume',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: data?.volumes,
    },
  ]

  const newOptions = {
    ...options,
    legend,
    xAxis,
    series,
  }

  console.log(newOptions)
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
    position: function (
      pos: any,
      params: any,
      el: any,
      elRect: any,
      size: any,
    ) {
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
  //   xAxis: [
  //     {
  //       type: 'category',
  //       data: data?.categoryData,
  //       boundaryGap: false,
  //       axisLine: { onZero: false },
  //       splitLine: { show: false },
  //       min: 'dataMin',
  //       max: 'dataMax',
  //       axisPointer: {
  //         z: 100,
  //       },
  //     },
  //     {
  //       type: 'category',
  //       gridIndex: 1,
  //     //   data: data?.categoryData,
  //       boundaryGap: false,
  //       axisLine: { onZero: false },
  //       axisTick: { show: false },
  //       splitLine: { show: false },
  //       axisLabel: { show: false },
  //       min: 'dataMin',
  //       max: 'dataMax',
  //     },
  //   ],
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
      start: 1,
      end: 100,
    },
    {
      show: true,
      xAxisIndex: [0, 1],
      type: 'slider',
      top: '85%',
      start: 1,
      end: 100,
    },
  ],
  //   series: [
  //     {
  //       data: data?.values,
  //       type: 'candlestick',
  //       name: metaData ? Object?.entries(metaData)?.[1][1] : '',
  //       itemStyle: {
  //         color: downColor,
  //         color0: upColor,
  //         borderColor: undefined,
  //         borderColor0: undefined,
  //       },
  //     },
  //     {
  //       name: 'Volume',
  //       type: 'bar',
  //       xAxisIndex: 1,
  //       yAxisIndex: 1,
  //       data: data?.volumes,
  //     },
  //   ],
}
