//client = connection with discord
const { Client, MessageEmbed } = require("discord.js");
const fs = require("fs");

//créer classe qui s'appelle discordBotRobot
function random(min, max) {
    return min + Math.random() * (max - min);
  }

class DiscordBotRobot {
  constructor(token, win) {
    console.log("bot start");
    this.timer = null;
    this.win = win;
    this.client = new Client();
    //document. addEventListener("click", functionWhenClicked)
    this.client.on("ready", this.onReady.bind(this));
    this.client.on("message", this.onMessage.bind(this));
    this.client.login(token);
  }

  onReady() {
    console.log("BOT READY!");
  }

 

  onMessage(message) {
    const receivedEmbed = message.embeds[0];
    console.log(message.content);
    if(receivedEmbed){
      this.win.webContents.send("messageEmbedDiscord", receivedEmbed);
      console.log(receivedEmbed);
    } else {
      this.win.webContents.send("messageDiscord", message.content)
    }
  }
}



//une possible facon de declarer un module node qu'on a crée nous même
module.exports = { DiscordBot };
