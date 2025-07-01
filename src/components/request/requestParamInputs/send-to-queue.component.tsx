import React from 'react'

export const SendToQueueInput: React.FC = () => (
  <label className="bordered-label">
    Send to Queue
    <input
      name="primaryParam_sendToQueue"
      type="checkbox"
    />
  </label>
)
