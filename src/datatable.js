import 'bootstrap/dist/css/bootstrap.min.css';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import './App.css';
import { columns, data } from './data';

let newArr = [];
export default function Datatable() {
  const [state, setState] = useState({
    data: [],
    columns: [],
    selectedRows: [],
    onUpdate: false,
  });

  const getRows = (row) => {
    newArr.push(row);
    setState({ ...state, selectedRows: newArr });
  };
  const handleFetch = () => {
    setState({ ...state, data: data, columns: columns });
  };
  const handleAdd = () => {};
  const handleUpdate = () => {
    setState({ ...state, onUpdate: true });
  };
  const handleDelete = () => {
    console.log(state.selectedRows);
    let rIndex = state.selectedRows['dataIndex'];
    console.log(rIndex);
  };
  const options = {
    filterType: 'checkbox',
    onRowSelectionChange: getRows,
  };
  const handleClose = () => {
    setState({ ...state, onUpdate: false });
  };
  //on page load
  useEffect(() => {
    setState({ ...state, data: data, columns: columns });
  }, []);
  return (
    <div>
      <button onClick={handleFetch}>Fetch</button>

      <MUIDataTable
        title={'Table'}
        data={state.data}
        columns={state.columns}
        options={options}
      />
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleUpdate} id="openPopupBtn">
        Update
      </button>
      <button onClick={handleDelete}>Delete</button>

      <div>
        {state.onUpdate && (
          <div id="popup" class="popup">
            <div class="popup-content">
              <span
                id="closePopupBtn"
                class="close-popup-btn"
                onClick={handleClose}
              >
                &times;
              </span>
              <h2>Popup Content</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
