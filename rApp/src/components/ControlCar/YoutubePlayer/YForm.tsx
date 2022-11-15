import React, {useState} from 'react';
import { Button } from 'react-bootstrap';

interface YFormProps{
  setYoutubeLink :  React.Dispatch<React.SetStateAction<string | undefined>>
}

const YForm = ({setYoutubeLink}:YFormProps ) => {

  const [input,setInput] = useState('');

  const handleSubmit = (e:any) =>{
    e.preventDefault();
    setYoutubeLink(input);
    setInput('');
  }


  return (
    <form onSubmit={handleSubmit}>
      {/*<label>Enter Youtube URL</label>*/}

      <input type="text" required placeholder='Enter your youtube link' onChange={(e)=>setInput(e.target.value)}/>

      <Button type="submit"> Submit</Button>

    </form>
  );
};

export default YForm;
