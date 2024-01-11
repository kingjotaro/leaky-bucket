import Home from "./components/home";
import DataComponent from "./components/data_component";
import MyResponsiveLine from "./components/graph";
import Button_counter from "./components/button_counter";
import { useState } from "react";

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
      <Button_counter
        SetFlag={SetFlag}
        sucess_count={sucess_count}
        SetSucess_count={SetSucess_count}
        fail_count={fail_count}
        SetFail_count={SetFail_count}
      ></Button_counter>

      <MyResponsiveLine
        flag={flag}
        sucess_count={sucess_count}
        fail_count={fail_count}
      />
    </div>
  );
}

export default App;
