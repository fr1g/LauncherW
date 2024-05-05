const { spawn } = require('child_process'); // 使用node child_process模块
const MainProc = require('./main.js');
var addPath = "", path = './';
var commandArr = [], commandMsg = [];
var icommand;

// 执行命令行
function actionCommand(command) {
  icommand = command;
  // 处理command命令 
  command = command.trim();
  if (command === '') return;
  // 执行命令行
  action = true;
  handleCommand = cdCommand(command)
  const ls = spawn(handleCommand, {
    encoding: 'utf8',
    cwd: path, // 执行命令路径
    shell: true, // 使用shell命令
  })
  // 监听命令行执行过程的输出
  ls.stdout.on('data', (data) => {
    const value = data.toString().trim()
    commandMsg.push(value)
    MainProc.pushLog(`stdout: ${value}`)
  })

  ls.stderr.on('data', stderrMsgHandle)
  ls.on('close', closeCommandAction)
}

const cdCommand = (command) => {
  let pathCommand = '';
  if (command.startsWith('cd ')) {
    pathCommand = './'
  } else if (command.indexOf(' cd ') !== -1) {
    pathCommand = './'
  }
  return command + pathCommand
}


// 错误或详细状态进度报告 比如 git push
function stderrMsgHandle(data) {
  MainProc.pushLog(`stderr: ${data}`)
  commandMsg.push(`stderr: ${data}`)
}


// 执行完毕 保存信息 更新状态
function closeCommandAction(code) {
  // 保存执行信息
  commandArr.push({
    code, // 是否执行成功
    path: path, // 执行路径
    command: icommand, // 执行命令
    commandMsg: commandMsg.join('\r'), // 执行信息
  })
  // 清空
  // updatePath(handleCommand, code)
  commandFinish()
  MainProc.pushLog(
    `子进程退出，退出码 ${code}, 运行${code === 0 ? '成功' : '失败'}`
  )
}

const commandFinish = () => {
  commandMsg = [];
  commandArr = [];
  return
}

exports.actionCommand = actionCommand;
// exports.actionCommand = actionCommand;
// exports.actionCommand(itm) = actionCommand(itm);
// module.exports = {
//   actionCommand: actionCommand
// }