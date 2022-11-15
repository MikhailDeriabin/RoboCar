import {useNavigate} from "react-router-dom";
import Button from "../UI/Button/Button";
import HandleCurrentPage from "./HandleCurrentPage";

export const Navigation = () => {
  let navigate = useNavigate();
  return (
    <div className={'container-fluid'}>
    <nav className={'d-flex gap-2 mt-2 '}>
      {/*<Button onClick={()=> navigate('/')}>Home</Button>*/}
      <Button onClick={()=> navigate('controlCar')}>Car control</Button>
      <Button onClick={()=> navigate('/maps')}>Maps</Button>
    </nav>
      <HandleCurrentPage/>
    </div>
  );
}
