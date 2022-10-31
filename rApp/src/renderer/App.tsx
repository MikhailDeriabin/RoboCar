import {MemoryRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import ControlCar from "../pages/ControlCar";

const Hello = () => {
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donat
          </button>
        </a>
      </div>
    </div>
  );
};

const Navigation = () => {
  let navigate = useNavigate();
  return (
    <div>
    <button onClick={()=> navigate('controlCar')}>controlCar</button>
    <button onClick={()=> navigate('/')}>go home</button>
    </div>
  );
}

export default function App() {
  return (
    <div>
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/controlCar" element={<ControlCar />} />
      </Routes>
    </Router>
    </div>
  );
}
