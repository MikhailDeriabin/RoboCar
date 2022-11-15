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

interface IMapDataBase{
  width: number,
  height: number,
}

interface IMapDataWithName{
  name: string,
}

interface IMapDataGetFromApi extends IMapDataBase{
  id:number,
  creationDate: string
}

interface IMapDataWithPoints extends IMapDataBase{
  points: IPointsInfo[]
}

export interface IMapDataPostWithoutName extends IMapDataWithPoints{}

export interface IMapDataPostWithName extends IMapDataWithPoints,IMapDataWithName{}

export interface IMapDataGetWithoutPoints extends IMapDataGetFromApi{}

export interface IMapDataGetOne extends IMapDataGetFromApi,IMapDataWithPoints{}






//
// export interface Imap{
//
// }

// export interface ObjectWithId extends Object{
//   id:number;
// }
