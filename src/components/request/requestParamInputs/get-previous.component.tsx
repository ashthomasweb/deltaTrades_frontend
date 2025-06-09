import React from 'react'

export const GetPreviousInput: React.FC = () => (
  <label className="bordered-label">
    Previous Day
    <input
      name="getPrevious"
      type="checkbox"
    />
    <input
      name="beginDate"
      type="datetime-local"
      placeholder="Begin Date"
    />
  </label>
)
