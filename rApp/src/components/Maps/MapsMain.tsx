import React, {useEffect, useState} from 'react';
import Canvas from '../Canvas/Canvas';
import {DataBaseApi} from "../../api/DataBaseApi";
import {MockMaps, MockMapsWithoutPoints} from "../../../mocks/MockMaps";
import {IMapDataGetWithoutPoints} from "../../types/types";
import MapCard from "./MapCard";

import classes from './MapsMain.module.scss'
import {useNavigate} from "react-router-dom";


const MapsMain = () => {
  const navigate = useNavigate();

  const mockMaps = MockMapsWithoutPoints;

  const [maps,setMaps] = useState<IMapDataGetWithoutPoints[]>();

  const dataBaseApi = new DataBaseApi();

  useEffect(()=>{



    dataBaseApi.getAllMaps().catch(

    )

    //todo get all maps


    // setMaps(mockMaps)
  },[])


  if(maps) {

    return (
      <div className='container mt-5 mb-5' >
      <div className={'' + classes.gridContainer}>
      {/*<div className='justify-content-start d-flex flex-wrap gap-4'>*/}

        {maps.map(m=>(
          <div onClick={()=>navigate(`/maps/${m.id}`)}><MapCard id={m.id} name={m.name} width={m.width} height={m.height} date={m.date} /></div>
        ))}

        {maps.map(m=>(
          <div onClick={()=>navigate(`/maps/${m.id}`)}><MapCard id={m.id} name={m.name} width={m.width} height={m.height} date={m.date}  /></div>
        ))}


        {/*give params in Cms*/}
        {/*<Canvas  width={200} height={100}/>*/}
        {/*<Canvas  width={2000} height={2000} maxSideSizeInPx={400}/>*/}


        {/*<Canvas className='mt-5'  width={400} height={400}/>*/}

        {/*<Canvas className='mt-5'  width={100} height={100}/>*/}
      </div>
      </div>
    );
  }
  return (
    <div>some error with getting Maps' Info from the API</div>
  )

};

export default MapsMain;
