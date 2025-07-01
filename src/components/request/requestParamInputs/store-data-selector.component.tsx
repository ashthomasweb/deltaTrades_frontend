import React from 'react'

type StoreDataSelectorProps = {
  requestType: string
  paramsDisabled: boolean
}

export const StoreDataSelectorInput: React.FC<StoreDataSelectorProps> = ({ requestType, paramsDisabled }) => (
  <label className={`save-data ${paramsDisabled ? 'isDisabled' : ''}`}>
    {`${requestType === 'historical' ? 'Save Data' : 'Save Data On Close'}`}
    <input
      name="primaryParam_storeData"
      type="checkbox"
    />
  </label>
)
