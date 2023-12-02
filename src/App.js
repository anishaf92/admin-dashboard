// App.js
import React, { useState } from "react";
import './App.css';
import Search from './components/Search';
import Table from './components/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [refresh, setRefresh] = useState(false)

  const handleSearch = (searchText) => {
    setSearchTerm(searchText);
  };

  const handleDeleteSelectedRows = () => {
    // Implement the logic to delete the selected rows
    console.log("Deleting rows:", selectedRows);
    setRefresh(!refresh)

  };

  const onSelectedRowsChange = (rows, callback) => {
    setSelectedRows(rows);
    if (callback) {
      callback(); // Perform additional actions after updating selected rows
    }
  };


  return (
    <div>
      <h2 className="heading">Admin Dashboard</h2>
      <div className="header">
        <Search handleSearch={handleSearch} />
        <button onClick={handleDeleteSelectedRows}>
          <FontAwesomeIcon icon={faTrashAlt} title="Delete" />
        </button>
      </div>
      <Table
        searchText={searchTerm}
        onSelectedRowsChange={onSelectedRowsChange}
        rowsToDelete={selectedRows}
        refresh={refresh} 
      />
    </div>
  );
}

export default App;
