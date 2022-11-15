import React, {useEffect, useState} from 'react';
import RemoteController from "./remoteController/RemoteController";
import VPlayer from "./VideoPlayer/VPlayer";
import VForm from "./VideoPlayer/VForm";
import {SavedChannel} from "./VideoPlayer/SavedChannel";
import {inspect} from "util";
import styles from './ControlCar.module.scss'


const ControlCarMain = () => {

  const savedChannel = SavedChannel.getInstance();

  const [videoLink,setVideoLink] = useState<string>('');


  useEffect(() => {
    setVideoLink(savedChannel.channel)

  }, [videoLink]);

  return (
    <div style={{height:'100%',marginTop:'30px'}} className={'d-flex justify-content-center gap-4 text-center align-items-center flex-column'}>
    {/*// <div style={{height:'100%',marginTop:'30px'}} className={'' + '' + styles.gridContainer}>*/}

      <VForm setVideoLink={setVideoLink}/>

      {videoLink.length>0 &&
      <VPlayer videoLink={videoLink}/>
      }

      <div className='mb-3'>
      <RemoteController/>
      </div>
    </div>
  );
};

export default ControlCarMain;
