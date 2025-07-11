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
    formatter: (params: any[]) => {
      const candle = params.find(p => p.seriesType === 'candlestick')
      const extended = params.find(p => p.seriesName === 'Extended Tick Data')
      const ADX = params.find(p => p.seriesName === 'ADX')
      const RSI = params.find(p => p.seriesName === 'RSI')

      // console.log(ADX)

      // console.log(params)

      const [open, close, low, high] = candle.data
      const timestamp = candle.name

      /* ATTENTION! Params in the extended data block must match key in ExtTick type in BE */
      return `
      <strong>${timestamp.substring(0, 10)}</strong><br/>
      <strong>${timestamp.substring(11)}</strong><br/>
      Open: ${open}<br/>
      Close: ${close}<br/>
      <hr/>
      High: ${high}<br/>
      Low: ${low}<br/>
      <hr />
      Short SMA: ${extended.data.movingAvg}<br/>
      Short EMA: ${extended.data.shortEmaAvg}<br/>
      Long EMA: ${extended.data.longEmaAvg}<br/>
      ${
        extended?.data
          ? `
        <hr/>
        isWickCrossing: ${extended.data.isWickCrossing}<br/>
        percSlopeByPeriod: ${extended.data.percSlopeByPeriod}<br/>
        priceSlopeByPeriod: ${extended.data.priceSlopeByPeriod}<br/>
        smaPercentSlopeByPeriod: ${extended.data.smaSlopeByPeriod}<br/>
        emaPercentSlopeByPeriod: ${extended.data.emaSlopeByPeriod}<br/>
        ADX: ${ADX.data}<br/>
        RSI: ${RSI.data}<br/>
        emaCrossing: ${extended.data.emaCrossing.crossing}<br/>
        emaCrossingDirection: ${extended.data.emaCrossing.direction}<br/>
        bollingerBreakout: ${extended.data.bollingerBreakout}<br/>
        volumeTrendIncreasing: ${extended.data.volumeTrendIncreasing}<br/>
        bearishEngulfScore: ${extended.data.bearishEngulfingScore}<br/>
        bullishExhaustion: ${extended.data.isBullishExhaustion}<br/>
      `
          : ''
      }
    `
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
    show: false,
    feature: {
      dataZoom: {
        yAxisIndex: true,
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
    top: '0%',
    left: '4px',
    textStyle: {
      color: '#00729b',
      padding: 0,
    },
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
      // Candlestick
      top: '1%',
      left: '200px',
      right: '15px',
      height: '60%',
    },
    {
      // Volume
      left: '200px',
      right: '15px',
      top: '41%',
      height: '20%',
    },
    {
      // ADX, RSI
      left: '200px',
      right: '15px',
      top: '65%',
      height: '10%',
    },
    {
      // MACD
      left: '200px',
      right: '15px',
      top: '75%',
      height: '20%',
    },
  ],
  yAxis: [
    {
      scale: true,
      splitArea: {
        show: true,
      },
      boundaryGap: ['25%', '4%'],
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
    {
      scale: true,
      gridIndex: 2,
      splitNumber: 2,
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
    {
      scale: true,
      gridIndex: 3,
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
      xAxisIndex: [0, 1, 2, 3],
      type: 'slider',
      filterMode: 'weakFilter',
      top: '96.5%',
      height: '20px',
      left: '197px',
    },
  ],
}
