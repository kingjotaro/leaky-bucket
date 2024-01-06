import React, { useState } from 'react';
import getreq from './script';

function Script1() {
  const [responseData, setResponseData] = useState(0);

  async function runRequests() {
    for (let i = 0; i < 100; i++) {
      await getreq();
      setResponseData(prevData => prevData + 1);
    }
  }
  return (
    <div>
      <button onClick={runRequests}>Make API Calls</button>
      <div>Success Count: {responseData}</div>
    </div>
  );
}

export default Script1;
