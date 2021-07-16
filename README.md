### musicPlayerEC
 用 electron 实现的音乐播放器 demo
 
## Tips
在渲染进程里利用 require 引用包，并且在创建 BrowserWindow 时，确实设置了 webPreferences 中的 nodeIntegration 为 true ，但渲染进程依然挂掉。
electron 的 github issure 里给出解决办法:
为了安全性，官方将 electron v12.0.0 的 contextIsolation 的默认值改了，所以今后要在渲染进程里调用 require 的话，还需要加上 contextIsolation: false
