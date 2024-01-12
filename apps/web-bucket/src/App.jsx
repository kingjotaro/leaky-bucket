import Home from "./components/home";
import DataComponent from "./components/data_component";
import MyResponsiveLine from "./components/graph";
import Button_counter from "./components/button_counter";
import { useState } from "react";
import SingleQuery from "./components/single_query";

function App() {
  const [startCountdown, SetStartCountdown] = useState(false);
  const [sucess_count, SetSucess_count] = useState(0);
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
          sucess_count={sucess_count}
          SetFlag={SetFlag}
          SetSucess_count={SetSucess_count}
          SetFail_count={SetFail_count}
        ></Button_counter>

        <MyResponsiveLine
          flag={flag}
          sucess_count={sucess_count}
          fail_count={fail_count}
        />

        <SingleQuery></SingleQuery>
      </div>
    </div>
  );
}

export default App;
