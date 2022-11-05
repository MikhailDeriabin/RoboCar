import React, { useId } from 'react';
import styles from './PopUp.module.scss'
import classnames from 'classnames';
import { nanoid } from 'nanoid';

interface PopUpProps{
  coords: {
    x: number,
    y: number
  }
  title?: string,
  objectToShow? : Object
}

const PopUp = ({coords,objectToShow={
    hello:1,
    bye:2,
    morning:3
},title=""}:PopUpProps) => {

  // console.log('hello')

  if(objectToShow)
  return (

    <div className={classnames('position-absolute',styles.container)} style={{top:coords.y,left: coords.x}}>
      <h4>{title}</h4>
      <ul>
      {Object.entries(objectToShow).map(([key,value])=>(
        <li key={nanoid()}>{key} : {value.toString()}</li>
      ))}
      </ul>
    </div>

  );
    return (<></>)
};

export default React.memo(PopUp);
