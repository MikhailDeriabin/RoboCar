/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
const IconPath = path.join(__dirname, 'img', 'logo.png');
const mqtt = require('mqtt');
import sqlite3 from 'sqlite3'

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

// const database = new sqlite3.Database('./public/db.sqlite3', (err: any) => {
// const database = new sqlite3.Database('./public/db.sqlite3', (err: any) => {
// const db = new sqlite3.Database('./db/memory.db', (err: any) => {
//   if (err) console.error('Database opening error: ', err);
// });
//
// db.serialize(() => {
//   db.run('CREATE TABLE lorem (info TEXT)');
//
//   const stmt = db.prepare('INSERT INTO lorem VALUES (?)');
//   for (let i = 0; i < 10; i += 1) {
//     stmt.run(`Ipsum ${i}`);
//   }
//   stmt.finalize();
//
//   db.each('SELECT rowid AS id, info FROM lorem', (_err, row) => {
//     console.log(`${row.id}: ${row.info}`);
//   });
// });
//
// db.close();




ipcMain.on('asynchronous-message', (event, arg) => {
  const sql = arg;
  db.all(sql, (err: { message: any; }, rows: any) => {
    event.reply('asynchronous-reply', (err && err.message) || rows);
  });
});


if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    // icon: getAssetPath('https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200X200.png'),
    // icon: IconPath,
    webPreferences: {
      nodeIntegration: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);



// // renderer.js
// const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
//
// const host = 'mqtt://broker.emqx.io:1883'
//
// const options = {
//   keepalive: 30,
//   clientId: clientId,
//   protocolId: 'MQTT',
//   protocolVersion: 4,
//   clean: true,
//   reconnectPeriod: 1000,
//   connectTimeout: 30 * 1000,
//   will: {
//     topic: 'WillMsg',
//     payload: 'Connection Closed abnormally..!',
//     qos: 0,
//     retain: false
//   },
//   rejectUnauthorized: false
// }
//
// // Information about the mqtt module is available
// console.log(mqtt)
//
// console.log('connecting mqtt client')
// const client = mqtt.connect(host, options)
//
// client.on('error', (err: any) => {
//   console.log('Connection error: ', err)
//   client.end()
// })
//
// client.on('reconnect', () => {
//   console.log('Reconnecting...')
// })
//
// client.on('connect', () => {
//   console.log('Client connected:' + clientId)
//   client.subscribe('testtopic/electron', {
//     qos: 0
//   })
//   client.publish('testtopic/electron', 'Electron connection demo...!', {
//     qos: 0,
//     retain: false
//   })
// })
//
// client.on('message', (topic: string, message: { toString: () => string; }, packet: any) => {
//   console.log('Received Message: ' + message.toString() + '\nOn topic: ' + topic)
// })


