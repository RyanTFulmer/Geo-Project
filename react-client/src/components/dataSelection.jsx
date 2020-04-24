import React from 'react';

const DataSelection = (props) => {
  console.log('props.state in datadelection', props.state.indexes);
  return (
    <div>
      Data Selection
      <select onChange={props.handleDataChange}>
        <option value="none" selected disabled hidden>
          Select an Option
        </option>
        {props.state.indexes.map((databaseOption) => {
          return (
            <option value={databaseOption.dataName}>
              {databaseOption.dataName}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default DataSelection;
