import React, { useContext } from 'react'
import './request-controls.scss'
// import { RequestType } from '../../types/types'
import { MainContext } from '../../_context/MainContext'

interface RequestControlsProps {
  setParams: (e: React.FormEvent<HTMLFormElement>) => void
  requestType: string
}

export const RequestControls = ({ setParams, requestType }: RequestControlsProps) => {
  const {
    mainState: { savedData },
  } = useContext(MainContext)

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setParams(e)
  }

  return (
    <div className="request-controls-container">
      <form onSubmit={handleFormSubmit}>
        <label style={{ border: 'none', fontSize: 20, width: 100, height: 24, fontWeight: 700 }}>
          {requestType}
          <input
            name="type"
            value={requestType}
            readOnly
            style={{ visibility: 'hidden' }}
          ></input>
        </label>
        <input
          name="symbol"
          type="text"
          placeholder="Ticker"
        />
        {requestType === 'real-time' ? (
          <input
            name="beginDate"
            type="date"
            placeholder="Begin Date"
          />
        ) : null}
        <input
          name="endDate"
          type="date"
          placeholder="End Date"
        />
        {requestType === 'historical' ? (
          <>
            <select name="savedData">
              {savedData.map(entry => (
                <option
                  key={entry}
                  value={entry}
                >
                  {entry}
                </option>
              ))}
            </select>

            <label>
              Request Compact Data:{' '}
              <input
                name="isCompact"
                type="checkbox"
              />
            </label>
          </>
        ) : null}

        <select name="interval">
          <option value="1min">1min</option>
          <option value="5min">5min</option>
          <option value="15min">15min</option>
          <option value="30min">30min</option>
          <option value="60min">60min</option>
        </select>
        <button type="submit">Request</button>
      </form>
    </div>
  )
}
