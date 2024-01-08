import React, { useState, useEffect } from "react";

function DataComponent() {
  const [data, setData] = useState(null);
  const [on, setOn] = useState(false);

  const showData = () => {
    setOn(!on);
  };

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:3000");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center mt-1">
      <button
        onClick={showData}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
      >
        Show All the Data
      </button>

      {on && data ? (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold mb-2">Data</h2>
          <pre className="whitespace-pre-line overflow-auto bg-gray-100 p-4 rounded-md">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      ) : (
        <p className="text-center">
          {on
            ? "Loading data..."
            : 'Click "Show All the Data" to display all the Data'}
        </p>
      )}
    </div>
  );
}

export default DataComponent;
