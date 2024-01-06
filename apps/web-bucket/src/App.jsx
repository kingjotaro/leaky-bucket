import Home from "./components/home";
import DataComponent from './components/data_component'
import MyResponsiveLine from './components/graph';
import barChartData from './barChartData';
import Script1 from "./components/script1";
function App() {


 
  return (
    <div>
   <Home></Home>
   <DataComponent></DataComponent>
   <Script1></Script1>
   <MyResponsiveLine data={barChartData}/>
   </div>
  );
}

export default App;
