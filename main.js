/**
 * @link https://www.electronjs.org/ru/docs/latest/tutorial/window-customization
 * @link https://spdx.org/licenses/
 * @link https://docs.npmjs.com/cli/v9/configuring-npm/package-json
 * @link https://electron.guide/final-polish/renderer/
 * @link https://electron.guide/final-polish/application/
 * @link https://www.electronjs.org/docs/latest/tutorial/security
 * @link https://github.com/Teamwork/node-auto-launch
 * @link https://blog.dcpos.ch/how-to-make-your-electron-app-sexy
 * @link https://blog.inkdrop.app/how-to-make-your-electron-app-launch-1000ms-faster-32ce1e0bb52c
 * @link https://dev.to/xxczaki/how-to-make-your-electron-app-faster-4ifb
 * @link https://astec.net/insights-news/sexy-electron/?geo=us
 * @link https://nodejs.dev/en/learn/reading-files-with-nodejs/
 */
const { app, BrowserWindow, shell, powerSaveBlocker } = require('electron')
//const ip = require('ip');
//const electronLocalshortcut = require('electron-localshortcut')
//const debug = require('electron-debug');
require('v8-compile-cache');

const nodeFs = require('fs');
const nodePath = require('path');

const configRootPath = nodePath.join(app.getPath('desktop'), 'config.json');

// Настройки по умолчанию.
const defaults = {
  pylon_id: 1,
  environment: 'development'
};

let config;

try {
  config = nodeFs.readFileSync(configRootPath, 'utf-8')
  config = JSON.parse( config );
} catch ( err ) {
  config = defaults;
}//console.log(config);

//debug();

const URL = require('url').URL
const API = 'https://nav.erevanplaza.ru';

// Запретить запускать более одной копии приложения.
if ( ! app.requestSingleInstanceLock() ) {
  app.exit( 0 )
  //app.quit();
}

/**
 * Запретить переходить по внешним ссылкам.
 */
/*app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)
    if ( parsedUrl.origin !== API ) {
      event.preventDefault()
    }
  });

  contents.setWindowOpenHandler(({ url }) => {
    return { action: 'deny' }
  })
})*/

function createWindow () {
  const win = new BrowserWindow({
    show: false,
    backgroundColor: '#333333',
    fullscreen: true,
    frame: false,
    alwaysOnTop: true,
    darkTheme: true,
    titleBarStyle: 'hidden',
    icon: __dirname + '/images/icon-270.png',
  })

  win.loadURL( API + '/?pylon_id=' + config.pylon_id );

  win.once('ready-to-show', () => {
    win.show();
  })

  // Запретить выходить из полноэкранного режима.
  //win.on('leave-full-screen', () => {
  //  win.setFullScreen(true);
  //})

  // Запертить жмакать ctrl+r
  //win.on('focus', (event) => {
  //  electronLocalshortcut.register(
  //      win,
  //      ['CommandOrControl+R','CommandOrControl+Shift+R', 'F5'],
  //      () => {
  //        console.log('CommandOrControl+R');
  //      }
  //  )
  //})

  //win.on('blur', (event) => {
  //  electronLocalshortcut.unregisterAll(win)
  //})
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})