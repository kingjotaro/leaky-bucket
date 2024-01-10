import Home from "./components/home";
import DataComponent from "./components/data_component";
import MyResponsiveLine from "./components/graph";
import Button_counter from "./components/button_counter";
import Create_key from "./components/create_key";

import { useState } from "react";
function App() {
  const [sucess_count, SetSucess_count] = useState(0);
  const [fail_count, SetFail_count] = useState(0);
  const [flag, SetFlag] = useState(false);



  return (
    <div>
      <Home />

      <DataComponent />
      <Button_counter
        SetFlag={SetFlag}
        sucess_count={sucess_count}
        SetSucess_count={SetSucess_count}
        fail_count={fail_count}
        SetFail_count={SetFail_count}
      ></Button_counter>
      <Create_key></Create_key>
      <MyResponsiveLine flag={flag} sucess_count={sucess_count}  fail_count={fail_count}/>
    </div>
  );
}

export default App;
