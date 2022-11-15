import React from 'react';
import {Button, Card, ListGroup} from "react-bootstrap";
import {IMapDataGetOne, IMapDataGetWithoutPoints} from "../../types/types";
import {map} from "react-bootstrap/ElementChildren";


const MapCard = (props:IMapDataGetWithoutPoints) => {
  return (
    <Card
      // style={{ width: '18rem' }}
      // style={{ width: '18rem' }}
      className="d-flex flex-column "
    >
      <Card.Header> {<Card.Title>{props.name}</Card.Title>}</Card.Header>
      <Card.Body>

        <Card.Text>
            <div><b>Id:</b> {props.id}</div>
            <div><b>Map Size:</b> {props.width}x{props.height}(cm)</div>
            <div><b>Created:</b> {props.date.toString()}</div>
        </Card.Text>
        <Button className='mt-auto' style={{marginLeft: 'auto' , marginRight: 'auto'}}>
          Click to see the map
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MapCard;
