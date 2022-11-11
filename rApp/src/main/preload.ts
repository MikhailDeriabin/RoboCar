import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

// const electron = window.require('electron');
// const { ipcRenderer } = electron;


export function sendAsync(sql: any) {
  return new Promise((resolve) => {
    ipcRenderer.once('asynchronous-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('asynchronous-message', sql);
  });
}



export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },

    sendAsync(sql: any) {
      return new Promise((resolve) => {
        ipcRenderer.once('asynchronous-reply', (_, arg) => {
          resolve(arg);
        });
        ipcRenderer.send('asynchronous-message', sql);
      });
    },

    sendAsync2(channel: Channels,func: (...args: unknown[]) => void){
      ipcRenderer.once(channel, ((_event, ...args) => func(...args)))
    }


  },
});




// const mqtt = require('mqtt')
// // @ts-ignore
// window.mqtt = mqtt
//
// export const newMqtt = mqtt
