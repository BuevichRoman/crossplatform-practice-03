const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs/promises');
const os = require('os');

function createWindow() {
  const win = new BrowserWindow({
    width: 900, height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,   // значения по умолчанию, указаны явно
      nodeIntegration: false
    }
  });
  win.loadFile('index.html');
  return win;
}

// Задание 3: чтение каталога в главном процессе
ipcMain.handle('list-dir', async (event, dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries.map(e => ({ name: e.name, isDir: e.isDirectory() }));
});

// Задание 4, вариант 2: информация о системе
ipcMain.handle('system-info', () => ({
  platform: os.platform(),
  arch: os.arch(),
  cpus: os.cpus().length,
  cpuModel: os.cpus()[0]?.model ?? 'неизвестно',
  totalMemGb: (os.totalmem() / 1024 ** 3).toFixed(1)
}));

app.whenReady().then(() => {
  const win = createWindow();

  // Служебный режим для отчёта: SCREENSHOT=путь.png — снять окно и выйти
  if (process.env.SCREENSHOT) {
    win.webContents.once('did-finish-load', async () => {
      await win.webContents.executeJavaScript(
        'document.getElementById("show").click(); document.getElementById("sysinfo").click();');
      setTimeout(async () => {
        const img = await win.webContents.capturePage();
        await fs.writeFile(process.env.SCREENSHOT, img.toPNG());
        app.quit();
      }, 800);
    });
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
