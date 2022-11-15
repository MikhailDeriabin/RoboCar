import Button from 'components/UI/Button/Button';
import {useLocation, useNavigate} from "react-router-dom";
import {memo} from "react";


const GoBackButton = memo(() => {
  const navigate = useNavigate();
  function handleBack(){
      navigate(-1);
  }
  return (
    <Button style={{height: '40px'}} onClick={handleBack}>Back</Button>
  )
})


const HandleCurrentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <h2 className={'mt-2 d-flex'}> 👉️
        <span style={{'cursor': "pointer"}} onClick={()=>navigate('/')}>home</span>
        <span >{location.pathname}</span>
        { location.pathname !=='/' && <div style={{marginLeft: '10px'}}><GoBackButton/></div>}
      </h2>
    </>
  );
};

export default HandleCurrentPage;
