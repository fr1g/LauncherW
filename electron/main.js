const { app, BrowserWindow , ipcMain, shell, Menu} = require('electron');
const path = require('path');
const icmd = require('./cmd.js');
var win; // danger, need to seek a way to fix
var menu;
var RIPC, passWindow;
app.name = 'LauncherW';
// launcherInfoGate
var proc_uid, last_game, game_list, laun_prof, uid_list;
// the selected uid; the last runned game(can be pinned at top); the full game list from projBobcat; the launcher setings read from local; the saved user-name from local.

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
  setTimeout(() => {
    console.log("Waiting for container...");
    createWindow();
  }, 300); // constant
})

// const passWindow = () => window.webContents.openDevTools();;

// start command processor

const pushLog = (log) => {
  RIPC('plog#' + log);
}

var MIPC = (cmd) => {
  switch(cmd){
    case "shutProgram":
      shutProc();
      break;
    case "shut":
      shutProc();
      break;
      case "refresh":
      console.log("Render reset...");
      break;
    case "minwin":
      win.minimize();
      break;
    case "dev":
      //passWindow();
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
        case "log":
          logd(thiscom[1]);
          break;
        case "cmd":
          icmd.actionCommand(thiscom[1]);
          break;
        case "consolelog" || "log" || "clog":
          logd(thiscom[1]);
      

      }
      break;
  }
}

const logd = (logs) => {
    console.log(logs);
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
  //procedure to shut projbobcat should write here.
  app.quit();
}

// projbobcat command send handler and the command should like this:
// inner-command-head#pre-loads#xxx. and the XXX should contain no sharps.
// the XXX format should be like: {cmdhead}{cmdsub}{detail}{with}{additional}. after sent here, perhaps, if we really use this form, should delete the start and end {}. then split by using }{.






exports.pushLog = pushLog;
