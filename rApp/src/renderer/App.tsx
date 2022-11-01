import {MemoryRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import ControlCar from "../pages/ControlCar";
import {Navigation} from "../components/Navigation";
import Home from 'pages/Home';
import Data from "../pages/Data";



export default function App() {
  return (
    <div className='App'>
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/controlCar" element={<ControlCar />} />
        <Route path="/data" element={<Data/>} />
      </Routes>
    </Router>
    </div>
  );
}
