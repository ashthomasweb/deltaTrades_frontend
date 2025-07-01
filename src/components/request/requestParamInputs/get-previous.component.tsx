import React from 'react'

export const GetPreviousInput: React.FC = () => (
  <label className="bordered-label">
    Previous Day
    <input
      name="primaryParam_getPrevious"
      type="checkbox"
    />
    <input
      name="primaryParam_beginDate"
      type="datetime-local"
      placeholder="Begin Date"
    />
  </label>
)
