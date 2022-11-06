import React, { useState } from 'react';
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
  // isShow?: boolean
}



const PopUpNormal = ({coords,objectToShow={
  1:'hello',
  2:'bye',
  3: 'lol'


}}:PopUpProps) => {

  const[isShow,setIsShow] = useState(false);

  return (

    <div className={classnames('position-absolute',styles.container)} style={{top:coords.y,left: coords.x}}>
    <div className={classnames('')}>

      <div className={styles.popuptext} style={isShow ?{display: 'block'} : {display: 'none'}}>
      <h4>{'Title'} <span onClick={(()=> setIsShow(!isShow))}>X</span></h4>
      <ul>
        {Object.entries(objectToShow).map(([key,value])=>(
          <li key={nanoid()}>{key} : {value.toString()}</li>
        ))}
      </ul>
      </div>

      <div className={styles.clickArea}  style={{cursor:'pointer'}}>
        <span style={{opacity:'1'}}>*</span>
        <div className={styles.clickAreaInner} onClick={()=>setIsShow(!isShow)} ></div>
      </div>

    </div>
    </div>


    // <div className="popup"  onClick={()=>console.log()}  >Click me to toggle the popup!
    //   <span className="popuptext" id="myPopup">A Simple Popup!</span>
    // </div>

  );
};

export default PopUpNormal;
