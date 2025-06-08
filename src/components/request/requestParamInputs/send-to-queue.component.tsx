import React from 'react'

export const SendToQueueInput: React.FC = () => (
  <label className="bordered-label">
    Send to Queue
    <input
      name="sendToQueue"
      type="checkbox"
    />
  </label>
)
