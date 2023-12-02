// Table.js

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import Pagination from "./Pagination";

const Table = ({ searchText, onSelectedRowsChange, rowsToDelete, refresh }) => {
  const [originalUserData, setOriginalUserData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [totalRows, setTotalRows] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editedValues, setEditedValues] = useState({});
  const [editingRows, setEditingRows] = useState({});

  const filterData = () => {
    return originalUserData.filter(user =>
      Object.values(user).some(value =>
        String(value).toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
        const data = await response.json();
        setOriginalUserData(data);
        setUserData(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
        setTotalRows(indexOfLastItem-indexOfFirstItem)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [searchText]);

  useEffect(() => {
    if (searchText !== "") {
      const result = filterData();
      const sortedResult = result.sort((a, b) => a.id - b.id);
      setUserData(sortedResult);
      setTotalRows(sortedResult.length)
      
    } else {
      const sortedOriginalUserData = originalUserData.sort((a, b) => a.id - b.id);
      setUserData(sortedOriginalUserData);
      setTotalPages(Math.ceil(sortedOriginalUserData.length / itemsPerPage));
      setTotalRows(sortedOriginalUserData.length)
    }
    // eslint-disable-next-line
  }, [searchText, originalUserData]);




  useEffect(() => {
    if (rowsToDelete.length !== 0) {
      const updatedUserData = userData.filter((user) => !rowsToDelete.includes(user.id));
      setUserData(updatedUserData);
      setSelectedRows([]);
      onSelectedRowsChange([]); // Notify the parent component about the selected rows
      setTotalRows(updatedUserData.length)
      
    }
    // eslint-disable-next-line
  }, [refresh]);

  // Logic to calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
 
  // Handle header checkbox change
// Handle header checkbox change
// Handle header checkbox change
const handleHeaderCheckboxChange = () => {
  setSelectAll(!selectAll);
  if (!selectAll) {
    const newSelectedRows = currentItems.map((user) => user.id);
    setSelectedRows(newSelectedRows);
    onSelectedRowsChange(newSelectedRows);
  } else {
    setSelectedRows([]);
    onSelectedRowsChange([]);
  }
};



  // Handle row checkbox change
  const handleRowCheckboxChange = (id) => {
    const index = selectedRows.indexOf(id);
    let updatedSelectedRows;
    
    if (index === -1) {
      updatedSelectedRows = [...selectedRows, id];
    } else {
      updatedSelectedRows = [...selectedRows];
      updatedSelectedRows.splice(index, 1);
    }
    
    setSelectedRows(updatedSelectedRows);
  
    // Notify the parent component about the selected rows with the updated value directly
    onSelectedRowsChange(updatedSelectedRows);
  };
  const handleEditClick = (id) => {
    setEditingRows({ ...editingRows, [id]: true });
  };

  // Handle save button click
  const handleSaveClick = (id) => {
    // Check if any field is empty in the edited values
    if (
      editedValues[id]?.name === "" ||
      editedValues[id]?.email === "" ||
      editedValues[id]?.role === ""
    ) {
      alert("Fields cannot be empty");
      setEditingRows({ ...editingRows, [id]: true });
    } else {
      // Update the local state with edited values for the specific row
      const updatedUserData = userData.map((user) => {
        if (user.id === id) {
          return { ...user, ...editedValues[id] };
        }
        return user;
      });
      setUserData(updatedUserData);
  
      // Exit edit mode for the specific row
      setEditingRows({ ...editingRows, [id]: false });
    }
  };
  
  
  // Handle delete button click
  const handleDeleteClick = (id) => {
    const updatedUserData = userData.filter(user => user.id !== id);
    setUserData(updatedUserData);
    
  };

  return (
    <div>
      <table id="users">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={() => handleHeaderCheckboxChange()}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((user, id) => (
              <tr key={id} className={selectedRows.includes(user.id) ? 'selected-row' : ''}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(user.id)}
                    onChange={() => handleRowCheckboxChange(user.id)}
                  />
                </td>
                <td>
                  {editingRows[user.id] ? (
                    <input
                      type="text"
                      value={editedValues[user.id]?.name !== undefined ? editedValues[user.id]?.name : user.name}
                      onChange={(e) => setEditedValues({ ...editedValues, [user.id]: { ...editedValues[user.id], name: e.target.value } })}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editingRows[user.id] ? (
                    <input
                      type="text"
                      value={editedValues[user.id]?.email !== undefined ? editedValues[user.id]?.email : user.email}
                      onChange={(e) => setEditedValues({ ...editedValues, [user.id]: { ...editedValues[user.id], email: e.target.value } })}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editingRows[user.id] ? (
                    <input
                      type="text"
                      value={editedValues[user.id]?.role !== undefined ? editedValues[user.id]?.role : user.role}
                      onChange={(e) => setEditedValues({ ...editedValues, [user.id]: { ...editedValues[user.id], role: e.target.value } })}
                    />
                  ) : (
                    user.role
                  )}
                </td>
                <td>
                  {editingRows[user.id] ? (
                    <button className="save" onClick={() => handleSaveClick(user.id)}>
                       <FontAwesomeIcon icon={faSave} title="Save" />
                    </button>
                  ) : (
                    <button className="edit" onClick={() => handleEditClick(user.id)}>
                      <FontAwesomeIcon icon={faEdit} title="Edit" />
                    </button>
                  )}
                  <button className="delete" onClick={() => handleDeleteClick(user.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} title="Delete" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
  
      </table>
      <div className="footer">
      <div className="status">
        {selectedRows.length !== 0 ? <span>{selectedRows.length} of {totalRows} selected </span> : <span>No rows selected</span>}
      </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />

      </div>
    </div>
  );
};

export default Table;
