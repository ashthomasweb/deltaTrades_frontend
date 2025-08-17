import React from 'react'

export const GetPreviousInput: React.FC = () => (
  <label className="bordered-label">
    Previous Day
    <input
      name="primaryParam_getPreviousDay"
      type="checkbox"
    />
    <input
      name="primaryParam_beginDate"
      type="datetime-local"
      placeholder="Begin Date"
    />
  </label>
)
