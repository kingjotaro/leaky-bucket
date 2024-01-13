import Home from "./components/home";
import DataComponent from "./components/data_component";
import MyResponsiveLine from "./components/graph";
import Button_counter from "./components/button_counter";
import { useState } from "react";
import SingleQuery from "./components/single_query";

function App() {
  const [startCountdown, SetStartCountdown] = useState(false);
  const [success_count, SetSuccess_count] = useState(0);
  const [fail_count, SetFail_count] = useState(0);
  const [flag, SetFlag] = useState(false);

  return (
    <div>
      <Home
        startCountdown={startCountdown}
        SetStartCountdown={SetStartCountdown}
      ></Home>

      <div className="flex flex-row items-center justify-center">
        <DataComponent SetStartCountdown={SetStartCountdown}></DataComponent>
      </div>

      <div className="flex flex-col items-center jutify-center">
        <Button_counter
          fail_count={fail_count}
          success_count={success_count}
          SetFlag={SetFlag}
          SetSuccess_count={SetSuccess_count}
          SetFail_count={SetFail_count}
        ></Button_counter>

        <MyResponsiveLine
          flag={flag}
          success_count={success_count}
          fail_count={fail_count}
        />

        <SingleQuery></SingleQuery>
      </div>
    </div>
  );
}

export default App;
