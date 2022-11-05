import React, { useRef, useEffect, useState, useMemo } from 'react';
import styles from './Canvas.module.scss';
import PopUp from '../PopUp/PopUp';
import useUpdateEffect from '../../hooks/useUpdateEffect';




interface HandlePopUpProps{
  coords: {
    x: number,
    y: number
  },
  signal?: boolean
  destroySignal?: boolean
  objectToShow? : Object
}
const  HandlePopUp = ({signal,coords,objectToShow}:HandlePopUpProps) =>{
  // const [popUp,setPopUp] = useState([]);

  // const saveSignal = useMemo(()=>{
  //
  //   if()
  //
  //
  //   return signal;
  // },[signal])

  // const [someCoords] = useState({
  //   x: 0,
  //   y: 0
  // })
  //
  // const [finalCoords,setFinalCoords] = useState({
  //   x: 0,
  //   y: 0
  // })
  //
  // useUpdateEffect(()=>{
  //     setFinalCoords({x:coords.x, y:coords.y})
  //   // @ts-ignore
  //     setPopUp(popUp.concat(<PopUp title={'Info'} coords={{y:coords.y,x:coords.x}}/>));
  //   // }
  // },[signal])

  // useUpdateEffect(() => {
  //   // Specify how to clean up after this effect:
  //   return function cleanup() {
  //     // @ts-ignore
  //     setPopUp([]);
  //   }
  // },[destroySignal]);

  // @ts-ignore
  return(

    <><PopUp title={'Info'} coords={{y:coords.y,x:coords.x}} objectToShow={objectToShow} /></>

     // <>
     //  {<b>
     //    ({someCoords.x}, {someCoords.y})
     //  </b>}
     //  {/*{ popUp.map((item) =><PopUp title={'Info'} coords={{x: finalCoords.x, y : finalCoords.y}}/>)}*/}
     //  { popUp.map((item) => <>{item}</>)}
     // </>)
  )
}




interface CanvasProps{
  width:number;
  height: number
}
/**
 *
 * @param width in CMs
 * @param height in CMs
 * @constructor
 */
const Canvas = ({width,height}:CanvasProps) => {

  // const [signal,setSignal] = useState(false);

  const canvasRef = useRef(null);


  /**
   * scale ratio 2:1  px:cm
   */
  const scaleK = 2;
  const scaledWidth = (width * scaleK) + 'px'
  const scaledHeight = (height * scaleK) + 'px'

  // Cartesian system + scale ratio
  const X = (x:number) => x * scaleK;
  const Y = (y: number) => y * scaleK * -1;



  useEffect(() => {
    const canvas = canvasRef.current;
    // @ts-ignore
    const context = canvas.getContext('2d');

    context.fillStyle = 'white';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    // circle sample
    // const circle = new Path2D();
    // circle.arc(X(150), Y(50), 5, 0, 2 * Math.PI);
    // context.fillStyle = 'red';
    // context.fill(circle);
    //
    // const circleTwo = new Path2D();
    // circleTwo.arc(X(100), Y(50), 5, 0, 2 * Math.PI);
    // context.fillStyle = 'red';
    // context.fill(circleTwo);





    //new center
    context.translate(0,context.canvas.width);
    context.lineWidth = 10;

    //drow lines
    context.moveTo(0,0);
    context.lineTo(X(0),Y(190));
    context.lineTo(X(20),Y(190));
    context.lineTo(X(20),Y(180));
    context.strokeStyle = '#ff0000';
    context.stroke();


    // context.fill(circle);
    // context.fill(circleTwo);


    // let circlesIds = [];

    const circles = points.map(p=>{
      // let str = p.id + '_circle'+" = undefined";
      // eval(str);

      // @ts-ignore
      // const circleName = p["circle_" + p.id];

      let str = new Path2D();
      // @ts-ignore
      // this[p.id + '_circle'].arc(X(p.x),Y(p.y),5, 0, 2 * Math.PI);
      str.arc(X(p.x),Y(p.y),5, 0, 2 * Math.PI);
      context.fillStyle = 'red';
      context.fill(str);

      // return str;

    });

    // console.log(circles.str)

    // Listen for mouse moves
    // @ts-ignore
    canvas.addEventListener('mousemove', function addPoints(event) {

    //   for (let i = circles.length - 1; i >= 0; i--){
    //
    //
    //     if (circles[i] && context.isPointInPath(circles[i], event.offsetX, event.offsetY)) {
    //       // canvas.style.cursor = 'pointer';
    //       context.fillStyle = 'orange';
    //       context.fill(circles[i]);
    //       return
    //     } else {
    //       // document.getElementById("canvas").style.cursor = 'default';
    //       context.fillStyle = 'red';
    //       for (let d = circles.length - 1; d >= 0; d--){
    //         context.fill(circles[d]);
    //       }
    //     }
    //   }
    //
    // });



      // // Check whether point is inside circle
      // if (context.isPointInPath(circle, event.offsetX, event.offsetY)) {
      //   context.fillStyle = 'green';
      //   context.fill(circle);
      //   // setCoords({x: event.pageX,y: event.pageY })
      //   // console.log({x: event.pageX,y: event.pageY })
      //   // setDestroySignal(!destroySignal);
      //   // setPopUpSignal(!popUpSignal);
      // }
      // else {
      //   context.fillStyle = 'red';
      //   context.fill(circle);
      //   // setDestroySignal(!destroySignal);
      // }


      // if (context.isPointInPath(circleTwo, event.offsetX, event.offsetY)) {
      //   context.fillStyle = 'yellow';
      //   context.fill(circleTwo);
      //   setCoords({x: event.pageX,y: event.pageY });
      //   setDestroySignal(!destroySignal);
      //   setPopUpSignal(!popUpSignal);
      // }
      // else {
      //   context.fillStyle = 'red';
      //   context.fill(circleTwo);
      // }




      return () =>{
        // @ts-ignore
        canvas.removeEventListener("mousemove",addPoints);
      }

    });




  }, [])

//   const [popUpSignal,setPopUpSignal] = useState(false);
//   const [destroySignal,setDestroySignal] = useState(false);
//   const [coords, setCoords] = useState({x: 0, y: 0});
//
// const click = () => {
//     // setPopUpSignal(!popUpSignal)
//     setDestroySignal(!destroySignal);
// }

const points = [{
    id:0,
    hello: 1,
    bye: 2,
    morning: 3,
    x: 150,
    y: 50
},
  {
    id:1,
    privet:1,
    poka:2,
    dobroe:3,
    x: 100,
    y:50
}]



  return (

  <>
    {/*<button onClick={()=>click()}>hello</button>*/}



    {/*<HandlePopUp coords={{x: coords.x, y: coords.y}} signal={popUpSignal} destroySignal={destroySignal}/>*/}


    <div className={styles.canvasWrapper}>

      <div className={styles.canvas}>

        {points.map((p)=> <>
          {/*<HandlePopUp coords={p.coords}/>*/}
          <HandlePopUp objectToShow={p} coords={
            {
              x: X(p.x),
              y: Y(p.y) *-2
            }
          }/>
        </>)}

        <span className={styles.x}>X={width}cm</span>
        <span className={styles.y}>Y={height}cm</span>

      <canvas
        ref={canvasRef}
        width={scaledWidth}
        height={scaledHeight}
        // width={400}
        // height={400}
      />

      </div>

      <div className={styles.zeroScale}>
        <span className={styles.zero}>0</span>
        <span className={styles.scale}>Scale: {scaleK}:1 (px:cm)</span>
        </div>
    </div>

  </>

  );


}



export default Canvas
