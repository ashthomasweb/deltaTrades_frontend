import React, { useContext, useState } from 'react'
import './request-controls.scss'
import { MainContext } from '../../_context/MainContext'

interface RequestControlsProps {
  setParams: (e: React.FormEvent<HTMLFormElement>) => void
  requestType: string
}

export const RequestControls = ({ setParams, requestType }: RequestControlsProps) => {
  const {
    mainState: { savedData },
  } = useContext(MainContext)

  const [paramsDisabled, setParamsDisabled] = useState<boolean>(false)

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setParams(e)
  }

  const handleSavedDataChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParamsDisabled(e.target.value !== 'none')
  }

  return (
    <div className="request-controls-container">
      <form onSubmit={handleFormSubmit}>
        <section className="global-controls">
          <label className="controls-title">
            {`${requestType.substring(0, 1).toUpperCase()}${requestType.substring(1)} Controls`}
            <input
              name="type"
              value={requestType}
              readOnly
              className="hidden-title"
            ></input>
          </label>
          <div className="request-container">
            <label className="save-data">
              {`${requestType === 'historical' ? 'Save Data' : 'Save Data On Close'}`}
              <input
                name="storeData"
                type="checkbox"
              />
            </label>
            <button type="submit">Request</button>
          </div>
        </section>
        <section className="params-container">
          <div className="primary-controls">
            <label className={`${paramsDisabled ? 'isDisabled' : ''}`}>
              Ticker:
              <input
                name="symbol"
                type="text"
                placeholder="e.g. 'AAPL'"
              />
            </label>
            {requestType === 'historical' ? (
              <>
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
                <label className={`${paramsDisabled ? 'isDisabled' : ''}`}>
                  Month:
                  <input
                    name="month"
                    type="month"
                    placeholder="Month"
                  />
                </label>
              </>
            ) : null}
            {requestType === 'real-time' ? (
              <>
                <label className={`${paramsDisabled ? 'isDisabled' : ''}`}>
                  Backfill:
                  <select name="backfill">
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
                {/* <label className="bordered-label">
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
                </label> */}
              </>
            ) : null}
          </div>
          <div className="secondary-controls">
            {requestType === 'historical' ? (
              <>
                <label>
                  Saved Datasets
                  <select
                    name="savedData"
                    onChange={handleSavedDataChange}
                  >
                    <option
                      key={0}
                      value={'none'}
                    >
                      ------
                    </option>
                    {savedData.map(entry => (
                      <option
                        key={entry}
                        value={entry}
                      >
                        {entry}
                      </option>
                    ))}
                  </select>
                </label>

                <fieldset>
                  <label className={`${paramsDisabled ? 'isDisabled' : ''}`}>
                    Last 100 Ticks
                    <input
                      name="dataSize"
                      value="last-100"
                      type="radio"
                      radioGroup="dataset-size"
                    />
                  </label>
                  <label className={`${paramsDisabled ? 'isDisabled' : ''}`}>
                    Full Month
                    <input
                      name="dataSize"
                      value="full"
                      type="radio"
                      radioGroup="dataset-size"
                    />
                  </label>
                </fieldset>
              </>
            ) : null}

            <label className="bordered-label">
              Send to Queue
              <input
                name="sendToQueue"
                type="checkbox"
              />
            </label>

            {requestType === 'real-time' ? (
              <>
                <label className={`${paramsDisabled ? 'isDisabled' : ''}`}>
                  Algorithm:
                  <select name="algorithm">
                    <option value="volCOT">VolCOT</option>
                  </select>
                </label>
                <label className="bordered-label">
                  Enable Trading
                  <input
                    name="enableTrading"
                    type="checkbox"
                  />
                </label>
              </>
            ) : null}
          </div>
        </section>
      </form>
    </div>
  )
}

/**
 *
 * Global
 * -connect
 *
 * Historical
 * -symbol
 * -interval
 * -sendToQueue
 * -month
 * -compact
 * -isSaved => saved menu
 *
 *
 * RealTime
 * -symbol
 * -previous day => startDay menu
 *
 * -sendToQueue
 * -enableTrading
 *
 * -daysToBackfill => today + n menu
 *
 */
