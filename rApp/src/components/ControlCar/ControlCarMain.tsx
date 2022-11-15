import React, {useEffect, useState} from 'react';
import RemoteController from "./remoteController/RemoteController";
import YPlayer from "./YoutubePlayer/YPlayer";
import YForm from "./YoutubePlayer/YForm";
import {SavedChannel} from "./YoutubePlayer/SavedChannel";


const ControlCarMain = () => {

  const savedChannel = SavedChannel.getInstance();

  const [youtubeLink,setYoutubeLink] = useState<string>('');

  useEffect(() => {
    setYoutubeLink(savedChannel.channel)

  }, [youtubeLink]);

  return (
    <div style={{height:'100%',marginTop:'50px'}} className={'d-flex  flex-column align-items-center '}>

     <div className='mt-1'>
       <YForm  setYoutubeLink={setYoutubeLink}/>
       <YPlayer youtubeLink={youtubeLink}/>
     </div>

      <div className='mt-5'>
      <RemoteController/>
      </div>


    </div>
  );
};

export default ControlCarMain;
