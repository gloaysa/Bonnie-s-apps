const electron = require("electron");
const remoteMain = require("@electron/remote/main");
remoteMain.initialize();

require('update-electron-app')(
    {
      repo: 'gloaysa/bonnies_apps',
      updateInterval: '6 hour',
    }
);

const contextMenu = require("electron-context-menu");
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");
// Start server
let server;
if (!isDev) {
  server = require("../build/server/server");
}

contextMenu({
  prepend: (defaultActions, parameters, browserWindow) => [
    {
      label: "Es una imagen",
      // Only show it when right-clicking images
      visible: parameters.mediaType === "image",
    },
    {
      label: "Search Google for “{selection}”",
      // Only show it when right-clicking text
      visible: parameters.selectionText.trim().length > 0,
      click: () => {
        shell.openExternal(
          `https://google.com/search?q=${encodeURIComponent(
            parameters.selectionText
          )}`
        );
      },
    },
  ],
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      spellcheck: true,
    },
  });

  mainWindow.maximize();
  mainWindow.show();

  remoteMain.enable(mainWindow.webContents);

  // and load the index.html of the app.
  const startUrl = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(startUrl);
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
  server?.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0);
  });
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
