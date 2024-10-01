import './App.css';
import BootstrapLayout from "./components/BootstrapLayout";
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App bg-dark">
      <Navbar/>
      <BootstrapLayout/>
    </div>
  );
}

//  App             
//  ├──Navbar   
//  |                                                     ├──WeatherDetails
//  ├─BootstrapLayout────WeatherDisplay────CurrentWeather──├───Loading                       
//  |       ├──SearchForm──UserLocation                   ├──WeatherHeader
//  |                                         
  
export default App;
