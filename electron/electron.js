import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { Menu } from 'electron'

const isDev = process.env.NODE_ENV === 'development';

// Emulate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
  }
}
Menu.setApplicationMenu(null);
pp.whenReady().then(() => {
  createWindow();

  // 🔔 Check for updates
  autoUpdater.checkForUpdates();

  // 📦 Notify when update is available
  autoUpdater.on('update-available', () => {
    dialog.showMessageBox(win, {
      type: 'info',
      title: 'Update Available',
      message: 'A new update is available. It will be downloaded in the background.',
    });
  });

  // ✅ Notify when update is downloaded
  autoUpdater.on('update-downloaded', () => {
    dialog
      .showMessageBox(win, {
        type: 'question',
        buttons: ['Restart', 'Later'],
        defaultId: 0,
        message: 'Update ready. Restart now?',
      })
      .then(result => {
        if (result.response === 0) {
          autoUpdater.quitAndInstall();
        }
      });
  });

  autoUpdater.on('error', err => {
    console.error('Auto updater error:', err);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
