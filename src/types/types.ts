export interface RequestParams {
  type: string | null
  symbol: string | null
  month: string | null
  interval: string | null
  savedData: string | null
  storeData: string | null
  backfill: string | null
  dataSize: string | null
  algorithm: string | null
  sendToQueue: string | null
  enableTrading: string | null
  getPrevious: string | null // TODO: Possibly enable in the future for Tradier within 20 days...
  beginDate: string | null // TODO: Possibly enable in the future for Tradier within 20 days...
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
