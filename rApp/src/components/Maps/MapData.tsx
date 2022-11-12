import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {DataBaseApi} from "../../api/DataBaseApi";
import {IMapData} from "../../types/types";
import Canvas from "../Canvas/Canvas";

const MapData = () => {
  const params = useParams();
  const MapDataId = params.id;
  // const [fetchError,setFetchError] = useState();
  const [mapData,setMapData] = useState<IMapData>()


  useEffect(  () => {
    const dataBaseApi = new DataBaseApi();
    if (MapDataId) {

      const fetchData = async () => {
        const data = await dataBaseApi.getMapById(Number(MapDataId));
        if(data){
          setMapData(data)
        }
      }
      fetchData().catch(
        console.error
      );
    }
  },[])


  if(mapData){
    return (
      <div>
        <Canvas  width={mapData.width} height={mapData.height} maxSideSizeInPx={400} pointsDefault={mapData.points}/>
      </div>
    );
  }
    return(
      <div>some error with fetch</div>
    )


};

export default MapData;
