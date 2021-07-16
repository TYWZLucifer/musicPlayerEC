### musicPlayerEC
 用electron实现的音乐播放器demo
 
## Tips
在渲染进程里利用require引用包，并且在创建BrowserWindow时，确实设置了webPreferences中的nodeIntegration为true，但渲染进程依然挂掉。
在electron的github issure里找到。为了安全性，官方将electron v12.0.0 的contextIsolation的默认值改了，所以今后要在渲染进程里调用require的话，还需要加上contextIsolation: false
