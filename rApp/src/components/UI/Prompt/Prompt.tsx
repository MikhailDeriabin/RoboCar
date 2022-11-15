import React, {useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';



interface PromptProps{
  promptName: string,
  isShow:boolean,
  setIsShow: any,
  setValue: any,
  fetchCallBack?:any
}

// prompt custom, example:
// const [isPromptOpen, setIsPromptOpen] = useState(false)
// const [mapName, setMapName] = useState('');
//
// //jsx
//
// <button onClick={()=>setIsPromptOpen(true)}>test</button>
// <Prompt promptName='Map name' isShow={isPromptOpen} setIsShow={setIsPromptOpen} setValue={setMapName}/>
// {mapName}


const Prompt = ({promptName,isShow,setIsShow,setValue,fetchCallBack}:PromptProps) => {

  const [inputValue,setInputValue] = useState('');

  const handleClose =() =>{
    setInputValue('');
    setIsShow(false);
  }

  const handleSave = async() =>{
    setValue(inputValue);
    await fetchCallBack();
    handleClose();
  }

  return (
    <>
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Give a {promptName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label></Form.Label>
            <Form.Control
              onChange={(e)=>setInputValue(e.target.value)}
              value={inputValue}
              placeholder={promptName}
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
</>

  );
};

export default Prompt;
