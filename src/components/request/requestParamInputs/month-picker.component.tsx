import React from 'react'

type RequestParamInputProps = {
  paramsDisabled: boolean
}

export const MonthPickerInput: React.FC<RequestParamInputProps> = ({ paramsDisabled }) => (
  <label className={`${paramsDisabled ? 'isDisabled' : ''}`}>
    Month:
    <input
      name="month"
      type="month"
      placeholder="Month"
    />
  </label>
)
