import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import Prompt from "../UI/Prompt/Prompt";
import {DataBaseApi} from "../../api/DataBaseApi";
import {IMapDataPostWithName, IMapDataPostWithoutName} from "../../types/types";
import {error} from "electron-log";
const dataBaseApi = new DataBaseApi();

interface HandleSaveMapProps{
  sendableObject: IMapDataPostWithoutName | null,
  setSendableObject:  React.Dispatch<React.SetStateAction<IMapDataPostWithoutName| null>>
}

const HandleSaveMap = ({sendableObject,setSendableObject}:HandleSaveMapProps) => {

  const [isPromptOpen, setIsPromptOpen] = useState(false)
  const [mapName, setMapName] = useState('');

  const [fetchError,setFetchError] = useState('')

  const [sendableObjectWithName,setSendableObjectWithName] = useState<IMapDataPostWithName|null>();

  const handleFetch = async ()=>{
    if(sendableObjectWithName!=null){
      try{
        await dataBaseApi.createNewMap(sendableObjectWithName);
        setSendableObject(null);
        setSendableObjectWithName(null);
      }
      catch (e:any){
        setFetchError(e)
      }
    }
  }

  useEffect(()=>{
    alert(fetchError);
  },[fetchError]);



  useEffect(()=>{
    const sendableObjectCopy = JSON.parse(JSON.stringify(sendableObject));
    setSendableObjectWithName({height: sendableObjectCopy.height , name: mapName, points: sendableObjectCopy.points, width: sendableObjectCopy.width});
  },[mapName]);

  return (
    <>
      <Prompt promptName='Map name' isShow={isPromptOpen} setIsShow={setIsPromptOpen} setValue={setMapName} fetchCallBack={handleFetch}/>
      <Button onClick={()=>setIsPromptOpen(true)} variant='success'>Save results</Button>
    </>

  );
};

export default HandleSaveMap;
