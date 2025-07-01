import React from 'react'

type RequestParamInputProps = {
  paramsDisabled: boolean
}

export const LastFullRadio: React.FC<RequestParamInputProps> = ({ paramsDisabled }) => (
  <fieldset>
    <label className={`${paramsDisabled ? 'isDisabled' : ''}`}>
      Last 100 Ticks
      <input
        name="primaryParam_dataSize"
        value="last-100"
        type="radio"
        radioGroup="dataset-size"
      />
    </label>
    <label className={`${paramsDisabled ? 'isDisabled' : ''}`}>
      Full Month
      <input
        name="primaryParam_dataSize"
        value="full"
        type="radio"
        radioGroup="dataset-size"
      />
    </label>
  </fieldset>
)
