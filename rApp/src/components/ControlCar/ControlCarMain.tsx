import React, {useState} from 'react';
import RemoteController from "./remoteController/RemoteController";
import styles from './RemoteController.module.scss';
import classnames from "classnames";
import YPlayer from "./YoutubePlayer/YPlayer";
import YForm from "./YoutubePlayer/YForm";


const ControlCarMain = () => {

  const [youtubeLink,setYoutubeLink] = useState<string>();

  return (
    <div style={{height:'100%',marginTop:'50px'}} className={'d-flex justify-content-center flex-column align-items-center '}>
    {/*<div >*/}
      <RemoteController/>



     <div className='mt-5'>

       <YForm  setYoutubeLink={setYoutubeLink}/>
       <YPlayer youtubeLink={youtubeLink}/>

     </div>
    </div>
  );
};

export default ControlCarMain;
