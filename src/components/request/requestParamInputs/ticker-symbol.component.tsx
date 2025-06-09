import React from 'react'

type RequestParamInputProps = {
  paramsDisabled: boolean
}

export const TickerSymbolInput: React.FC<RequestParamInputProps> = ({ paramsDisabled }) => (
  <label className={`${paramsDisabled ? 'isDisabled' : ''}`}>
    Ticker:
    <input
      name="symbol"
      type="text"
      placeholder="e.g. 'AAPL'"
    />
  </label>
)
