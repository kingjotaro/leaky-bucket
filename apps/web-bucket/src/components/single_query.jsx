import React, { useState } from "react";
import getreq from "../routes/getreq";

function SingleQuery() {
  const [query, setQuery] = useState("");
  const [jsonData, setJsonData] = useState(null); 
  const handleInputChange = (event) => {
    const sanitizedValue = event.target.value.replace(/\D/g, '');
    setQuery(sanitizedValue);
  };

  async function handleButtonClick() {
    const { response } = await getreq(query); 
    const data = await response.json();
    setJsonData(data)


  };

  return (
    
    <div>
    <div className="gap-1 flex">
      <button 
      disabled={!query}
      className="bg-gray-300 border border-black hover:bg-gray-50 rounded-sm px-1" onClick={handleButtonClick}>Single Query</button>

      <input className="bg-gray-300 placeholder-gray-400"
        type="text"
        pattern="[0-9]*"
        value={query}
        onChange={handleInputChange}
        placeholder="Only numbers"
      />
      <span> CPF 11 digits, CNPJ 14 digits.</span>
      </div>
     {jsonData && (
        <div className="mt-2">
          <h2>JSON Response:</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
     
    </div>
  );
}

export default SingleQuery;
