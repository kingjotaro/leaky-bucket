import React from "react";
import verify from "../routes/verify";

function create_key(props) {
  const { SetStartCountdown } = props;

  async function create() {
    const { status } = await verify();

    if (status === 200) {
      SetStartCountdown(true);
    }
  }

  return (
    <div>
      <button className="button" onClick={create}>
        Create Key
      </button>
    </div>
  );
}

export default create_key;
