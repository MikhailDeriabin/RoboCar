import {useNavigate} from "react-router-dom";
import Button from "./UI/Button/Button";

export const Navigation = () => {
  let navigate = useNavigate();
  return (
    <nav className={'d-flex gap-2 mt-2'}>
      <Button onClick={()=> navigate('/')}>Home</Button>
      <Button onClick={()=> navigate('controlCar')}>Car control</Button>
      <Button onClick={()=> navigate('/data')}>Data</Button>
    </nav>
  );
}
