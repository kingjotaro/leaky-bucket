import React from "react";
import verify from "../routes/verify";
import { useState } from "react";

function create_key(props) {
  const { SetStartCountdown } = props;
  const [text, SetText] = useState(false);

  async function create() {
    const { status } = await verify();
    if (status === 200) {
      SetText(true);
      SetStartCountdown(true);
    }
  }

  return (
    <div>
      <button
        className={`hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg ${
          text ? "bg-green-300" : "bg-yellow-500"
        }`}
        onClick={create}
      >
        Create Key
      </button>
    </div>
  );
}

export default create_key;
