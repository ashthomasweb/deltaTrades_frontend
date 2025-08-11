/* eslint-disable @typescript-eslint/no-explicit-any */

export interface RequestParams {
  requestType: RequestType
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
  requestOriginator: RequestOriginator
  returnToFE: boolean | undefined
  chartId: number | null
  algoParams: any
}

export type RequestType = 'historical' | 'real-time' | 'closeRequest' | 'storedData' | 'analysis' | undefined
export type DataSource = 'alpha-vantage' | 'tradier' | 'storedData' | undefined
export type RequestOriginator = 'frontend' | 'backend' | 'emergency'


export interface AlphaVantageMetaDataType { // TODO: These types should have 'Response' in the name
  historicalMeta?: {
    beginDate: string
    endDate: string
    datasetSize: 'compact' | 'full'
  }
  dataSource: DataSource
  requestType: RequestType
  interval: string
  tickerSymbol: string
}

export interface TradierMetaDataType { // TODO: These types should have 'Response' in the name
  realTimeMeta?: {
    beginDate: string
    endDate: string
  }
  dataSource: DataSource
  requestType: RequestType
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
