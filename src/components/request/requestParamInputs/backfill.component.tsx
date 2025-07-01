import React from 'react'

export const BackFillInput: React.FC = () => (
  <label>
    Backfill:
    <select name="primaryParam_backfill">
      <option value="today">Today</option>
      <option value="1">1 Day</option>
      <option value="2">2 Days</option>
      <option value="3">3 Days</option>
      <option value="4">4 Days</option>
      <option value="5">5 Days</option>
      <option value="6">6 Days</option>
      <option value="7">7 Days</option>
      <option value="8">8 Days</option>
      <option value="9">9 Days</option>
      <option value="10">10 Days</option>
    </select>
  </label>
)
