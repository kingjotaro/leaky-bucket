import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);


  async function fetchData() {
    try {
      const response = await fetch('http://localhost:3000');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <div>
      {data && (
        <div>
          <h2>data</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
