import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'

interface CandleStickProps {
  messages: any[]
}

interface HistoricDataPoint {
  '1. open': string
  '2. high': string
  '3. low': string
  '4. close': string
  '5. volume': string
}

const Candlestick: React.FC<CandleStickProps> = (props: CandleStickProps) => {
  const [data, setData] = useState<any>(null)
  const [metaData, setMetaData] = useState<any>(null)

  const upColor = '#00da3c'
  const downColor = '#ec0000'

  useEffect(() => {
    if (props.messages.length > 1) {
      setMetaData(props.messages[1]?.data['Meta Data'])
      const dataset = Object.values(
        props.messages[1]?.data['Time Series (1min)'],
      )
      const formattedData = Object.entries(dataset).map(
        ([index, tick]: [string, HistoricDataPoint | any]) => {
          return [
            Object.keys(props.messages[1]?.data['Time Series (1min)'])[+index],
            +tick['1. open'],
            +tick['4. close'],
            +tick['3. low'],
            +tick['2. high'],
            +tick['5. volume'],
          ]
        },
      )

      function splitData(rawData: any) {
        const categoryData = []
        const values = []
        const volumes = []
        for (let i = 0; i < rawData.length; i++) {
          categoryData.push(rawData[i].splice(0, 1)[0])
          values.push(rawData[i])
          volumes.push([
            i,
            rawData[i][4],
            rawData[i][0] > rawData[i][1] ? -1 : 1,
          ])
        }
        const result = {
          categoryData: categoryData,
          values: values,
          volumes: volumes,
        }
        return result
      }
      setData(splitData(formattedData))
    }
  }, [props.messages])

  const options = {
    animation: false,
    legend: {
      bottom: 10,
      left: 'center',
      data: [metaData ? Object?.entries(metaData)?.[1][1] : '', 'Volume'],
    },
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
    xAxis: [
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
    series: [
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
    ],
  }

  const styles = {
    height: '100%',
  }

  return (
    <div
      style={{
        width: 1000,
        height: 800,
        background: 'whitesmoke',
        padding: 20,
        borderRadius: 14,
      }}
    >
      {props.messages.length > 1 ? (
        <ReactECharts option={options} style={styles} />
      ) : null}
    </div>
  )
}

export default Candlestick
