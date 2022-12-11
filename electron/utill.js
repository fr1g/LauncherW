const closeButton = document.getElementById("close");
const reva = document.getElementById("titlelan");

var quitall = () => {

    console.log("aaa");
    reva.innerHTML = "aaaa";
    try {
        var ipcRender = require('electron').ipcRenderer;
        ipcRender.send('shutProcess', 'shutProc');
    }
    catch (e) {
        console.log(e);
    }
}

closeButton.onclick = quitall();

