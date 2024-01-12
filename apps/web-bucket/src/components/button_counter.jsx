import getreq from "../routes/getreq";
import cpf from "../components/cpf";
import { useState } from "react";
function Button_counter(props) {
  const [apiCall, SetApicall] = useState(0);

  const { SetSucess_count, SetFail_count, SetFlag, sucess_count, fail_count } =
    props;

  const handleInputChange = (event) => {
    const inputValue = parseInt(event.target.value, 10);
    SetApicall(isNaN(inputValue) ? 0 : inputValue);
  };

  async function runRequests() {
    const cpf1 = cpf();
    for (let i = 0; i < apiCall; i++) {
      const { status } = await getreq(cpf1);
      if (status === 200) {
        await SetSucess_count((prevData) => prevData + 1);
      } else {
        await SetFail_count((prevData) => prevData + 1);
      }
    }
    SetFlag(true);
  }
  return (
    <div className="flex items-center">
      <div className="flex flex-row justify-around  gap-1">
        <div className="bg-green-500 rounded-md font-bold p-1  h-11 flex flex-row items-center">
          Success Request: {sucess_count}
        </div>
        <div className="flex flex-col">
          <button
            className=" border border-black bg-blue-300 hover:bg-green-300  font-bold px-4 py-2 rounded-lg "
            onClick={runRequests}
          >
            Make API Calls
          </button>

          <select
            className="text-center w-40"
            value={apiCall}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select number of API calls
            </option>
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </select>
        </div>
        <div className="bg-red-500 rounded-md font-bold px-1 flex flex-row items-center h-11">
          Fail Request: {fail_count}
        </div>
      </div>
    </div>
  );
}

export default Button_counter;
