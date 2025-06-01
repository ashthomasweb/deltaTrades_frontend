import React, { useContext } from 'react'
// import { MainContext } from '../../_context/MainContext'

type RequestParamInputProps = {
  paramsDisabled: boolean
}

export const TickerSymbolInput: React.FC<RequestParamInputProps> = ({ paramsDisabled }) => {
  //  const {
  //     mainState: {
  //       // contextValue: foo
  //     },
  //   } = useContext(MainContext)

  return (
    <label className={`${paramsDisabled ? 'isDisabled' : ''}`}>
      Ticker:
      <input
        name="symbol"
        type="text"
        placeholder="e.g. 'AAPL'"
      />
    </label>
  )
}
