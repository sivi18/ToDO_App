import React from "react";
import { VscSettings } from "react-icons/vsc";

function FilterTodo({ filter, handleFilterChange }) {
  return (
    <div className="mt-2">
      <label
        htmlFor="filter"
        className="flex text-white p-2 gap-1 bg-blue-600 backdrop-blur-sm backdrop-filter bg-opacity-10 rounded-lg"
      >
        <VscSettings size={25} />
        Filter
        <select
          id="filter"
          className="bg-transparent outline-none border-none"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="0">Active</option>
          <option value="1">Completed</option>
        </select>
      </label>
    </div>
  );
}

export default FilterTodo;
