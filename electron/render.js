var cmdPush;
const version = 0.1;

document.getElementById("re").onclick = () => {iMIPC("refresh"); window.location.reload()}
const on_series = "transition-all toggle off mr-1.5 p-1 px-1.5 bg-emerald-300 hover:bg-emerald-500 active:bg-emerald-700 border border-blue-100 rounded shadow-sm ml-0.5 mt-0.5 text-center";
const off_series = "transition-all toggle on mr-1.5 p-1 px-1.5 bg-rose-200 hover:bg-rose-300 active:bg-rose-400 border border-rose-100 rounded shadow-sm ml-0.5 text-center mt-0.5";
const swt_toggle_displayLogOnMain = document.getElementById("swtto");
var icmd = document.getElementById("icmd");
var innericmd = document.getElementById("innercmd");

var ajustat = false;

// register important structs
const boddy = document.getElementById("abody");
const donothing = () => {
    console.log("empty. did nothing and this was defined in renderer.js");
}

// register LAUNCH button
const lb = document.getElementById("launch");
lb.addEventListener("click", () => {
    iMIPC("mainTest#0");

})

// register CLOSE button
const closeButton = document.getElementById("close");
closeButton.addEventListener("click", () => {
    pushLog("再见...");
    boddy.classList.remove("mainShowOut");
    boddy.classList.add("mainShowIn");

    setTimeout(()=>{
        iMIPC("shutProgram");
        return
    }, 199);
})

// register MIN button
const minButton = document.getElementById("min");
minButton.addEventListener("click", () => {
    
    boddy.classList.remove("mainShowOut");
    boddy.classList.add("mainShowIn");
    setTimeout(()=>{
        iMIPC("minwin");
        boddy.classList.add("mainShowOut");
        boddy.classList.remove("mainShowIn");
        return
    }, 199);
})

// register SETTINGS button
const ajustes = document.getElementById("aju"); // bind button
const gamelistbut = document.getElementById("gamelistBut");
const jusr = document.getElementById("usrBut");
// 
const cow = document.getElementById("cout"); // child outer window

const iow_set = document.getElementById("settings");
const iow_usr = document.getElementById("userchoose");
const iow_lst = document.getElementById("gamelist");

const subAllReset = () => {try{
        iow_set.classList.replace("flew", "flyout");
        iow_usr.classList.replace("flew", "flyout");
        iow_lst.classList.replace("flew", "flyout");
        setTimeout(() => {
            iow_set.classList.replace("grid", "hidden");
            iow_usr.classList.replace("grid", "hidden");
            iow_lst.classList.replace("grid", "hidden");
            iow_set.classList.remove("flyout");
            iow_usr.classList.remove("flyout");
            iow_lst.classList.remove("flyout");
            if(cow.classList.contains("subShowOut")) cow.classList.replace("subShowOut", "hidden"); else cow.classList.add("hidden");
        }, 499);}catch(e){iMIPC("log#"+e)}
}
var u_dav = 0; // the close buttons should shown in seconds later
const closeAju = document.getElementsByClassName("aju-shut");// 0:settings 1:account 2:list
for(var thesubclose of closeAju){
    thesubclose.addEventListener("click", (event)=>{ // inside this anonymous func, can add the subwindow shut animation procedure.
        iMIPC("log#0\n"+event.currentTarget);
        event.currentTarget.parentNode.classList.add("hidden");
        setTimeout(() => {
            cow.classList.replace("subShowIn", "subShowOut");
            setTimeout(() => {
                subAllReset();
                event.currentTarget.parentNode.classList.remove("hidden");
            }, 170);
        }, 30);       
    });
}
const swiAju = () => {
    // before every switch, hide all but enable the need
    if(cow.classList.contains("hidden")){
        cow.classList.replace("hidden", "subShowIn"); //wait the cow animation
        setTimeout(()=>{
            iow_set.classList.replace("hidden", "grid");
            closeAju[0].parentNode.classList.add("hidden"); 
            closeAju[0].parentNode.classList.add("mainShowIn"); 
            iow_set.classList.add("flew");
            setTimeout(() => {
                closeAju[0].parentNode.classList.remove("hidden"); 
                closeAju[0].parentNode.classList.replace("mainShowIn", "mainShowOut"); 
            }, 499);
        }, 198);
    }
}
ajustes.addEventListener("click", swiAju);
const swiLst = () => {
// before every switch, hide all but enable the need
    if(cow.classList.contains("hidden")){  
        cow.classList.replace("hidden", "subShowIn"); //wait the cow animation
        setTimeout(()=>{
            iow_lst.classList.replace("hidden", "grid");
            closeAju[2].parentNode.classList.add("hidden"); 
            closeAju[2].parentNode.classList.add("mainShowIn"); 
            iow_lst.classList.add("flew");
            setTimeout(() => {
                closeAju[2].parentNode.classList.remove("hidden"); 
                closeAju[2].parentNode.classList.replace("mainShowIn", "mainShowOut"); 
            }, 499);
        }, 198);
    }
}
gamelistbut.addEventListener("click", swiLst);
//     
const swiUsr = () => {
    // before every switch, hide all but enable the need
    if(cow.classList.contains("hidden")){
        cow.classList.replace("hidden", "subShowIn"); //wait the cow animation
        setTimeout(()=>{
            iow_usr.classList.replace("hidden", "grid");
            closeAju[1].parentNode.classList.add("hidden"); 
            closeAju[1].parentNode.classList.add("mainShowIn"); 
            iow_usr.classList.add("flew");
            setTimeout(() => {
                closeAju[1].parentNode.classList.remove("hidden"); 
                closeAju[1].parentNode.classList.replace("mainShowIn", "mainShowOut"); 
            }, 499);
        }, 198);
    }
}
jusr.addEventListener("click", swiUsr);

