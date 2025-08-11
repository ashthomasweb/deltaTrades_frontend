import React, { useState } from 'react'
import './request-controls.scss'
import { TickerSymbolInput } from '../requestParamInputs/ticker-symbol.component'
import { IntervalInput } from '../requestParamInputs/interval.component'
import { MonthPickerInput } from '../requestParamInputs/month-picker.component'
import { GetPreviousInput } from '../requestParamInputs/get-previous.component'
import { BackFillInput } from '../requestParamInputs/backfill.component'
import { SavedDatasetsInput } from '../requestParamInputs/saved-datasets.component'
import { LastFullRadio } from '../requestParamInputs/last-full-radio.component'
import { SendToQueueInput } from '../requestParamInputs/send-to-queue.component'
import { AlgoSelectInput } from '../requestParamInputs/algo-select.component'
import { EnableTradingInput } from '../requestParamInputs/enable-trading.component'
import { StoreDataSelectorInput } from '../requestParamInputs/store-data-selector.component'

interface RequestControlsProps {
  requestType: string
}

export const RequestControls = ({ requestType }: RequestControlsProps) => {
  const [paramsDisabled, setParamsDisabled] = useState<boolean>(false)

  const handleSavedDataChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParamsDisabled(e.target.value !== 'none')
  }

  return (
    <div className="request-controls-container">
      <div className="inner-container">
        <section className="global-controls">
          <label className="controls-title">
            {`${requestType.substring(0, 1).toUpperCase()}${requestType.substring(1)} Controls`}
            {/* This input is hidden - it contains the requestType to be destructured from the form values */}
            <input
              name="primaryParam_requestType" // TODO: Standardize?
              value={requestType} // TODO: Standardize?
              readOnly
              className="hidden-title"
            ></input>
          </label>
          <div className="submit-container">
            {requestType.match(/historical|real-time/) ? (
              <StoreDataSelectorInput
                requestType={requestType}
                paramsDisabled={paramsDisabled}
              />
            ) : null}
            <button type="submit">Request</button>
          </div>
        </section>

        <section className="params-container">
          {/* Left-hand column */}
          <div className="primary-controls">
            {requestType === 'historical' ? (
              <>
                <TickerSymbolInput paramsDisabled={paramsDisabled} />
                <IntervalInput paramsDisabled={paramsDisabled} />
                <MonthPickerInput paramsDisabled={paramsDisabled} />
              </>
            ) : null}
            {requestType === 'real-time' ? (
              <>
                <TickerSymbolInput paramsDisabled={paramsDisabled} />
                <IntervalInput paramsDisabled={paramsDisabled} />
                <BackFillInput />
                <GetPreviousInput />
              </>
            ) : null}
            {requestType === 'analysis' ? (
              <>
                <SavedDatasetsInput handleSavedDataChange={handleSavedDataChange} />
                <AlgoSelectInput />
              </>
            ) : null}
          </div>

          {/* Right-hand column */}
          <div className="secondary-controls">
            {requestType === 'historical' ? (
              <>
                <SavedDatasetsInput handleSavedDataChange={handleSavedDataChange} />
                <LastFullRadio paramsDisabled={paramsDisabled} />
              </>
            ) : null}

            {requestType === 'real-time' ? (
              <>
                <AlgoSelectInput />
                <SendToQueueInput />
                <EnableTradingInput />
              </>
            ) : null}

            {requestType === 'analysis' ? (
              <>{/* <AlgoParams /> // This has been moved next to Candlestick Chart */}</>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  )
}
