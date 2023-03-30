import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useGameCompleteEvents } from "../../lib/api";

const columns = [
  { field: 'id', headerName: 'Rank', width: 30 },
  { field: 'Address', headerName: 'Address', width: 80 },
  { field: 'Score', headerName: 'Score', width: 30 },
];

const xrows = [
  { id: 1, Address: 'Snow', Score: 'Jon'},
  { id: 2, Address: 'Lannister', Score: 'Cersei'},
  { id: 3, Address: 'Lannister', Score: 'Jaime'},
  { id: 4, Address: 'Stark', Score: 'Arya'},
  { id: 5, Address: 'Targaryen', Score: 'Daenerys'},
  { id: 6, Address: 'Melisandre', Score: "x" },
  { id: 7, Address: 'Clifford', Score: 'Ferrara' },
  { id: 8, Address: 'Frances', Score: 'Rossini'},
  { id: 9, Address: 'Roxie', Score: 'Harvey' },
];

export default function LeaderBoard() {
  const { data } = useGameCompleteEvents();
  const [rows, setRows] = useState([]);

  // Sort the data array by score in descending order and update rows state
  useEffect(() => {
    if (data) {
      const sortedData = data.gameEvents.sort((a, b) => b.score - a.score);
      const mappedData = sortedData.map((item, index) => ({
        id: index + 1,
        Address: item.player_address,
        Score: item.score
      }));
      setRows(mappedData);
    }
  }, [data]);

  return (
    <>
    { data ? (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
      />
    </div>
    ) : (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={xrows}
        columns={columns}
      />
    </div>
    )
    }
   </>
  );
}
