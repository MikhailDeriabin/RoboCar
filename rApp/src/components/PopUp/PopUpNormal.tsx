import React, { useLayoutEffect, useState } from 'react';
import styles from './PopUpNormal.module.scss'
import classnames from 'classnames';
import { nanoid } from 'nanoid';

interface PopUpProps{
  coords: {
    x: number,
    y: number
  }

  title?: string,
  objectToShow? : Object,
  canvas?: any,
  circlesGlobal?: Path2D[],
  ObjectToShowId: number
}



const PopUpNormal = ({ObjectToShowId,canvas,circlesGlobal,coords,objectToShow={
  1:'hello',
  2:'bye',
  3: 'lol'


}}:PopUpProps) => {

  const[isShow,setIsShow] = useState(false);

  const [currentCircleId,setCurrentCircleId] = useState(-2);

  const [toggleSignal,setToggleSignal] = useState(false);

  useLayoutEffect(()=>{


    if(canvas){
      const context = canvas.getContext('2d');

      circlesGlobal?.map((c,index)=>{


        // if(currentCircleId === index){
        //   context.fillStyle = 'orange';
        //   context.fill(c);
        //   context.stroke();
        // }
        //
        // else{
        //   context.fillStyle = 'red';
        //   context.fill(c);
        //   setCurrentCircleId(-1);
        //   context.stroke();
        // }

      })

      // context.strokeStyle = '#add8e6';
      // context.stroke();

    }

    return ()=>{
      setCurrentCircleId(-1);
    }

  },[isShow])




  return (

    <div className={classnames('position-absolute',styles.container)} style={{top:coords.y,left: coords.x}}>
    <div className={classnames('')}>

      <div className={styles.popuptext} style={isShow ?{display: 'block'} : {display: 'none'}}>
      <h4>{'Title'} <span onClick={(()=> setIsShow(!isShow))}>X</span></h4>
      <ul>
        {Object.entries(objectToShow).map(([key,value])=>(
          <li key={nanoid()}>{key} : {value?.toString()}</li>
        ))}
      </ul>
      </div>

      <div className={styles.clickArea}  style={{cursor:'pointer'}}>
        <span style={{opacity:'0'}}>*</span>
        <div className={styles.clickAreaInner} onClick={() => setIsShow(!isShow)} onMouseEnter={() => setToggleSignal(!toggleSignal)} onMouseMove={() => setCurrentCircleId(ObjectToShowId)}  />
      </div>

    </div>
    </div>


  );
};

export default PopUpNormal;
