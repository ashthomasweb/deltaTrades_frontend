import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import './candlestick.scss'
import { dataAdapter } from '../../services/data-adapter.service'
import { buildOptions } from './config'
import { ChartHeader } from '../chart-header/chart-header'
import { CandleStickProps, AlphaVantageMetaDataType } from '../../types/types'
import { EChartsOption } from 'echarts'

export const Candlestick: React.FC<CandleStickProps> = (
  props: CandleStickProps,
) => {
  const [metaData, setMetaData] = useState<AlphaVantageMetaDataType | null>(
    null,
  )
  const [options, setOptions] = useState<EChartsOption | null>(null)

  useEffect(() => {
    if (!props.messages || props.messages.length === 0) return

    const latestMessage = props.messages[props.messages.length - 1] as {
      data: Record<string, unknown>
    }

    if (!latestMessage?.data || !latestMessage.data['Meta Data']) return

    const metaData = latestMessage.data['Meta Data'] as AlphaVantageMetaDataType
    setMetaData(metaData)

    const chartData = dataAdapter(
      latestMessage.data,
      props.requestParams?.interval as string,
    )
    setOptions(buildOptions(chartData, metaData))
  }, [props.messages])

  const styles = {
    height: '90%',
  }

  return (
    <div className="candlestick-container">
      <ChartHeader metaData={metaData} headingData={props.headingData} />
      {options ? (
        <ReactECharts
          notMerge={true}
          lazyUpdate={false}
          option={options}
          style={styles}
        />
      ) : null}
    </div>
  )
}
