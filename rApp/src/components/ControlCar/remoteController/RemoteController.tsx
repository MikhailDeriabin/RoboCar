import React, {useCallback, useEffect, useState} from 'react';
import styles from './RemoteController.module.scss';
import classnames from "classnames";
import GoIcon from "../../UI/GoIcon";


const RemoteController = () => {

  const defaultIsActive = {
    centerLeft: false,
    centerRight: false,
    top: false,
    right: false,
    bottom: false,
    left: false,
  }

  // console.log('rerender test')

  //
  const [isActive, setIsActive] = useState(defaultIsActive);

  //for css only
  const [isParentActive, setIsParentActive] = useState<boolean>(false);



  const eventLogic = () => {
  return {
    'centerLeft': function (){
      setIsActive({...isActive , centerLeft: !isActive.centerLeft });
      setIsParentActive(true);
    },
    'centerRight': function (){
      setIsActive({...isActive , centerRight: !isActive.centerRight });
      setIsParentActive(true);
    },
    'top': function (){
      setIsActive({...isActive , top: !isActive.top });
      setIsParentActive(true);
    },
    'right': function (){
      setIsActive({...isActive , right: !isActive.right });
      setIsParentActive(true);
    },
    'bottom': function (){
      setIsActive({...isActive , bottom: !isActive.bottom });
      setIsParentActive(true);
    },
    'left': function (){
      setIsActive({...isActive , left: !isActive.left });
      setIsParentActive(true);
    },
    'setDefault': function (){
      setIsActive(defaultIsActive);
      setIsParentActive(false);
    },
  }
  }
  const eventLInstance = eventLogic();

  const handleClick = useCallback((event:any) => {
    switch (event.key){
      case 'm':
        eventLInstance.centerLeft();
        break;
      case 'k':
        eventLInstance.centerRight();
        break;
      case 'w':
      case 'ArrowUp':
        eventLInstance.top();
        break;
      case 'd':
      case 'ArrowRight':
        eventLInstance.right();
        break;
      case 's':
      case 'ArrowDown':
        eventLInstance.bottom();
        break;
      case 'a':
      case 'ArrowLeft':
        eventLInstance.left();
        break;
    }
  },[]);


  useEffect(() => {
    window.addEventListener("keypress", handleClick);
    window.addEventListener("keyup",  eventLInstance.setDefault);
    return () => {
      window.removeEventListener("keypress", handleClick);
      window.addEventListener("keyup",  eventLInstance.setDefault);
    };
  }, []);

  return (
    <div className={classnames(styles.wrapper, isParentActive && styles.elementActive)}>
      <div className={classnames(styles.circle)}>
        <div className={classnames(styles.cell, styles.centerButtons, styles.centerLeft,
          isActive.centerLeft && styles.cellIsActive)
        }
             onMouseDown={eventLInstance.centerLeft}
             onMouseUp={eventLInstance.setDefault}
        >
          <div className={classnames(styles.innerCell)}>
            M
          </div>
        </div>
        <div className={classnames(styles.cell, styles.centerButtons, styles.centerRight,
          isActive.centerRight && styles.cellIsActive
        )}
             onMouseDown={eventLInstance.centerRight}
             onMouseUp={eventLInstance.setDefault}
        >
          <div className={classnames(styles.innerCell)}>
            K
          </div>
        </div>
        <div className={classnames(styles.cell, styles.directionButtons, styles.top,
          isActive.top && styles.cellIsActive
        )}
             onMouseDown={eventLInstance.top}
             onMouseUp={eventLInstance.setDefault}
        >
          <div className={classnames(styles.innerCell)}>
            <GoIcon fill={'red'} position={'top'}/>
          </div>
        </div>
        <div className={classnames(styles.cell, styles.directionButtons, styles.right,
          isActive.right && styles.cellIsActive
        )}
             onMouseDown={eventLInstance.right}
             onMouseUp={eventLInstance.setDefault}
        >
          <div className={classnames(styles.innerCell)}>
            <GoIcon fill={'red'} position={'right'}/>
          </div>
        </div>
        <div className={classnames(styles.cell, styles.directionButtons, styles.bottom,
          isActive.bottom && styles.cellIsActive
        )}
             onMouseDown={eventLInstance.bottom}
             onMouseUp={eventLInstance.setDefault}
        >
          <div className={classnames(styles.innerCell)}>
            <GoIcon fill={'red'} position={'bottom'}/>
          </div>
        </div>
        <div className={classnames(styles.cell, styles.directionButtons, styles.left,
          isActive.left && styles.cellIsActive
        )}
             onMouseDown={eventLInstance.left}
             onMouseUp={eventLInstance.setDefault}
        >
          <div className={classnames(styles.innerCell)}>
            <GoIcon fill={'red'} position={'left'}/>
          </div>
        </div>

      </div>

    </div>
  );
};

export default RemoteController;
