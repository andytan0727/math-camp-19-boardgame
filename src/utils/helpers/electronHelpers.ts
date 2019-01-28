// Check whether the app opens in web or electron
export const isElectron =
  navigator.userAgent.toLowerCase().includes(" electron/");

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
  if (~filePath.toLowerCase().indexOf(".json")) {
    console.log(`Reading sample.json in ${filePath}...`);
    const fs = await import("fs");
    // const path = await import("path");
    // const gameDataFolder = await getGameDataFolder();
    // const gameJsonFile = path.join(gameDataFolder, "sample.json");
    const gameData = fs.readFileSync(filePath);
    return gameData.toString();
  }
  return undefined;
};
