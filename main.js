/**
 * @link https://www.electronjs.org/ru/docs/latest/tutorial/window-customization
 */
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    show: false,
    backgroundColor: '#333333',
    //parent: 'top',
    //modal: true,
    fullscreen: true,
    frame: false,
    alwaysOnTop: true,
    darkTheme: true,
    titleBarStyle: 'hidden',
    icon: __dirname + '/images/icon-270.png',
    //transparent: true
    //titleBarOverlay: true
  })

  const options = {
    //postData: [] // Сюда передать ID
  };
  win.loadURL('http://nav.erevanplaza.ru', options);

  win.once('ready-to-show', () => {
    win.show();
    //win.maximize();
  })

  // Запретить выходить из полноэкранного режима.
  win.on('leave-full-screen', () => {
    win.setFullScreen(true);
  })
}

app.whenReady().then(() => {
  createWindow()

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


