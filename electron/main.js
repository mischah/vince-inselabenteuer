const { app, BrowserWindow } = require('electron');
const path = require('path');

// Keep a global reference of the window object to prevent garbage collection
let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: false, // It's safer to disable Node integration in the renderer process
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js') // We'll use a preload script for any required Node.js functionality
    },
    icon: path.join(__dirname, '../graphics/icon.png')
  });

  // Load the index.html of the app
  mainWindow.loadFile(path.join(__dirname, '../index.html'));

  // Always open DevTools to troubleshoot
  mainWindow.webContents.openDevTools();

  // Remove the menu bar for a cleaner game experience
  mainWindow.setMenuBarVisibility(false);

  // Emitted when the window is closed
  mainWindow.on('closed', () => {
    // Dereference the window object
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS where it's common
// to keep the application running until user explicitly quits
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS, re-create a window when dock icon is clicked and there are no windows open
  if (mainWindow === null) {
    createWindow();
  }
});
