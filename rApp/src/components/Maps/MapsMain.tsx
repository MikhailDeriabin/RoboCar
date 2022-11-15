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

  const handleDeleteMapInfo = async (id:number) =>{
    try {
      await dataBaseApi.deleteMapById(id);
      setHandleFetch(!handleFetch)
    }
    catch (e){
      alert(e)
    }
  }

  useEffect(()=>{
    const fetchData = async ()=>{
      const data = await dataBaseApi.getAllMaps();

      if(data){
        setMaps(data.result)
      }
    }
    fetchData().catch(
      console.error
    );
  },[])

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
