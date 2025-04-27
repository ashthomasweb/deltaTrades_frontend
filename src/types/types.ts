export interface RequestParams {
  type: string | null
  symbol: string | null
  beginDate: string | null
  endDate: string | null
  interval: string | null
  savedData: string | null
  isCompact: boolean | null
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
