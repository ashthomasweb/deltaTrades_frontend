import React, { useState, useRef } from 'react'
import './request-controls.scss'

interface RequestControlsType {
  setParams: any
}

export const RequestControls: React.FC<RequestControlsType> = (props) => {
  const [selectedInterval, setSelectedInterval] = useState('15min')
  const [requestParams, setRequestParams] = useState<RequestParams | null>(null)

  const tickerRef = useRef<HTMLInputElement | null>(null)
  const beginDateRef = useRef<HTMLInputElement | null>(null)
  const endDateRef = useRef<HTMLInputElement | null>(null)
  const intervalRef = useRef<HTMLSelectElement | null>(null)
  const paramFormRef = useRef<HTMLFormElement | null>(null)

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const elem = e.target as HTMLSelectElement
    if (elem) {
      console.log(elem.value)
    }
  }

  return (
    <div className="request-controls-container">
      <form ref={paramFormRef} onSubmit={(e) => props.setParams(e, paramFormRef)} >
        <input name='symbol' ref={tickerRef} type="text" placeholder="Ticker"></input>
        <input name='beginDate' ref={beginDateRef} type="date" placeholder="Begin Date" />
        <input name='endDate' ref={endDateRef} type="date" placeholder="End Date" />
        <select name='interval' ref={intervalRef}>
          <option value="1min">1min</option>
          <option value="10min">10min</option>
          <option value="15min">15min</option>
          <option value="60min">60min</option>
        </select>
        <button type="submit" >
          Request
        </button>
      </form>
    </div>
  )
}
