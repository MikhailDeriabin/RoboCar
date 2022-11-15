import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import {SavedChannel} from "./SavedChannel";

interface YFormProps{
  setVideoLink :  React.Dispatch<React.SetStateAction<string>>
}

const VForm = ({setVideoLink}:YFormProps ) => {

  const savedChannel = SavedChannel.getInstance();

  const [input,setInput] = useState('');

  const handleSubmit = (e:any) =>{
    e.preventDefault();
    setVideoLink(input);
    savedChannel.channel = input;
    setInput('');
  }

  return (
    <form onSubmit={handleSubmit}>


      <h2>Control car remotely</h2>

      <label> Stream formats: (YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, DailyMotion and Kaltura)</label>
      <br/>
      <br/>

      <input type="text" required placeholder='Enter your video link' value={input} onChange={(e)=>setInput(e.target.value)}/>
      <Button type="submit" style={{marginLeft:'10px'}}> Submit</Button>

    </form>
  );
};

export default VForm;
