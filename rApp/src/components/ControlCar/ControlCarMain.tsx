import React from 'react';
import RemoteController from "./remoteController/RemoteController";
import styles from './RemoteController.module.scss';
import classnames from "classnames";


const ControlCarMain = () => {
  return (
    <div style={{height:'100%',marginTop:'50px'}} className={'d-flex justify-content-center align-items-center '}>
    {/*<div >*/}
      <RemoteController/>
    </div>
  );
};

export default ControlCarMain;