// functional area start
// <=12 letters uid wont roll
//    --- log pusher

var logAreaInnerHeight;
const logArea = document.getElementById("logs");
const pushLog = (log) => {
    let elog = document.createElement("p");
    elog.innerHTML = log;
    iMIPC("clog#" + logAreaInnerHeight);

    if(logArea.children.length>=10 ) logAreaRemoveTwice();
    logArea.appendChild(elog);

    console.log("clog#" + logArea.children.length);
    // if(logArea.children.length > 0 ) for(let logChild of logArea){
    //     logAreaInnerHeight += logChild.style.clientHeight.replace('px', '').parseInt();
    // }
    if(logAreaInnerHeight >= 275) logAreaRemoveTwice();
    iMIPC("clog#Pushed log to the Window panel: "+elog);
    delete elog;
}

const logAreaRemoveTwice = () => {
    logArea.firstChild.remove();
    logArea.firstChild.remove();
}

window.onload = () =>{
    setTimeout(()=>{pushLog("LauncherW ver "+version+" 听悉君便");}, 365);
    setTimeout(() => {
        SCP("switch-shut-log");
    }, 1789);
}
swt_toggle_displayLogOnMain.addEventListener("click", () => SCP("switch-shut-log"));

// sub-command user-interface

icmd.addEventListener("submit", (event)=>{
    event.preventDefault();
    csub();
});

const csub = () => {
    var tobeexe = innericmd.value;
    pushLog("用户执行了命令："+tobeexe);
    SCP(tobeexe);
    delete tobeexe;
}

innericmd.addEventListener("keydown", (event) => {
    if(event.key == 'Enter'){
        icmd.csub();
    }
})

const logph = document.getElementById("phold");
const SCP = (cmd) =>
{
    // the in-renderer command processor
    var pcmd = cmd.split("#");
    switch(pcmd[0]){
        case "settings":
            break;
        case "refresh":
            window.location.reload();
            break;
        case "switch-user":
            break;
        case "target-version":
            break;
        case "clear":
            logArea.innerHTML = "";
            break;
        case "switch-shut-log":
            
            if(logArea.classList.contains("hidden"))
            {
                logArea.classList.remove("hidden");
                logph.classList.add("hidden");
                switchThis();
            }else{
                logArea.classList.add("hidden");
                logph.classList.remove("hidden");
                switchThis();
            }

            break;
        case "forceoff":
            iMIPC("shutProgram")
            break;
        case "toMIPC":
            var pu = cmd.replace("toMIPC#", "");
            iMIPC(pu);
            pushLog("尝试传递指令到MIPC: "+pu);
            break;
        case "toRIPC":
            var dot = cmd.replace("toRIPC#", "");
            iRIPC(dot);
            pushLog("尝试传递指令到RIPC: "+dot);
            break;
        case "run":
            break;
        case "cmd":
            iMIPC(cmd);
            break;
        default:
            pushLog("渲染进程检测到了未指定的内部命令头："+pcmd[0]+" ; 而这个完整的命令是："+cmd);
            break; //
    }
}

// kill vanilla atag\
const a_pbc = document.getElementById("link-pbc");
const a_ejs = document.getElementById("link-ejs");

a_pbc.onclick = () => iMIPC("link#https://github.com/Corona-Studio/ProjBobcat/");
a_ejs.onclick = () => iMIPC("link#https://www.electronjs.org/");

const switchThis = () => {
    if(logArea.classList.contains("hidden")) 
    {
        swt_toggle_displayLogOnMain.innerHTML="点击开启";
        swt_toggle_displayLogOnMain.className = on_series;
    }
    else 
    {
        swt_toggle_displayLogOnMain.innerHTML="点击关闭";
        swt_toggle_displayLogOnMain.className = off_series;
    }
}

// command receive from Main JS

window.electronAPI.RIPC((event, cmd) => iRIPC(event, cmd));

const iMIPC = (cmd) => {
    window.electronAPI.MIPC(cmd);
}

const iRIPC = (event, cmd)=>{
    var cmdP = cmd.split("#");
    switch(cmdP[0]){
        case "plog":
            pushLog(cmdP[1])
            break;
    }
}