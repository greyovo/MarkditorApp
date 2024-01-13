// import { promises } from 'node:fs'
// import { cwd } from 'node:process'
// import { ipcRenderer } from 'electron'

// ipcRenderer.on('main-process-message', (_event, ...args) => {
//   console.log('[Receive Main-process message]:', ...args)
// })

// promises.lstat(cwd()).then(stats => {
//   console.log('[fs.lstat]', stats)
// }).catch(err => {
//   console.error(err)
// })
