/* eslint-disable @typescript-eslint/no-explicit-any */

export interface RequestParams {
  requestType: RequestType
  dataSource: DataSource
  symbol: string | undefined
  month: string | undefined
  interval: string | undefined
  requestedStoredDataFilename: string | undefined
  storeRequestedData: string | undefined
  backfill: string | undefined
  dataSize: string | undefined
  algorithm: string | undefined
  sendToQueue: string | undefined
  enableTrading: string | undefined
  getPreviousDay: string | undefined
  beginDate: string | undefined
  requestOriginator: RequestOriginator
  returnToFE: boolean | undefined
  chartId: string | null
  algoParams: any
}

export type RequestType = 'historical' | 'realTime' | 'closeRequest' | 'storedData' | 'analysis'
export type DataSource = 'alpha-vantage' | 'tradier' | 'storedData' | undefined
export type RequestOriginator = 'frontend' | 'backend' | 'emergency'

export interface AlphaVantageResponseMetaData {
  // TODO: Is this the appropriate name? It's actually getting chartData built from NormalizedData ... wait until app is further hardened
  // This 'Response' is coming from backend, after normalization and parsing. It is NOT directly from the provider.
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

export interface TradierResponseMetaData {
  // This 'Response' is coming from backend, after normalization and parsing. It is NOT directly from the provider.
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
  chartId?: string | null
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
  extTickData: Record<string, any>
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
  metaData: AlphaVantageResponseMetaData | TradierResponseMetaData | null
  analysisData: any | null
  zoomData: any
  legendData: any | null
}

export type MessageType = {
  type: string
  data?: {
    chartData: ChartData
    metaData: AlphaVantageResponseMetaData | TradierResponseMetaData
    id: number
    creationMeta: CreationMeta
  }
  chartData?: ChartData
  algoResults?: AnalysisDataPacket
  id?: string
}

export type NoiseWindows = 'NW1' | 'NW2' | 'NW3' | 'NW4' | 'NW5' | 'NW6' // TODO: Create array to loop over for options - wait until app is more hardened
