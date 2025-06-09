import React, { useContext } from 'react'
import { MainContext } from '../../../_context/MainContext'

type SavedDatasetProps = {
  handleSavedDataChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const SavedDatasetsInput: React.FC<SavedDatasetProps> = ({ handleSavedDataChange }) => {
  const {
    mainState: { savedData },
  } = useContext(MainContext)

  return (
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
  )
}
