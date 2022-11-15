import React, {useEffect, useState} from 'react';
import {DataBaseApi} from "../../api/DataBaseApi";
import {IMapDataGetWithoutPoints} from "../../types/types";
import MapCard from "./MapCard";
import classes from './MapsMain.module.scss'
import {useNavigate} from "react-router-dom";


const dataBaseApi = new DataBaseApi();


const MapsMain = () => {
  const navigate = useNavigate();

    // const mockMaps = MockMapsWithoutPoints;

  const [maps,setMaps] = useState<IMapDataGetWithoutPoints[]>();
  const [signal,setSignal] = useState(false)

  const handleDeleteMapInfo = async (id:number) =>{

    try {
      await dataBaseApi.deleteMapById(id);
      setHandleFetch(!handleFetch);
      setSignal(!signal)
    }
    catch (e){
      alert(e)
    }
  }

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const data = await dataBaseApi.getAllMaps();
        if(data){
          setMaps(data.result)
        }
        else{alert('some error with fetch maps')}
      }
      catch (e){
      alert(e)
      }
    }
    fetchData();
  },[signal]);

const [handleFetch, setHandleFetch] = useState(false);
  if(maps) {
    return (
      <>
      <div className='container mt-5 mb-5' >
      <div className={'' + classes.gridContainer}>
        {maps.map(m=>(

       <div key={m.id + 'maaaps'}><MapCard dataObject={m} onClickSubmitButton={()=>navigate(`/maps/${m.id}`)} onClickDeleteButton={()=>handleDeleteMapInfo(m.id)}/></div>
        ))}
      </div>
      </div>
      </>
    );
  }
  return (
    <div></div>
  )

};

export default MapsMain;
