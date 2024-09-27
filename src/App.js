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

export default App;
