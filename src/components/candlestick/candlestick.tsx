import React, { useEffect, useState, useRef } from 'react'
import ReactECharts from 'echarts-for-react'
import './candlestick.scss'
import { RequestParams } from '../alpha-socket-monitor/alpha-socket-monitor'
import { dataAdapter } from '../../services/data-adapter.service'
// import * as echarts from 'echarts/core'
import type { EChartsInstance } from 'echarts-for-react'
import { buildOptions } from './config'

interface CandleStickProps {
  messages: any[]
  headingData: {
    title: string
    isConnected: boolean
  }
  requestParams: RequestParams | null
}

const Candlestick: React.FC<CandleStickProps> = (props: CandleStickProps) => {
  const [data, setData] = useState<any>(null)
  const [metaData, setMetaData] = useState<any>(null)
  const [options, setOptions] = useState<any>(null)

  const chartRef = useRef<EChartsInstance | null>(null)

  useEffect(() => {
    console.log(props)

    if (
      props.messages.length > 1 &&
      Object.keys(props.messages[props.messages.length - 1]).includes('data')
    ) {
      console.log('has data')
      const chartData = dataAdapter(
        props.messages[props.messages.length - 1].data,
        props.requestParams?.interval as string,
      )
      console.log(chartData)

      setOptions(options)

      // buildOptions(chartData)
      setOptions(buildOptions(chartData))
    }
  }, [props.messages])

  const styles = {
    height: '90%',
  }

  return (
    <div className="candlestick-container">
      <div className="meta-data">
        <header>
          <h2>{props.headingData?.title}</h2>
          <h3
            className={`status ${props.headingData.isConnected ? 'connected' : ''}`}
          >
            <span>Status: </span>
            <span>
              {props.headingData?.isConnected
                ? '🟢 Connected'
                : '🔴 Disconnected'}
            </span>
          </h3>
        </header>
        <span>Symbol: {metaData?.['2. Symbol']}</span>
        <span>Interval: {metaData?.['4. Interval']}</span>
      </div>
      {options ? (
        <ReactECharts
          ref={chartRef}
          notMerge={true}
          lazyUpdate={false}
          option={options}
          style={styles}
        />
      ) : null}
    </div>
  )
}

export default Candlestick

// useEffect(() => {
//   console.log(
//     '***\n%cTRACE: UE DataMassage',
//     'color: green; font-weight: 900',
//   )

//   console.log(props)
//   // if (props.messages[1]?.data) {
//   //   console.log(props.messages)
//   //   console.log(props?.messages?.[1]?.data['Meta Data'])

//   //   setMetaData(props?.messages?.[1]?.data['Meta Data'])

//   //   // const dataset = Object.values(
//   //   //   props.messages[1]?.data['Time Series (1min)'],
//   //   // )
//   //   // const formattedData = Object.entries(dataset).map(
//   //   //   ([index, tick]: [string, HistoricDataPoint | any]) => {
//   //   //     return [
//   //   //       Object.keys(props.messages[1]?.data['Time Series (1min)'])[+index],
//   //   //       +tick['1. open'],
//   //   //       +tick['4. close'],
//   //   //       +tick['3. low'],
//   //   //       +tick['2. high'],
//   //   //       +tick['5. volume'],
//   //   //     ]
//   //   //   },
//   //   // )

//   //   // function splitData(rawData: any) {
//   //   //   const categoryData = []
//   //   //   const values = []
//   //   //   const volumes = []
//   //   //   for (let i = 0; i < rawData.length; i++) {
//   //   //     categoryData.push(rawData[i].splice(0, 1)[0])
//   //   //     values.push(rawData[i])
//   //   //     volumes.push([
//   //   //       i,
//   //   //       rawData[i][4],
//   //   //       rawData[i][0] > rawData[i][1] ? -1 : 1,
//   //   //     ])
//   //   //   }
//   //   //   const result = {
//   //   //     categoryData: categoryData,
//   //   //     values: values,
//   //   //     volumes: volumes,
//   //   //   }
//   //   //   return result
//   //   // }
//   // }
//   // setData(splitData(formattedData))

//   // setOptions({ ...options })

// }, [props.messages, props.requestParams?.symbol])
