//client = connection with discord
const { Client, MessageEmbed } = require("discord.js");
const { TouchBarSlider } = require("electron");
const { Board, Led, Servo } = require("johnny-five");
const fs = require("fs");

//créer classe qui s'appelle discordBotRobot
function random(min, max) {
  return min + Math.random() * (max - min);
}

async function delay(millis = 0) {
  return new Promise(function (resolve) {
    setTimeout(resolve, millis);
  });
}

class DiscordBotRobot {
  constructor(token, win) {
    console.log("bot start");
    this.timer = null;
    this.win = win;
    this.client = new Client();
    this.loadJSON("./partition.json");
    //document. addEventListener("click", functionWhenClicked)
    this.client.on("ready", this.onBoardReady.bind(this));
    this.client.on("message", this.onMessage.bind(this));
    this.client.login(token);
    this.initArduino();
  }
  loadJSON(url) {
    this.json = JSON.parse(fs.readFileSync(url, "utf8"));
    console.log(this.json);
  }

  initArduino() {
    this.board = new Board({ repl: false });
    this.board.on("ready", () => {
      this.onBoardReady();
      setTimeout(() => this.playSequence1(), 3000);
    });
  }

  async playSequence1() {
    await delay(1000);
    await this.moveTo(160, 100);
    await this.moveTo(0, 600);
    await this.moveTo(160, 100);
    await this.moveTo(0, 600);
    await this.moveTo(160, 100);
    await this.moveTo(0, 400);
    await this.moveTo(160, 100);
    await this.moveTo(0, 400);
    await this.moveTo(160, 100);
    await this.moveTo(0, 400);
    await this.moveTo(160, 100);
    await this.moveTo(0, 600);
    await this.moveTo(160, 100);
    await this.moveTo(0, 600);
    await this.moveTo(160, 100);
    await this.moveTo(0, 400);
    await this.moveTo(160, 100);
    await this.moveTo(0, 400);
    await this.moveTo(160, 100);
    await this.moveTo(0, 400);
    await this.moveTo(160, 100);
    await this.moveTo(0, 600);
    await this.moveTo(160, 100);
    await this.moveTo(0, 600);
    await this.moveTo(160, 100);
    await this.moveTo(0, 400);
    await this.moveTo(160, 100);
    await this.moveTo(0, 400);
    await this.moveTo(160, 100);
    await this.moveTo(0, 400);
    await this.moveTo(160, 100);
    await this.moveTo(0, 600);
    await this.moveTo(160, 100);
    await this.moveTo(0, 600);
    await this.moveTo(160, 100);
    await this.moveTo(0, 400);
    await this.moveTo(160, 100);
    await this.moveTo(0, 400);
    await this.moveTo(160, 100);
    await this.moveTo(0, 400);
  }


  async playSequence2() {
    await delay(1000);
    await this.moveTo(160, 100);
    await this.moveTo(100, 100);
    await this.moveTo(160, 100);
    await this.moveTo(0, 400);
    await this.moveTo(100, 100);
    await this.moveTo(160, 100);
    await this.moveTo(0, 600);
    await this.moveTo(100, 100);
    await this.moveTo(0, 600);
    await this.moveTo(160, 100);
    await this.moveTo(0, 400);
    await this.moveTo(100, 100);
    await this.moveTo(160, 100);
    await this.moveTo(100, 100);
    await this.moveTo(160, 100);
    await this.moveTo(0, 400);
    await this.moveTo(100, 100);
    await this.moveTo(160, 100);
    await this.moveTo(0, 600);
    await this.moveTo(100, 100);
    await this.moveTo(0, 600);
    await this.moveTo(160, 100);
    await this.moveTo(0, 400);
    await this.moveTo(100, 100);
  
  }

  moveTo(angle, time) {
    return new Promise((resolve) => {
      this.servo.to(angle, time).on("move:complete", function () {
        // console.log("move completed")
        resolve();
      });
    });
  }

  onBoardReady() {
    console.log("BOard READY!");
    this.servo = new Servo(7);
    this.servo.min();
    this.angle = 0;
  }

  partition() {
    this.angle += this.json[Math.floor(Math.random() * this.json.length)];
    if (this.angle >= 180) {
      this.servo.to(this.angle);
    } else {
      this.servo.to(-this.angle);
    }
  }

  onMessage(message) {
    const receivedEmbed = message.embeds[0];
    console.log(message.content);
    if (receivedEmbed) {
      this.win.webContents.send("messageEmbedDiscord", receivedEmbed);
      //console.log(receivedEmbed);
    } else {
      this.win.webContents.send("messageDiscord", message.content);
      if (this.servo && message.content === "⏰") {
        //this.partition();
        this.playSequence1();
        //this.servo.sweep();
      }
      if (this.servo && message.content === "🥁") {
        //this.partition();
        this.playSequence2();
        //this.servo.sweep();
      }
      if (message.content === "lol") {
        this.servo.stop();
      }
    }
  }
}

//une possible facon de declarer un module node qu'on a crée nous même
module.exports = { DiscordBotRobot };
