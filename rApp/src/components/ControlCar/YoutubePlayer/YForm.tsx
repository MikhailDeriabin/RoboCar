import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import {SavedChannel} from "./SavedChannel";

interface YFormProps{
  setYoutubeLink :  React.Dispatch<React.SetStateAction<string>>
}

const YForm = ({setYoutubeLink}:YFormProps ) => {

  const savedChannel = SavedChannel.getInstance();

  const [input,setInput] = useState('');

  const handleSubmit = (e:any) =>{
    e.preventDefault();
    setYoutubeLink(input);
    savedChannel.channel = input;
    setInput('');
  }



  return (
    <form onSubmit={handleSubmit}>
      {/*<label>Enter Youtube URL</label>*/}

      <input type="text" required placeholder='Enter your youtube link' value={input} onChange={(e)=>setInput(e.target.value)}/>

      <Button type="submit"> Submit</Button>

    </form>
  );
};

export default YForm;
