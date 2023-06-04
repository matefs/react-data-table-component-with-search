import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'ID',
    selector: 'id',
    sortable: true,
  },
  {
    name: 'Nome',
    selector: 'nome',
    sortable: true,
  },
];

const fetchData = async () => {
  try {
    const response = await fetch(
      'https://generic-api-backend.mateusschverz.repl.co/usuarios/'
    );
    const data = await response.json();
    setData(data);
    console.log(data);
    // Realize as operações necessárias com os dados
  } catch (error) {
    console.log(error);
  }
};

const App = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [tableColumns, setTableColumns] = useState(columns);

  useEffect(() => {
    fetchData();
  }, []);

  function handleSearchText(e) {
    setSearchText(e.target.value);
    e.target.value == '' || ' ' ? fetchData() : '';
    //e.target.value == '' ? alert() : ''
  }

  function fetchSearch() {
    fetch(
      `https://generic-api-backend.mateusschverz.repl.co/usuarios/?q=${searchText}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={handleSearchText}
        placeholder="Pesquisar"
      />
      <button onClick={fetchSearch}> Pesquisar </button>

      <DataTable
        title="Usuários"
        data={data}
        columns={tableColumns}
        pagination
      />
    </div>
  );
};

export default App;
