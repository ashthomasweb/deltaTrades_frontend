import React, { useContext } from 'react'
import { MainContext } from '../../../_context/MainContext'

type SavedDatasetProps = {
  handleSavedDataChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const SavedDatasetsInput: React.FC<SavedDatasetProps> = ({ handleSavedDataChange }) => {
  const {
    mainState: { storedDataFilenames },
  } = useContext(MainContext)

  return (
    <label>
      Saved Datasets
      <select
        name="primaryParam_requestedStoredDataFilename"
        onChange={handleSavedDataChange}
      >
        <option
          key={0}
          value={'none'}
        >
          ------
        </option>
        {storedDataFilenames.map(entry => (
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
