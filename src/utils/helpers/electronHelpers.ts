// Check whether the app opens in web or electron
export const isElectron = navigator.userAgent
  .toLowerCase()
  .includes(" electron/");

export const initializeWatcher = async () => {
  const chokidar = await import("chokidar");
  const path = await import("path");
  const gameDataFolder = await getGameDataFolder();
  const watcher = chokidar.watch(path.join(gameDataFolder, "game.json"), {
    ignored: /[\/\\]\./,
    persistent: true
  });
  return watcher;
};

// Get %APPDATA%\{App_Name}\game_data folder of this app
export const getGameDataFolder = async () => {
  const path = await import("path");
  const fs = await import("fs");
  const { remote } = await import("electron");
  const gameDataFolder = path.join(remote.app.getPath("userData"), "game_data");

  if (!fs.existsSync(gameDataFolder)) {
    fs.mkdirSync(gameDataFolder);
  }

  return gameDataFolder;
};

export const readJSONData = async (filePath: string) => {
  if (/.*game\.json$/.test(filePath)) {
    console.log(
      `Reading ${/^C:\\(.+\\)*(.+\..+)$/.exec(filePath) &&
        /^C:\\(.+\\)*(.+\..+)$/.exec(filePath)!.slice(-1)[0]} in ${filePath}...`
    );
    const fs = await import("fs");
    const gameData = fs.readFileSync(filePath);
    return gameData.toString();
  }
  return undefined;
};

export const writeJSONData = async (data: any) => {
  console.log(`Writing to backup.json...`);
  const fs = await import("fs");
  const path = await import("path");
  const dataFolder = await getGameDataFolder();
  try {
    fs.writeFileSync(
      path.join(dataFolder, "backup.json"),
      JSON.stringify(data)
    );
    console.log("File was writen.");
  } catch (error) {
    console.error(`Error in writing file: ${error}`);
  }
};
