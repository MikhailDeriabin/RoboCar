import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";

const HandleCurrentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // console.log(location.state)

  return (
    <>
      <h2 className={'mt-2'}> 👉️
        <span style={{'cursor': "pointer"}} onClick={()=>navigate('/')}>home</span>

        <span >{location.pathname}</span>




      </h2>
    </>
  );
};

export default HandleCurrentPage;
