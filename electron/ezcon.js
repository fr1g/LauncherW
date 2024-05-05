const { spawn } = require('child_process');

const ls = spawn('ls', {
  encoding: 'utf8',
  cwd: process.cwd(), // 执行命令路径
  shell: true, // 使用shell命令
})

// 监听标准输出
ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

// 监听标准错误
ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

// 子进程关闭事件
ls.on('close', (code) => {
  console.log(`子进程退出，退出码 ${code}`);
});

// now frig on charge!

