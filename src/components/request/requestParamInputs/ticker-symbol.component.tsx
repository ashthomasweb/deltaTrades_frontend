import React from 'react'

type RequestParamInputProps = {
  paramsDisabled: boolean
}

export const TickerSymbolInput: React.FC<RequestParamInputProps> = ({ paramsDisabled }) => (
  <label className={`${paramsDisabled ? 'isDisabled' : ''}`}>
    Ticker:
    <input
      name="primaryParam_symbol"
      type="text"
      placeholder="e.g. 'AAPL'"
    />
  </label>
)
