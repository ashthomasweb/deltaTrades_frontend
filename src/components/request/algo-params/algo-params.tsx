import React, { useState } from 'react'
import { LabeledNumberInput } from '@components/request/generic-inputs/number-input'
import './algo-params.scss'

export const AlgoParams: React.FC = () => {
  const [currentNoiseFunction, setCurrentNoiseFunction] = useState<string>('NW1') // TODO: Create literal type...

  return (
    <div className="algo-param-container">
      <div className="param-section-wrapper noise-window">
        <h3>Noise Window</h3>
        <label>
          Window Function:
          <select
            name="algoParam_noiseWindow"
            onChange={e => setCurrentNoiseFunction(e.target.value)}
          >
            <option value="NW1">NW1</option>
            <option value="NW2">NW2</option>
            <option value="NW3">NW3</option>
            <option value="NW4">NW4</option>
            <option value="NW5">NW5</option>
            <option value="NW6">NW6</option>
          </select>
        </label>
        <LabeledNumberInput
          label="Window Length"
          name="algoParam_noiseWindowLength"
          min={1}
          max={100}
          step={1}
          defaultValue={7}
          title={
            'Higher values are more strict.\n\nNumber of candles used in each analysis window when checking for noise/chop behavior.\n\nEach window is scored using the selected Noise Window logic.'
          }
        />
        <LabeledNumberInput
          label="Atr Mult."
          name="algoParam_atrMultiplier"
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
          name="algoParam_altThreshold"
          min={0}
          max={1}
          step={0.01}
          defaultValue={0.6}
          title={
            'Lower values are more strict.\n\nMeasures how often candle direction alternates between green/red within the noise window.\n\nHigher values catch more back-and-forth movement.\nExample: 0.6 means ~60% of the candles must alternate direction.'
          }
        />
        <LabeledNumberInput
          label="Hugging Ratio"
          name="algoParam_hugRatio"
          min={0}
          max={1}
          step={0.01}
          defaultValue={0.7}
          title={
            'Higher values are more strict.\n\nRatio of candles within the window that are "hugging" the moving average line.\n\nA candle is considered hugging if its body center or wick intersects a threshold band around the MA.\n\nHigher values mean more candles must be tightly clustered near the average.'
          }
        />
        <LabeledNumberInput
          label="Compression Body Multiplier"
          name="algoParam_compBodyMult"
          min={0}
          max={1}
          step={0.01}
          defaultValue={0.25}
          title={
            'Lower values are more strict.\n\nControls how small a candle body must be (relative to ATR) to be considered compressed.\n\nThis multiplier is applied to the average true range to define the threshold.\nExample: 0.25 means the body must be smaller than 25% of ATR.'
          }
          disabled={currentNoiseFunction !== 'NW6'}
        />
        <LabeledNumberInput
          label="Compression Fullness Threshold"
          name="algoParam_compFullThresh"
          min={0}
          max={100}
          step={1}
          defaultValue={15}
          title={
            'Lower values are more strict.\n\nMeasures how much of the candle is body vs wick.\n\nExpressed as a percentage: lower values indicate long wicks and small bodies (e.g. doji-like candles).\n\nExample: 15 means the body is only 15% or less of the total candle size.'
          }
          disabled={currentNoiseFunction !== 'NW6'}
        />
      </div>

      {
        // Time range // RETHINKING - If an algo is working on very specific days, it's inherently unstable over realTime trading. I was thinking the purpose of having this input was to ease the analysis flow... but the persistent timescale acheives that. I believe this should be RETIRED
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
          label="Simple Moving Average Period 1"
          name="algoParam_sma1Period"
          min={3}
          max={100}
          step={1}
          defaultValue={7}
          title={
            'The number of ticks used to find average price.\n\nNOTE: Averages per tick, not per minute. Contingent on the interval the dataset is built in.'
          }
        />
        <LabeledNumberInput
          label="Simple Moving Average Period 2"
          name="algoParam_sma2Period"
          min={3}
          max={100}
          step={1}
          defaultValue={7}
          title={
            'The number of ticks used to find average price.\n\nNOTE: Averages per tick, not per minute. Contingent on the interval the dataset is built in.'
          }
        />
        <LabeledNumberInput
          label="Exponential Moving Average Period 1"
          name="algoParam_ema1Period"
          min={3}
          max={100}
          step={1}
          defaultValue={9}
          title={
            'The number of ticks used to find exponential average price.\n\nNOTE: Averages per tick, not per minute. Contingent on the interval the dataset is built in.'
          }
        />
        <LabeledNumberInput
          label="Exponential Moving Average Period 2"
          name="algoParam_ema2Period"
          min={3}
          max={100}
          step={1}
          defaultValue={21}
          title={
            'The number of ticks used to find exponential average price.\n\nNOTE: Averages per tick, not per minute. Contingent on the interval the dataset is built in.'
          }
        />
        <label>
          Avg. Type
          <select name="algoParam_maAvgType">
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
          name="algoParam_singleDirMin"
          min={3}
          max={10}
          step={1}
          defaultValue={4}
          title={'Minimum number of sequential candles, including opposing directions under threshold'}
        />
        <LabeledNumberInput
          label="Opposing threshold"
          name="algoParam_oppThreshold"
          min={0}
          max={1}
          step={0.01}
          defaultValue={0.18}
          title={'Decimal percentage value of opposing direction movement relative to total movement.'}
        />
      </div>

      <div className="param-section-wrapper single-dir">
        <h3>Confirmation Indicators</h3>
        <LabeledNumberInput
          label="RSI Period"
          name="algoParam_rsiPeriod"
          min={0}
          max={100}
          step={1}
          defaultValue={14}
          title={''}
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
          name="algoParam_minCandleBodyDist"
          min={0}
          max={100}
          step={1}
          defaultValue={15}
          title={'Minimum statistical distribution 0 - 100 of candlestick body value.'}
        />
      </div>

      <div className="param-section-wrapper ma-crossing-algo">
        <h3>Trend Detection</h3>
        <LabeledNumberInput
          label="Slope Period Raw Price"
          name="algoParam_slopePeriodByRawPrice"
          min={1}
          max={100}
          step={1}
          defaultValue={5}
          title={''}
        />
        <LabeledNumberInput
          label="Slope Period SMA"
          name="algoParam_slopePeriodBySMA"
          min={1}
          max={100}
          step={1}
          defaultValue={20}
          title={''}
        />
        <LabeledNumberInput
          label="Slope Period EMA"
          name="algoParam_slopePeriodByEMA"
          min={1}
          max={100}
          step={1}
          defaultValue={12}
          title={''}
        />
        <LabeledNumberInput
          label="ADX Period"
          name="algoParam_adxPeriod"
          min={1}
          max={100}
          step={1}
          defaultValue={14}
          title={''}
        />
      </div>

      <div className="param-section-wrapper macd">
        <h3>MACD Periods</h3>
        <LabeledNumberInput
          label="MACD Short Period"
          name="algoParam_macdShortPeriod"
          min={1}
          max={100}
          step={1}
          defaultValue={12}
          title={''}
        />
        <LabeledNumberInput
          label="MACD Long Period"
          name="algoParam_macdLongPeriod"
          min={1}
          max={100}
          step={1}
          defaultValue={26}
          title={''}
        />
        <LabeledNumberInput
          label="MACD Signal Period"
          name="algoParam_macdSignalPeriod"
          min={1}
          max={100}
          step={1}
          defaultValue={9}
          title={''}
        />
      </div>

      <div className="param-section-wrapper volumeTrend">
        <h3>Volume Trend</h3>
        <LabeledNumberInput
          label="Volume Trend Lookback"
          name="algoParam_volumeTrendLookback"
          min={1}
          max={100}
          step={1}
          defaultValue={5}
          title={''}
        />
        <LabeledNumberInput
          label="Volume Min Trend"
          name="algoParam_volumeTrendMinTrend"
          min={0}
          max={3}
          step={0.01}
          defaultValue={0.65}
          title={''}
        />
        <LabeledNumberInput
          label="Volume Trend Min Surge"
          name="algoParam_volumeTrendMinSurge"
          min={0}
          max={5}
          step={0.01}
          defaultValue={1.2}
          title={''}
        />
      </div>

      <div className="param-section-wrapper bearish-bullish-candle-signals">
        <h3>Candle Signals</h3>
        <LabeledNumberInput
          label="Bearish Engulfish Tolerance"
          name="algoParam_bearEngTolerance"
          min={0}
          max={1}
          step={0.001}
          defaultValue={0.005}
          title={''}
        />
        <LabeledNumberInput
          label="Bullish Exhaustion Threshold"
          name="algoParam_bullExhThreshold"
          min={1}
          max={5}
          step={0.1}
          defaultValue={2}
          title={''}
        />
      </div>
    </div>
  )
}
