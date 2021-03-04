const { app, BrowserWindow } = require("electron");

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
    nodeIntegration: true,
    contextIsolation: false
    },
  });

  // win.loadFile("index.html");

  win.loadFile("indexRobot.html");
  
  // win.setFullScreen(true);
  //win.maximize();
}

function initBot(){
    // const { DiscordBot} = require("./DiscordBot");
    // new DiscordBot("ODE1ODY0OTcxNzUzNDIyODQ4.YDyndw.wMwj-8vERj_O3ytlQ23hjMV4SBQ", win);

    const { DiscordBotRobot} = require("./DiscordBotRobot");
    new DiscordBotRobot("ODE1ODY0OTcxNzUzNDIyODQ4.YDyndw.wMwj-8vERj_O3ytlQ23hjMV4SBQ", win);

}
//ligne de commande pour pouvoir controler mon ordi
app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow).then(initBot);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
