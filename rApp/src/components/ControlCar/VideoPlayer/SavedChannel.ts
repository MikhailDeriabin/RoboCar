export class SavedChannel {

  private _channel:string

  private static instance: SavedChannel;


  private constructor() {
    this._channel = ''
  }

  public static getInstance(): SavedChannel {
    if (!SavedChannel.instance) {
      SavedChannel.instance = new SavedChannel();
    }
    return SavedChannel.instance;
  }

  public get channel (){
    return this._channel
  }

  public set channel (newChannel){
    this._channel = newChannel
  }

}




