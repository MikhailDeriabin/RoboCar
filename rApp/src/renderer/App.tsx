import {MemoryRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import ControlCar from "../pages/ControlCar";
import {Navigation} from "../components/Navigation";
import Home from 'pages/Home';
import Data from "../pages/Data";
import { useState } from 'react';

import { sendAsync } from '../main/preload';

// @ts-ignore
// import {sendAsync} from './message-control/renderer';

declare global {
  interface Window {
    api? : any
  }
}

export default function App() {

  // console.log(window.electron.ipcRenderer);

  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);

  // function send(data: any) {
  //   // @ts-ignore
  //   sendAsync(data).then((result: any) => setResponses([...responses, result]));
  // }


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
