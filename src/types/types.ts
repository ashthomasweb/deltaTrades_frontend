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
  '1. Information': string
  '2. Symbol': string
  '3. Last Refreshed': string
  '4. Interval': string
  '5. Output Size': string
  '6. Time Zone': string
}

export interface TradierMetaDataType {
  information: string
  symbol: string
  last_refreshed: string
  interval: string
  // '6. Time Zone': string
}

export interface ChartHeaderType {
  headingData: {
    title: string
    isConnected: boolean
  }
  metaData: AlphaVantageMetaDataType | TradierMetaDataType | null
}

// export interface RequestType {
//     requestType: string
// }
