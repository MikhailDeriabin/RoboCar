import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import styles from './Canvas.module.scss';
import PopUpNormal from '../PopUp/PopUpNormal';
import { nanoid } from 'nanoid';
import { IPointsInfo } from '../../types/types';



interface CanvasProps{
  width:number;
  height: number;
  maxSideSizeInPx?: number;
  pointsDefault?: IPointsInfo[];
  robotMovements?: {x: number, y: number}[]
}
/**
 *
 * @param width in CMs
 * @param height in CMs
 * @param pointsDefault
 * @param robotMovements
 * @constructor
 */
const Canvas = ({
                  width,
                  height,
                  maxSideSizeInPx = 400,
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
                      y: 200,
                    }
                  ],
                  robotMovements = [
                    {x:0,y:0},
                    {x:0,y:200},
                    {x:200,y:200},
                    {x:200,y:100},
                    {x:50,y:100},
                  ]
                }:CanvasProps) => {


  const canvasRef = useRef(null);
  const [points, setPoints] = useState(pointsDefault);

  /**
   * scale ratio px:cm
   */

  /**
   * The function which calculates the right scale of canvas by using maxSideSizeInPx as a reference
   * @param width
   * @param height
   * @param maxSideSizeInPx
   */
  const calculateScale = (width:number,height:number,maxSideSizeInPx:number):number => {
    const comparableValue = (width>height) ? width : height;
    return 100 / ((comparableValue * 100)/ maxSideSizeInPx);
  }

  const scaleK = calculateScale(width,height,maxSideSizeInPx);
  const scaledWidth = (width * scaleK);
  const scaledHeight = (height * scaleK);


  // Cartesian system + scale ratio
  const X = (x:number) => x * scaleK;
  const Y = (y: number) => y * scaleK * -1;



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
        function drawLines(){
          context.moveTo(0, 0);
        robotMovements.forEach((m)=>{
                  context.lineTo(X(m.x),Y(m.y));
                  })
          context.strokeStyle = '#5194f0';
          context.stroke();
        };
        drawLines();


        const circles = points.map(p => {
          let str = new Path2D();
          str.arc(X(p.x), Y(p.y), 7, 0, 2 * Math.PI);
          context.fillStyle = 'red';
          context.fill(str);
          return str;
        });
        setCirclesGlobal(circles);

        // Listen for mouse moves
        // @ts-ignore
        canvas.addEventListener('mousemove', function addPoints(event) {

          circles.map((c) => {

            if (context.isPointInPath(c, event.offsetX, event.offsetY)) {
              // context.fillStyle = 'orange';
              // context.fill(c);
            }
            else{
              context.fillStyle = '#FF0000';
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


          {points.map((p) => (
            <PopUpNormal ObjectToShowId={p.id} circlesGlobal={circlesGlobal} canvas={canvasGlobal} objectToShow={p} coords={{ x: X(p.x), y: (scaledHeight*0.9775 - Y(p.y)*-1) }} title={'Info'}
                         key={nanoid()} />

          ))}
          <div className={styles.canvas}>


            <span className={styles.x}>X={width}cm</span>
            <span className={styles.y}>Y={height}cm</span>

            <canvas
              ref={canvasRef}
              width={scaledWidth + 'px'}
              height={scaledHeight + 'px'}
            />
          </div>
          <div className={styles.zeroScale}>
            <span className={styles.zero}>0</span>
            {scaleK >= 1 && <span className={styles.scale}>S: {scaleK.toFixed(2)}:1 (px:cm)</span>}
            {scaleK < 1 && <span className={styles.scale}>S: 1:{(10*scaleK).toFixed(2)} (px:cm)</span>}
          </div>
        </div>
      </>
    );
}

export default React.memo(Canvas)


