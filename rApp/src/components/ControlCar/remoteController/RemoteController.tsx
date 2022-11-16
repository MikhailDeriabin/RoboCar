import React, {useCallback, useEffect, useState} from 'react';
import styles from './RemoteController.module.scss';
import classnames from "classnames";
import GoIcon from "../../UI/GoIcon";
import {ControlCarApi2} from "../../../api/ControlCarApi2";
import {CurrentDirection} from "../../../api/CurrentDirectionEnums";
import Prompt from "../../UI/Prompt/Prompt";


const controlCarApi2 = ControlCarApi2.getInstance();

const RemoteController = () => {


  const defaultIsActive = {
    centerLeft: false,
    centerRight: false,
    top: false,
    right: false,
    bottom: false,
    left: false,
    topLeft: false,
    topRight: false
  }


  //for css only
  const [isActive, setIsActive] = useState(defaultIsActive);
  const [isParentActive, setIsParentActive] = useState<boolean>(false);

  const [isShowPrompt,setIsShowPrompt] = useState(true);
  const [mapName,setMapName] = useState<string|null>(null);

  const [isMeasurementStarted,setIsMeasurementStarted] = useState(controlCarApi2.isMeasurementStarted);

  const eventLogic = () => {
  return {
    'centerLeftMeasure': function (){
      controlCarApi2.measure();
      setIsActive({...isActive , centerLeft: !isActive.centerLeft });
      setIsParentActive(true);
    },

    'centerRightStartStopMeasure': function (){
      controlCarApi2.startStopMeasurementHandler();
      setIsActive({...isActive , centerRight: !isActive.centerRight });
      setIsParentActive(true);
    },

    'goForward': function (){
      switch (controlCarApi2.currentDirection) {
        case CurrentDirection.FORWARD:
          break;
        case CurrentDirection.LEFT:
          controlCarApi2.turnRight();
          break;
        case CurrentDirection.RIGHT:
          controlCarApi2.turnLeft();
          break;
        case CurrentDirection.BACK:
          controlCarApi2.turnLeft();
          controlCarApi2.turnLeft();
          break;
      }

      controlCarApi2.currentDirection = CurrentDirection.FORWARD;
      controlCarApi2.moveForward();

      setIsActive({...isActive , top: !isActive.top });
      setIsParentActive(true);
    },
    'goRight': function (){

      switch (controlCarApi2.currentDirection) {
        case CurrentDirection.FORWARD:
          controlCarApi2.turnRight();
          break;
        case CurrentDirection.LEFT:
          controlCarApi2.turnRight();
          controlCarApi2.turnRight();
          break;
        case CurrentDirection.RIGHT:
          break;
        case CurrentDirection.BACK:
          controlCarApi2.turnLeft();
          break;
      }

      controlCarApi2.currentDirection = CurrentDirection.RIGHT;
      controlCarApi2.moveForward();
      setIsActive({...isActive , right: !isActive.right });
      setIsParentActive(true);
    },
    'goBack': function (){

      switch (controlCarApi2.currentDirection) {
        case CurrentDirection.FORWARD:
          controlCarApi2.turnLeft();
          controlCarApi2.turnLeft();
          break;
        case CurrentDirection.LEFT:
          controlCarApi2.turnLeft();
          break;
        case CurrentDirection.RIGHT:
          controlCarApi2.turnRight();
          break;
        case CurrentDirection.BACK:
          break;
      }
      controlCarApi2.currentDirection = CurrentDirection.BACK;
      controlCarApi2.moveForward();

      setIsActive({...isActive , bottom: !isActive.bottom });
      setIsParentActive(true);
    },
    'goLeft': function (){
      switch (controlCarApi2.currentDirection) {
        case CurrentDirection.FORWARD:
          controlCarApi2.turnLeft();
          break;
        case CurrentDirection.LEFT:
          break;
        case CurrentDirection.RIGHT:
          controlCarApi2.turnRight();
          controlCarApi2.turnRight();
          break;
        case CurrentDirection.BACK:
          controlCarApi2.turnRight();
          break;
      }
      controlCarApi2.currentDirection = CurrentDirection.LEFT;
      controlCarApi2.moveForward();

      setIsActive({...isActive , left: !isActive.left });
      setIsParentActive(true);
    },

    'turnALittleLeft': function (){
      controlCarApi2.turnLeftMS();
      setIsActive({...isActive , topLeft: !isActive.topLeft });
      setIsParentActive(true);
    },

    'turnALittleRight': function (){
      controlCarApi2.turnRightMS()
      setIsActive({...isActive , topRight: !isActive.topRight });
      setIsParentActive(true);
    },

    'setDefault': function (){
      controlCarApi2.stopMoving();
      setIsActive(defaultIsActive);
      setIsParentActive(false);
    },
  }
  }
  const eventLInstance = eventLogic();

  const handleClick = useCallback((event:any) => {
      switch (event.key){
        case 'm':
        case 'M':
          eventLInstance.centerLeftMeasure();
          break;
        case 'f':
        case 'F':
          eventLInstance.centerRightStartStopMeasure();
          break;
        case 'w':
        case 'W':
        case 'ArrowUp':
          eventLInstance.goForward();
          break;
        case 'd':
        case 'D':
        case 'ArrowRight':
          eventLInstance.goRight();
          break;
        case 's':
        case 'S':
        case 'ArrowDown':
          eventLInstance.goBack();
          break;
        case 'a':
        case 'A':
        case 'ArrowLeft':
          eventLInstance.goLeft();
          break;
        case 'q':
        case 'Q':
          eventLInstance.turnALittleLeft();
          break;

        case 'e':
        case 'E':
          eventLInstance.turnALittleRight();
          break;
      }
  }
  ,[]);



  useEffect(() => {

    if(!isShowPrompt){
      window.addEventListener("keydown", handleClick);
      window.addEventListener("keyup",  eventLInstance.setDefault);
    }
    if(isShowPrompt){
      window.removeEventListener("keydown", handleClick);
      window.removeEventListener("keyup",  eventLInstance.setDefault);
    }

    return () => {
      window.removeEventListener("keydown", handleClick);
      window.removeEventListener("keyup",  eventLInstance.setDefault);
    };
  }, [isShowPrompt]);

  useEffect(()=>{
    setIsMeasurementStarted(controlCarApi2.isMeasurementStarted);
  },[eventLInstance.centerRightStartStopMeasure]);

  useEffect(()=>{
    if(mapName){
      controlCarApi2.mapName = mapName;
    }
  },[isShowPrompt])

  return (
    <>
      <div style={{cursor:'pointer'}} onClick={()=>setIsShowPrompt(true)}>Map name: {mapName}</div><br/>
     <Prompt promptName='Map name' isShow={isShowPrompt}  setIsShow={setIsShowPrompt} setValue={setMapName} />
    <div className={classnames(styles.wrapper, isParentActive && styles.elementActive)}>
      <div className={classnames(styles.circle)}>
        <div className={classnames(styles.cell, styles.centerButtons, styles.centerLeft,
          isActive.centerLeft && styles.cellIsActive)
        }
             onMouseDown={eventLInstance.centerLeftMeasure}
             onMouseUp={eventLInstance.setDefault}
        >
          <div className={classnames(styles.innerCell)}>
            <span>M</span>
            <span>Measure</span>
          </div>
        </div>
        <div className={classnames(styles.cell, styles.centerButtons, styles.centerRight,
          isActive.centerRight && styles.cellIsActive
        )}
             onMouseDown={eventLInstance.centerRightStartStopMeasure}
             onMouseUp={eventLInstance.setDefault}
        >
          <div className={classnames(styles.innerCell)}>
            <span>F</span>
            {
              isMeasurementStarted ?
                <span>Finish</span>
                :
                <span>Start</span>
            }

          </div>
        </div>
        <div className={classnames(styles.cell, styles.directionButtons, styles.top,
          isActive.top && styles.cellIsActive
        )}
             onMouseDown={eventLInstance.goForward}
             onMouseUp={eventLInstance.setDefault}
        >
          <div className={classnames(styles.innerCell)}>
            <GoIcon fill={'red'} position={'top'}/>
          </div>
        </div>
        <div className={classnames(styles.cell, styles.directionButtons, styles.right,
          isActive.right && styles.cellIsActive
        )}
             onMouseDown={eventLInstance.goRight}
             onMouseUp={eventLInstance.setDefault}
        >
          <div className={classnames(styles.innerCell)}>
            <GoIcon fill={'red'} position={'right'}/>
          </div>
        </div>
        <div className={classnames(styles.cell, styles.directionButtons, styles.bottom,
          isActive.bottom && styles.cellIsActive
        )}
             onMouseDown={eventLInstance.goBack}
             onMouseUp={eventLInstance.setDefault}
        >
          <div className={classnames(styles.innerCell)}>
            <GoIcon fill={'red'} position={'bottom'}/>
          </div>
        </div>
        <div className={classnames(styles.cell, styles.directionButtons, styles.left,
          isActive.left && styles.cellIsActive
        )}
             onMouseDown={eventLInstance.goLeft}
             onMouseUp={eventLInstance.setDefault}
        >
          <div className={classnames(styles.innerCell)}>
            <GoIcon fill={'red'} position={'left'}/>
          </div>
        </div>

        <div className={classnames(styles.cell, styles.directionButtons, styles.topLeft,
          isActive.topLeft && styles.cellIsActive
        )}
             onMouseDown={eventLInstance.turnALittleLeft}
             onMouseUp={eventLInstance.setDefault}
        >
          <div className={classnames(styles.innerCell)}>
            <GoIcon fill={'red'} position={'topLeft'}/>
          </div>
        </div>

        <div className={classnames(styles.cell, styles.directionButtons, styles.topRight,
          isActive.topRight && styles.cellIsActive
        )}
             onMouseDown={eventLInstance.turnALittleRight}
             onMouseUp={eventLInstance.setDefault}
        >
          <div className={classnames(styles.innerCell)}>
            <GoIcon fill={'red'} position={'topRight'}/>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default RemoteController;
