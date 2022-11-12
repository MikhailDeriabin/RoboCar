export interface IPointsInfo{
  id: number,
  temperature: number,
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

export interface ICreateNewMapReqData {
  name: string,
  width: number,
  height: number,
  points: IPointsInfo[]
}

// export interface ObjectWithId extends Object{
//   id:number;
// }
