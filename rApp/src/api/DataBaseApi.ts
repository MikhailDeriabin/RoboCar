import {apiPath, controlCarPath} from "../data/paths";
import {IMapDataGetOne, IMapDataPostWithName} from "../types/types";


export class DataBaseApi {

  private apiPath: string;

  constructor() {

    this.apiPath = apiPath;

  }


  createNewMap = async (reqData: IMapDataPostWithName) => {
    const reqOptions = {
      headers:{
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({...reqData})
    }
    // @ts-ignore
    const resp = await fetch(`${apiPath}/map`, reqOptions);
    const respJson = await resp.json();
    return respJson;
  }

  getAllMaps = async () => {
    const reqOptions = {
      headers:{
        'Content-Type': 'application/json'
      },
      method: 'GET',
      credentials: 'include'
    }

    // @ts-ignore
    const resp = await fetch(`${apiPath}/map`, reqOptions);
    const respJson = await resp.json();
    // console.log(respJson);
    return respJson;

  }

  getMapById = async (id:number) => {
    const reqOptions = {
      headers:{
        'Content-Type': 'application/json'
      },
      method: 'GET',
      credentials: 'include'
    }

    // @ts-ignore
    const resp = await fetch(`${apiPath}/map/${id}`, reqOptions);
    const respJson = await resp.json();
    return respJson;
  }


  deleteMapById = async (id:number) => {
    const reqOptions = {
      headers:{
        'Content-Type': 'application/json'
      },
      method: "DELETE",
      credentials: 'include'
    }
    // @ts-ignore
    const resp = await fetch(`${apiPath}/map/${id}`, reqOptions);
    const respJson = await resp.json();
    return respJson;
  }

  getPointById = async (id:number) => {
    const reqOptions = {
      headers:{
        'Content-Type': 'application/json'
      },
      method: 'GET',
      credentials: 'include'
    }

    // @ts-ignore
    const resp = await fetch(`${apiPath}/point/${id}`, reqOptions);
    const respJson = await resp.json();
    return respJson;
  }

  deletePointById = async (id:number) => {
    const reqOptions = {
      headers:{
        'Content-Type': 'application/json'
      },
      method: "DELETE",
      credentials: 'include'
    }
    // @ts-ignore
    // const resp = await fetch(`${apiPath/point/{id}}`, reqOptions);
    const resp = await fetch(`${apiPath}/point/${id}`, reqOptions);
    const respJson = await resp.json();
    return respJson;
  }


}
