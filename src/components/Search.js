import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = ({handleSearch}) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
        <div className="search-icon">
          <input type="text" placeholder="Search..." value = {searchTerm} className="search-input" onChange={(e)=> {setSearchTerm(e.target.value)}}/>
          <button onClick={() => {handleSearch(searchTerm);setSearchTerm("")}}><FontAwesomeIcon icon={faSearch} className="search-icon" /></button>
        </div> 
    </div>
  )
};

export default Search;
