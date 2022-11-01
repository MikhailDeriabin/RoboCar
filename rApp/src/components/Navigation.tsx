import {useNavigate} from "react-router-dom";

export const Navigation = () => {
  let navigate = useNavigate();
  return (
    <nav>
      <button onClick={()=> navigate('/')}>Home</button>
      <button onClick={()=> navigate('controlCar')}>Car control</button>
      <button onClick={()=> navigate('/data')}>Data</button>
    </nav>
  );
}
