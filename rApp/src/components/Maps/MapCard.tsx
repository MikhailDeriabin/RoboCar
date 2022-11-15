import React from 'react';
import {Button, Card} from "react-bootstrap";
import {IMapDataGetWithoutPoints} from "../../types/types";

interface MapCardProps{
  dataObject: IMapDataGetWithoutPoints,
  onClickSubmitButton: React.MouseEventHandler<HTMLButtonElement>
  onClickDeleteButton: React.MouseEventHandler<HTMLButtonElement>
}

const MapCard = ({dataObject,onClickSubmitButton,onClickDeleteButton}: MapCardProps) => {

  console.log("lol")

  return (
    <Card
    >

      <Card.Header className='d-flex justify-content-between'> {<Card.Title>{dataObject?.name}</Card.Title>}
        <Button onClick={onClickDeleteButton} variant='danger'>Delete</Button></Card.Header>
      <Card.Body >

        <Card.Text>
            <div><b>Id:</b> {dataObject?.id}</div>
            <div><b>Map Size:</b> {dataObject?.width}x{dataObject?.height}(cm)</div>
            {/*<div><b>Created:</b> {dataObject?.creationDate}</div>*/}
        </Card.Text>
        <Button className='mt-auto' style={{marginLeft: 'auto' , marginRight: 'auto'}} onClick={onClickSubmitButton}>
          Click to see the map
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MapCard;
