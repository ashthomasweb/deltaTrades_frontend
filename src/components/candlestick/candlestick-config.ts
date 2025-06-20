export const upColor = '#ec0000'
export const downColor = '#00da3c'

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
    bottom: '23%',
    pieces: [
      {
        value: -1,
        color: upColor,
        label: 'Loss',
      },
      {
        value: 1,
        color: downColor,
        label: 'Gain',
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
    },
    {
      show: true,
      xAxisIndex: [0, 1],
      type: 'slider',
      filterMode: 'weakFilter',
      top: '85%',
    },
  ],
}
