import React from 'react'

type RequestParamInputProps = {
  paramsDisabled: boolean
}

export const IntervalInput: React.FC<RequestParamInputProps> = ({ paramsDisabled }) => (
  <label className={`${paramsDisabled ? 'isDisabled' : ''}`}>
    Interval:
    <select name="interval">
      <option value="1min">1min</option>
      <option value="5min">5min</option>
      <option value="15min">15min</option>
      <option value="30min">30min</option>
      <option value="60min">60min</option>
    </select>
  </label>
)
