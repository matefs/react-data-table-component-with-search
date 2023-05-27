import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const data = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
  { id: 3, name: 'John Smith' },
  { id: 4, name: 'Jane Smith' },
];

const columns = [
  {
    name: 'ID',
    selector: 'id',
    sortable: true,
  },
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
  },
];

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [tableColumns, setTableColumns] = useState(columns);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={handleSearch}
      />
      <DataTable
        title="Users"
        data={filteredData}
        columns={tableColumns}
        pagination
      />
    </div>
  );
};

export default App;
