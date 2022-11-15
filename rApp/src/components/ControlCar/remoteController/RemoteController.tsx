import React, {useCallback, useEffect, useState} from 'react';
import styles from './RemoteController.module.scss';
import classnames from "classnames";
import GoIcon from "../../UI/GoIcon";
import {ControlCarApi} from "../../../api/ControlCarApi";


const controlCarApi = ControlCarApi.getInstance();

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

  // console.log('rerender test')

  //
  const [isActive, setIsActive] = useState(defaultIsActive);

  //for css only
  const [isParentActive, setIsParentActive] = useState<boolean>(false);


  const eventLogic = () => {
    // let moveForwardIntervalId: any, moveBackIntervalId:any, turnLeftIntervalId:any, turnRightIntervalId:any;
  return {
    'centerLeftMeasure': function (){
      // controlCarApi.measureTempHumid();
      // controlCarApi.measureLightIntensity();
      // controlCarApi.measureIsTilted();
      // controlCarApi.measureCoordinates();

      setIsActive({...isActive , centerLeft: !isActive.centerLeft });
      setIsParentActive(true);
    },
    'centerRightSendMap': function (){
      setIsActive({...isActive , centerRight: !isActive.centerRight });
      setIsParentActive(true);
    },
    'goForward': function (){
      // moveForwardIntervalId = setInterval(controlCarApi.moveForward,10);
      controlCarApi.moveForward();
      setIsActive({...isActive , top: !isActive.top });
      setIsParentActive(true);
    },
    'turnRight90deg': function (){
      controlCarApi.turnRight();
      setIsActive({...isActive , right: !isActive.right });
      setIsParentActive(true);
    },
    'goBack': function (){
      // moveForwardIntervalId = setInterval(controlCarApi.moveBack,10);
      controlCarApi.moveBack();
      setIsActive({...isActive , bottom: !isActive.bottom });
      setIsParentActive(true);
    },
    'turnLeft90Deg': function (){
      controlCarApi.turnLeft();
      setIsActive({...isActive , left: !isActive.left });
      setIsParentActive(true);
    },

    'turnALittleLeft': function (){
      controlCarApi.turnLeftMS();
      setIsActive({...isActive , topLeft: !isActive.topLeft });
      setIsParentActive(true);
    },

    'turnALittleRight': function (){
      controlCarApi.turnRightMS()
      setIsActive({...isActive , topRight: !isActive.topRight });
      setIsParentActive(true);
    },

    'setDefault': function (){
      controlCarApi.stopMoving();
      setIsActive(defaultIsActive);
      setIsParentActive(false);
    },
  }
  }
  const eventLInstance = eventLogic();

  const handleClick = useCallback((event:any) => {
    switch (event.key){
      case 'm':
        eventLInstance.centerLeftMeasure();
        break;
      case 't':
        eventLInstance.centerRightSendMap();
        break;
      case 'w':
      case 'ArrowUp':
        eventLInstance.goForward();
        break;
      case 'd':
      case 'ArrowRight':
        eventLInstance.turnRight90deg();
        break;
      case 's':
      case 'ArrowDown':
        eventLInstance.goBack();
        break;
      case 'a':
      case 'ArrowLeft':
        eventLInstance.turnLeft90Deg();
        break;
      case 'q':
        eventLInstance.turnALittleLeft();
        break;

      case 'e':
        eventLInstance.turnALittleRight();
        break;
    }
  },[]);




  useEffect(() => {
    window.addEventListener("keydown", handleClick);
    window.addEventListener("keyup",  eventLInstance.setDefault);
    return () => {
      window.removeEventListener("keydown", handleClick);
      window.removeEventListener("keyup",  eventLInstance.setDefault);
    };
  }, []);



  return (
    <div className={classnames(styles.wrapper, isParentActive && styles.elementActive)}>
      <div className={classnames(styles.circle)}>
        <div className={classnames(styles.cell, styles.centerButtons, styles.centerLeft,
          isActive.centerLeft && styles.cellIsActive)
        }
             onMouseDown={eventLInstance.centerLeftMeasure}
             onMouseUp={eventLInstance.setDefault}
        >
          <div className={classnames(styles.innerCell)}>
            M
          </div>
        </div>
        <div className={classnames(styles.cell, styles.centerButtons, styles.centerRight,
          isActive.centerRight && styles.cellIsActive
        )}
             onMouseDown={eventLInstance.centerRightSendMap}
             onMouseUp={eventLInstance.setDefault}
        >
          <div className={classnames(styles.innerCell)}>
            T
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
             onMouseDown={eventLInstance.turnRight90deg}
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
             onMouseDown={eventLInstance.turnLeft90Deg}
             onMouseUp={eventLInstance.setDefault}
        >
          <div className={classnames(styles.innerCell)}>
            <GoIcon fill={'red'} position={'left'}/>
          </div>
        </div>

        {/*modify us */}
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

        {/*end*/}





      </div>

    </div>
  );
};

export default RemoteController;
