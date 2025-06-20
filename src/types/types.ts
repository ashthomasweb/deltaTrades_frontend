/* eslint-disable @typescript-eslint/no-explicit-any */

export interface RequestParams {
  type: string | undefined
  dataSource: DataSource
  symbol: string | undefined
  month: string | undefined
  interval: string | undefined
  savedData: string | undefined
  storeData: string | undefined
  backfill: string | undefined
  dataSize: string | undefined
  algorithm: string | undefined
  sendToQueue: string | undefined
  enableTrading: string | undefined
  getPrevious: string | undefined
  beginDate: string | undefined
  originator: string | undefined
  returnToFE: boolean | undefined
  chartId: number | null
  algoParams: any
}

export type DataSource = 'alpha-vantage' | 'tradier' | 'storedData'

export type RequestType = 'historical' | 'real-time' | 'analysis'

export interface AlphaVantageMetaDataType {
  historicalMeta?: {
    beginDate: string
    endDate: string
    datasetSize: 'compact' | 'full'
  }
  inputSource: 'AlphaVantage' | 'Tradier'
  inputType: 'historical' | 'real-time'
  interval: string
  tickerSymbol: string
}

export interface TradierMetaDataType {
  realTimeMeta?: {
    beginDate: string
    endDate: string
  }
  inputSource: 'AlphaVantage' | 'Tradier'
  inputType: 'historical' | 'real-time'
  interval: string
  tickerSymbol: string
}

export type ChartHeadingData = {
  title: string
  isConnected: boolean
  connectionType: string
  chartId?: number | null
}

export type ConnectionStatus = {
  isConnected: boolean
  message: string | null
}

export type SocketControls = {
  connect: () => void
  disconnect: () => void
}

export type ChartData = {
  categoryData: string[]
  values: number[][]
  volumes: number[][]
}

export type AnalysisDataPacket = {
  MA: {
    data: [null | number]
    smooth: boolean
    type: string
  }
  crossingSignal: string[]
  noiseWindows: Record<
    number,
    {
      data: ExtTick[]
      start: string
      end: string
    }
  >
  signalDirBlocks: Record<
    number,
    {
      data: Tick[]
      start: string
      end: string
    }
  >
}

export interface Tick {
  timestamp: string | undefined
  open: number
  close: number
  high: number
  low: number
  volume: number
  percentChange?: number | null
  absoluteChange?: number | null
  vwap?: number | null
}

export interface ExtTick extends Tick {
  originalIndex: number | undefined
  isPrevGreen: boolean | null
  isGreen: boolean
  isNextGreen: boolean | null
  movingAvg: number | undefined
  isBodyCrossing: boolean | undefined
  isWickCrossing: boolean | undefined
  crossesBodyAtPercent?: number | null
  isCandleFull80: boolean
  candleBodyFullness: number
  candleBodyDistPercentile: number | undefined
  candleVolumeDistPercentile: number | undefined
}

export type CreationMeta = {
  createdAtLocal: string
  createdAtUTC: string
  localTimezon: string
}

export type BuildOptionsArgsType = {
  chartData: ChartData | null
  metaData: AlphaVantageMetaDataType | TradierMetaDataType | null
  analysisData: any | null
  zoomData: any
  legendData: any | null
}

export type MessageType = {
  type: string
  data?: {
    chartData: ChartData
    metaData: AlphaVantageMetaDataType | TradierMetaDataType
    id: number
    creationMeta: CreationMeta
  }
  chartData?: ChartData
  algoResults?: AnalysisDataPacket
  id?: string
}
