// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let splashScreen;
const winParams = {
  width: 1200,
  height: 850,
  minWidth: 1000,
  minHeight: 800,
  show: false
};

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow(winParams);

  // and load the index.html of the app.
  const startUrl = isDev
    ? "http://localhost:3000"
    : url.format({
        pathname: path.join(__dirname, "../build/index.html"),
        protocol: "file:",
        slashes: true
      });
  mainWindow.loadURL(startUrl);

  mainWindow.webContents.on("did-finish-load", () => {
    setTimeout(() => {
      mainWindow.show();
      mainWindow.maximize();

      if (splashScreen) {
        let loadingScreenBounds = splashScreen.getBounds();
        mainWindow.setBounds(loadingScreenBounds);
        splashScreen.close();
      }
    }, 3000);
  });

  // Open devtools in development environment
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Download and install extensions
  // on development environment
  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS
    } = require("electron-devtools-installer");

    installExtension(REACT_DEVELOPER_TOOLS)
      .then(item => console.log(`Added extension: ${item}`))
      .catch(err => console.log(`An error occured: ${err}`));

    installExtension(REDUX_DEVTOOLS)
      .then(item => console.log(`Added extension: ${item}`))
      .catch(err => console.log(`An error occured: ${err}`));
  }

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

const createLoadingScreen = () => {
  splashScreen = new BrowserWindow({
    // width: 1300,
    width: 1000,
    height: 500,
    show: false,
    parent: mainWindow,
    transparent: true,
    frame: false
  });
  splashScreen.loadURL(
    isDev
      ? url.format({
          pathname: path.join(__dirname, "/splash.html"),
          protocol: "file:",
          slashes: true
        })
      : url.format({
          pathname: path.join(__dirname, "../build/splash.html"),
          protocol: "file:",
          slashes: true
        })
  );

  splashScreen.on("closed", () => (splashScreen = null));
  splashScreen.webContents.on("did-finish-load", () => {
    splashScreen.show();
    splashScreen.center();
  });
};

const generateMenu = () => {
  const template = [
    {
      label: "File",
      submenu: [{ role: "about" }, { role: "quit" }]
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "pasteandmatchstyle" },
        { role: "delete" },
        { role: "selectall" }
      ]
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forcereload" },
        { role: "toggledevtools" },
        { type: "separator" },
        { role: "resetzoom" },
        { role: "zoomin" },
        { role: "zoomout" },
        { type: "separator" },
        { role: "togglefullscreen" }
      ]
    },
    {
      role: "window",
      submenu: [{ role: "minimize" }, { role: "close" }]
    },
    {
      role: "help",
      submenu: [
        {
          click() {
            require("electron").shell.openExternal(
              "https://github.com/andytan0727/math-camp-19-boardgame"
            );
          },
          label: "Learn More"
        },
        {
          click() {
            require("electron").shell.openExternal(
              "https://github.com/andytan0727/math-camp-19-boardgame/issues"
            );
          },
          label: "File Issue on GitHub"
        }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createLoadingScreen();
  createWindow();
  generateMenu();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
