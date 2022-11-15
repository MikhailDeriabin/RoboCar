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
  name: string,
  width: number,
  height: number,
}
interface IMapDataGetFromApi extends IMapDataBase{
  id:number,
  creationDate: string
}

interface IMapDataWithPoints extends IMapDataBase{
  points: IPointsInfo[]
}

export interface IMapDataPost extends IMapDataWithPoints{}

export interface IMapDataGetWithoutPoints extends IMapDataGetFromApi{}

export interface IMapDataGetOne extends IMapDataGetFromApi,IMapDataWithPoints{}






//
// export interface Imap{
//
// }

// export interface ObjectWithId extends Object{
//   id:number;
// }
