import React from 'react'
import './algo-params.scss'
import { LabeledNumberInput } from '../generic-inputs/number-input'

export const AlgoParams: React.FC = () => (
  <div className="algo-param-container">
    <div className="param-section-wrapper noise-window">
      <h3>Noise Window</h3>
      <label>
        Window Function:
        <select name="noiseWindow">
          <option value="NW1">NW1</option>
          <option value="NW2">NW2</option>
          <option value="NW3">NW3</option>
          <option value="NW4">NW4</option>
        </select>
      </label>
      <LabeledNumberInput
        label="Window Length"
        name="noiseWindowLength"
        min={1}
        max={100}
        step={1}
        defaultValue={7}
        title={''}
      />
      <LabeledNumberInput
        label="Atr Mult."
        name="atrMultiplier"
        min={0}
        max={1}
        step={0.01}
        defaultValue={0.5}
        title={
          'Lower values are less strict.\n\nAverage True Range Multiplier:\nFinds avg range of ticks within window, and creates threshold based on passed multiplier value.'
        }
      />
      <LabeledNumberInput
        label="Alternation Threshold"
        name="altThreshold"
        min={0}
        max={1}
        step={0.01}
        defaultValue={0.6}
        title={''}
      />
      <LabeledNumberInput
        label="Hugging Ratio"
        name="hugRatio"
        min={0}
        max={1}
        step={0.01}
        defaultValue={0.7}
        title={''}
      />
    </div>

    {
      // Time range // RETHINKING - If an algo is working on very specific days, it's inherently unstable over real-time trading. I was thinking the purpose of having this input was to ease the analysis flow... but the persistent timescale acheives that. I believe this should be RETIRED
      // backfill
      // Day group?
    }

    {
      // Moving Avg
      // period
      // avgType
    }

    <div className="param-section-wrapper moving-avg">
      <h3>Moving Average</h3>
      <LabeledNumberInput
        label="Averaging Period"
        name="avgPeriod"
        min={3}
        max={100}
        step={1}
        defaultValue={7}
        title={
          'The number of ticks used to find average price.\n\nNOTE: Averages per tick, not per minute. Contingent on the interval the dataset is built in.'
        }
      />
      <label>
        Avg. Type
        <select name="maAvgType">
          <option
            title={'Uses the closing price'}
            value={'default'}
          >
            Close (Default)
          </option>
          <option
            title={'Needs description'}
            value={'typicalPrice'}
          >
            Typical Price
          </option>
          <option
            title={'Needs description'}
            value={'OHLC'}
          >
            OHLC
          </option>
        </select>
      </label>
    </div>

    {
      // Single direction blocks
      // sequence minimum
      // threshold
    }

    <div className="param-section-wrapper single-dir">
      <h3>Find Single Direction</h3>
      <LabeledNumberInput
        label="Sequence Min"
        name="singleDirMin"
        min={3}
        max={10}
        step={1}
        defaultValue={4}
        title={'Minimum number of sequential candles, including opposing directions under threshold'}
      />
      <LabeledNumberInput
        label="Opposing threshold"
        name="oppThreshold"
        min={0}
        max={1}
        step={0.01}
        defaultValue={0.18}
        title={'Decimal percentage value of opposing direction movement relative to total movement.'}
      />
    </div>

    {
      // Crossing algo
      // candleBodyDistribution
    }

    <div className="param-section-wrapper ma-crossing-algo">
      <h3>MA Crossing</h3>
      <LabeledNumberInput
        label="Candle Body Distribution Min Threshold"
        name="minCandleBodyDist"
        min={0}
        max={100}
        step={1}
        defaultValue={15}
        title={'Minimum statistical distribution 0 - 100 of candlestick body value.'}
      />
    </div>
  </div>
)
