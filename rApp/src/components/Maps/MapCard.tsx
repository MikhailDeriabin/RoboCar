import React from 'react';
import {Button, Card} from "react-bootstrap";
import {IMapDataGetWithoutPoints} from "../../types/types";
import {convertStringToDate} from "../../utils/convertStringToDate";

interface MapCardProps{
  dataObject: IMapDataGetWithoutPoints,
  onClickSubmitButton: React.MouseEventHandler<HTMLButtonElement>
  onClickDeleteButton: React.MouseEventHandler<HTMLButtonElement>
}

const MapCard = ({dataObject,onClickSubmitButton,onClickDeleteButton}: MapCardProps) => {

  const ConvertedDate = convertStringToDate(dataObject.creationDate);

  return (
    <Card
    >

      <Card.Header className='d-flex justify-content-between'> {<Card.Title>{dataObject?.name}</Card.Title>}
        <Button onClick={onClickDeleteButton} variant='danger'>Delete</Button></Card.Header>
      <Card.Body >

        <Card.Text>
            <div><b>Id:</b> {dataObject?.id}</div>
            <div><b>Map Size:</b> {dataObject?.width}x{dataObject?.height}(cm)</div>
            <div><b>Created:</b> {ConvertedDate.getDate()}.{ConvertedDate.getMonth() + 1}.{ConvertedDate.getFullYear()}</div>
        </Card.Text>
        <Button className='mt-auto' style={{marginLeft: 'auto' , marginRight: 'auto'}} onClick={onClickSubmitButton}>
          Click to see the map
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MapCard;
