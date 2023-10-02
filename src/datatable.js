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
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
      // Hide the delete button when any row is selected
      if (selectedRows.data.length > 0) {
        return null;
      } else {
        // You can customize the toolbar as needed when no rows are selected
        return (
          <div>
            <button onClick={handleAdd}>Add</button>
            <button onClick={handleUpdate} id="openPopupBtn">
              Update
            </button>
          </div>
        );
      }
    },
  };
  const handleClose = () => {
    setState({ ...state, onUpdate: false });
  };

  //on page load
  useEffect(() => {
    setState({ ...state, data: data, columns: columns });
  }, []);
  return (
    <div className="custom-mui-table-container">
      
      <MUIDataTable
        data={state.data}
        columns={state.columns}
        options={options}
        classes={{ root: 'custom-mui-table' }}
      />

      <div className="custom-buttons">
      <button onClick={handleFetch} className="fetch-button">
        Fetch
      </button>
        <button onClick={handleAdd} >Add</button>
        <button onClick={handleUpdate} id="openPopupBtn">
          Update
        </button>
        <button onClick={handleDelete} className="delete-button">Delete</button>
      </div>

      <div>
        <div className={`popup ${state.onUpdate ? 'active' : ''}`} id="popup">
          <div className="popup-content">
            <span
              className="close-popup-btn"
              id="closePopupBtn"
              onClick={handleClose}
            >
              &times;
            </span>
            <h2> Popup</h2>
            <p>This is the content of the popup.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
