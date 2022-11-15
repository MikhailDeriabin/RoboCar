import {MemoryRouter as Router, Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import ControlCar from "../pages/ControlCar";
import {Navigation} from "../components/Navigation/Navigation";
import Home from 'pages/Home';
import MapsMain from "../components/Maps/MapsMain";
import MapData from "../components/Maps/MapData";


declare global {
  interface Window {
    api? : any
  }
}

export default function App() {

  return (
    <div className='App'>
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/"  element={
          <Navigate replace to="/controlCar" />
        } />
        {/*<Route path="/" element={<Home />} />*/}
        <Route path="/controlCar" element={<ControlCar />} />

        <Route path="/maps" element={<MapsMain/>} />
        <Route path="/maps/:id" element={<MapData/>} />

      </Routes>
    </Router>
    </div>
  );
}
