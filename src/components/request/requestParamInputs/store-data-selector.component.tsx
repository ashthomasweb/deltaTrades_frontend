import React from 'react'

type StoreDataSelectorProps = {
  requestType: string
}

export const StoreDataSelectorInput: React.FC<StoreDataSelectorProps> = ({ requestType }) => (
  <label className="save-data">
    {`${requestType === 'historical' ? 'Save Data' : 'Save Data On Close'}`}
    <input
      name="storeData"
      type="checkbox"
    />
  </label>
)
