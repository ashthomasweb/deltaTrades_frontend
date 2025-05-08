export interface RequestParams {
  type: string | undefined
  dataSource: 'alpha-vantage' | 'tradier'
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
}

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
