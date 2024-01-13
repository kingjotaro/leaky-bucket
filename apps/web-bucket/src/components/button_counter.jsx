import getreq from "../routes/getreq";
import cpf from "../components/cpf";
import { useState } from "react";

function ButtonCounter({SetSuccess_count, SetFail_count, SetFlag, success_count, fail_count}) {
  const [apiCall, setApiCall] = useState(0);
  const [customApiCall, setCustomApiCall] = useState("");


  const handleInputChange = (event) => {
    const inputValue = parseInt(event.target.value, 10);
    setApiCall(isNaN(inputValue) ? 0 : inputValue);
  };

  const handleCustomInputChange = (event) => {
    setCustomApiCall(event.target.value);
  };

  async function runRequests() {
    const callsToMake = customApiCall || apiCall;
    const cpf1 = cpf();

    for (let i = 0; i < callsToMake; i++) {
      const { status } = await getreq(cpf1);
      if (status === 200) {
        console.log(success_count)
        await SetSuccess_count((prevData) => prevData + 1);
        
      } else {
        await SetFail_count((prevData) => prevData + 1);
      }
    }
    SetFlag(true);
  }

  return (
    <div className="flex items-center">
      <div className="flex flex-row justify-around gap-1">
        <div className="bg-green-500 rounded-md font-bold p-1 h-11 flex flex-row items-center">
          Success Request: {success_count}
        </div>
        <div className="flex flex-col">
          <button
            className="border border-black bg-blue-300 hover:bg-green-300 font-bold px-4 py-2 rounded-lg"
            onClick={runRequests}
          >
            Make API Calls
          </button>

          <div className="flex flex-col items-center mt-2">
            <label htmlFor="apiCalls">Number of API calls:</label>
            <select
              id="apiCalls"
              className="text-center w-40"
              value={apiCall}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select a predefined number
              </option>
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
            </select>

            <label htmlFor="customApiCalls">Custom API calls:</label>
            <input
              id="customApiCalls"
              type="text"
              value={customApiCall}
              onChange={handleCustomInputChange}
              placeholder="Enter a custom value"
              className="w-40 border rounded-md p-1 mt-1 text-center"
            />
          </div>
        </div>
        <div className="bg-red-500 rounded-md font-bold px-1 flex flex-row items-center h-11">
          Fail Request: {fail_count}
        </div>
      </div>
    </div>
  );
}

export default ButtonCounter;