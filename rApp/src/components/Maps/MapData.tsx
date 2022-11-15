import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {DataBaseApi} from "../../api/DataBaseApi";
import {IMapDataGetOne} from "../../types/types";
import Canvas from "../Canvas/Canvas";
import {MockMaps} from "../../../mocks/MockMaps";

const MapData = () => {
  const params = useParams();
  const MapDataId = params.id;
  // const [fetchError,setFetchError] = useState();

  const mockMaps = MockMaps;



  const [mapData,setMapData] = useState<IMapDataGetOne>()


  useEffect(  () => {
    // const dataBaseApi = new DataBaseApi();

    if (MapDataId) {
      const foundMap = mockMaps.find(value => value.id === Number(MapDataId) )

      // @ts-ignore
      setMapData(foundMap);

      // const fetchData = async () => {
      //   const data = await dataBaseApi.getMapById(Number(MapDataId));
      //   if(data){
      //     setMapData(data)
      //   }
      // }
      // fetchData().catch(
      //   console.error
      // );
    }
  },[])


  if(mapData){
    return (
      <div className='d-flex justify-content-center mt-5'>
        <Canvas  width={mapData.width} height={mapData.height} maxSideSizeInPx={600} pointsDefault={mapData.points}/>
      </div>
    );
  }
    return(
      <div>some error with fetch</div>
    )
};

export default MapData;
