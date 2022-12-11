const { app, BrowserWindow , ipcMain, shell, Menu, remote:{dialog}} = require('electron');
const path = require('path')
var win; // danger, need to seek a way to fix
var menu;
var RIPC;

const createWindow = () => {
  win = new BrowserWindow({
    width: 840,
    height: 460,
    frame: false,
    resizable: false,
    transparent: true,
    // useContentSize: true,
    maximizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  })

  var pushlog;
  RIPC = (log) => {win.webContents.send('RIPC', log)}

  menu = Menu.buildFromTemplate(
    [
      {
        label: app.name,
        submenu:[
          {
            RIPC: RIPC,
            label: 'RIPC'
          }
        ]
      }
    ]
  )

  Menu.setApplicationMenu(menu);
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow()
})

// start command processor

var MIPC = (cmd) => {
  switch(cmd){
    case "shutProgram":
      shutProc();
      break;
    case "refresh":
      console.log("srft");
      break;
    case "minwin":
      win.minimize();
      break;

    default:
      var thiscom = cmd.split("#");
      switch(thiscom[0]){
        case "link":
          shell.openExternal(thiscom[1]);
          break;
        case "mainTest":
          RIPC("plog#114514");
          break;

      }
      break;
  }
}


// end command processor

ipcMain.on('MIPC', (event, cmd) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
   // win.MIPC(cmd);
    MIPC(cmd);
  }
)

const shutProc = () => {
  //procedure to shut projbobcat
  app.quit();
}

// launcherInfoGate
var proc_uid, last_game, game_list, laun_prof, uid_list;
// the selected uid; the last runned game(can be pinned at top); the full game list from projBobcat; the launcher setings read from local; the saved user-name from local.
