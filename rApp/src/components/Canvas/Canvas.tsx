import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import styles from './Canvas.module.scss';
import PopUpNormal from '../PopUp/PopUpNormal';
import { nanoid } from 'nanoid';
import { IPointsInfo } from '../../types/types';



interface CanvasProps{
  width:number;
  height: number;
  pointsDefault?: IPointsInfo[];
}
/**
 *
 * @param width in CMs
 * @param height in CMs
 * @param pointsDefault
 * @constructor
 */
const Canvas = ({
                  width,
                  height,
                  pointsDefault = [{
                    id: 0,
                    temp: 's',
                    humidity: 's',
                    light_intensity : 's',
                    is_tilted: false,
                    x: 400,
                    y: 50,
                  },
                    {
                      id: 1,
                      temp: 's',
                      humidity: 's',
                      light_intensity : 's',
                      is_tilted: false,
                      x: 50,
                      y: 100,
                    },
                    {
                      id: 2,
                      temp: 's',
                      humidity: 's',
                      light_intensity : 's',
                      is_tilted: false,
                      x: 55,
                      y: 1200,
                    }
                  ]
                }:CanvasProps) => {


  const canvasRef = useRef(null);
  const [points, setPoints] = useState(pointsDefault);

  /**
   * scale ratio px:cm
   */


  const calculateScale = (width:number,height:number,constantSideValue:number):number => {
    const comparableValue = (width>height) ? width : height;
    return 100 / ((comparableValue * 100)/ constantSideValue);
  }
  const constantSideValue = 400;

  const scaleK = calculateScale(width,height,constantSideValue);

  console.log(scaleK)


  const scaledWidth = (width * scaleK);
  const scaledHeight = (height * scaleK);



  const scaledWidthPx = (width * scaleK) + 'px';
  const scaledHeightPx = (height * scaleK) + 'px';

  // const WidthPx = (width) + 'px';
  // const HeightPx = (height) + 'px';

  // Cartesian system + scale ratio
  const X = (x:number) => x * scaleK;
  const Y = (y: number) => y * scaleK * -1;

  // @ts-ignore

  let[canvasGlobal,setCanvasGlobal] = useState(null);
  let[circlesGlobal,setCirclesGlobal] = useState<Path2D[]>([]);

    useLayoutEffect(()=>{
      const canvas = canvasRef.current;
      setCanvasGlobal(canvas);
        // @ts-ignore
        const context = canvas.getContext('2d');

        context.fillStyle = 'white';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);


        //new center
        context.translate(0, context.canvas.height);
        context.lineWidth = 10;


        //drow lines
        context.moveTo(0, 0);
        context.lineTo(X(0), Y(200));
        context.lineTo(X(200), Y(200));
        context.lineTo(X(200), Y(100));
        context.strokeStyle = '#ff0000';
        context.stroke();


        const circles = points.map(p => {
          let str = new Path2D();
          str.arc(X(p.x), Y(p.y), 5, 0, 2 * Math.PI);
          context.fillStyle = 'red';
          context.fill(str);
          return str;
        });
        setCirclesGlobal(circles);

        // Listen for mouse moves
        // @ts-ignore
        canvas.addEventListener('mousemove', function addPoints(event) {

          circles.map((c, index) => {

            if (context.isPointInPath(c, event.offsetX, event.offsetY)) {
              // context.fillStyle = 'orange';
              // context.fill(c);
            }
            else{
              context.fillStyle = 'red';
              context.fill(c);
            }
          })
            return () => {

              // @ts-ignore
              canvas.removeEventListener("mousemove", addPoints);
            }
        }
        )




    },[])


    return (

      <>
        <div className={styles.canvasWrapper}>

          {/*<PopUpNormal  coords={{ x:150,y:scaledHeight - Y(50)*-1}} title={'Info'}*/}
          {/*             key={nanoid()} />*/}

          {points.map((p) => (
            <PopUpNormal ObjectToShowId={p.id} circlesGlobal={circlesGlobal} canvas={canvasGlobal} objectToShow={p} coords={{ x: X(p.x), y: (scaledHeight*0.9775 - Y(p.y)*-1) }} title={'Info'}
                         key={nanoid()} />

          ))}


          <div className={styles.canvas}>


            <span className={styles.x}>X={width}cm</span>
            <span className={styles.y}>Y={height}cm</span>

            <canvas
              ref={canvasRef}

              width={scaledWidthPx}
              height={scaledHeightPx}

              // width={WidthPx}
              // height={HeightPx}

              // width={'400px'}
              // height={'400px'}

              // width={'200px'}
              // height={'400px'}

              // width={'400px'}
              // height={'200px'}

            />

          </div>

          <div className={styles.zeroScale}>
            <span className={styles.zero}>0</span>
            {/*<span className={styles.scale}>Scale: {scaleK.toFixed(2)}:1 (px:cm)</span>*/}
            {scaleK >= 1 && <span className={styles.scale}>S: {scaleK.toFixed(2)}:1 (px:cm)</span>}

            {scaleK < 1 && <span className={styles.scale}>S: 1:{(10*scaleK).toFixed(2)} (px:cm)</span>}

            {/*<span className={styles.scale}>S: {scaleK.toFixed(2)}:1 (px:cm)</span>*/}
          </div>
        </div>

      </>

    );


}

export default React.memo(Canvas)


