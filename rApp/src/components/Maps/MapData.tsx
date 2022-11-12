import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";

const MapData = () => {
  const params = useParams();
  const MapDataId = params.id;




  useEffect(()=>{

 // fetch current map data by id

  },[])



  return (
    <div>

    </div>
  );
};

export default MapData;
