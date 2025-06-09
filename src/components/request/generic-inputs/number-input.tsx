import React from 'react'
import './number-input.scss'

type LabeledNumberInputProps = {
  label: string
  name: string
  defaultValue: number | undefined
  min: number
  max: number
  step: number
  title: string | undefined
}

export const LabeledNumberInput: React.FC<Partial<LabeledNumberInputProps>> = ({
  label,
  name,
  defaultValue,
  min,
  max,
  step,
  title,
}) => (
  <label title={title}>
    {label}
    <input
      type="number"
      name={name}
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue}
    />
  </label>
)
