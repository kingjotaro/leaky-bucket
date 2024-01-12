import React, { useState, useEffect } from "react";
import Create_key from "./create_key";

function DataComponent(props) {
  const { SetStartCountdown } = props;
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
      <div className="flex  gap-5">
        <button onClick={showData} className="button">
          Show All the Data
        </button>
        <Create_key SetStartCountdown={SetStartCountdown}></Create_key>
      </div>
      {on && data ? (
        <div className="flex flex-col">
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
