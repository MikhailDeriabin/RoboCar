export interface IPointsInfo{
  id: number,
  temp: number,
  humidity: number,
  lightIntensity : number,
  isTilted: boolean,
  x: number,
  y: number,
}

export interface CoordsDistanceObject {
  distanceFront : number,
  distanceRight : number,
  distanceLeft : number,
}

// export interface ObjectWithId extends Object{
//   id:number;
// }
