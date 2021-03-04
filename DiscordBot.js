//client = connection with discord

const { Client, MessageEmbed } = require("discord.js");
const fs = require("fs");

//créer classe qui s'appelle discordBot

function random(min, max) {
  return min + Math.random() * (max - min);
}

class DiscordBot {
  constructor(token, win) {
    console.log("bot start");
    this.timer = null;
    this.win = win;
    //load local json
    this.loadJSON("./sentences.json");
    this.client = new Client();
    //document. addEventListener("click", functionWhenClicked)
    this.client.on("ready", this.onReady.bind(this));
    this.client.on("message", this.onMessage.bind(this));
    this.client.login(token);
  }

  loadJSON(url) {
    this.json = JSON.parse(fs.readFileSync(url, "utf8"));
    console.log(this.json);
  }
  onReady() {
    console.log("BOT READY!");
  }

  onMessage(message) {
    const receivedEmbed = message.embeds[0];
    console.log(message.content);
    if (receivedEmbed) {
      this.win.webContents.send("messageEmbedDiscord", receivedEmbed);
      console.log(receivedEmbed);
    } else {
      this.win.webContents.send("messageDiscord", message.content);
    }

    clearTimeout(this.timer);
    if (message.content.includes("machin")) {
      const answer = new MessageEmbed();
      answer.setTitle("he/him");
      answer.setDescription(
        this.json[Math.floor(Math.random() * this.json.length)]
      );
      answer.setColor("0xff0000");
      this.timer = setTimeout(() => {
        message.channel.send(answer);
      }, random(1000, 3000));
    } else if (receivedEmbed && receivedEmbed.description.includes("machin")) {
      const answer = new MessageEmbed();
      //answer2.setTitle("Answer from bot");
      answer.setColor([random(0, 255), random(0, 255), random(0, 255)]);
      answer.setTitle("she/her");
      answer.setDescription(
        this.json[Math.floor(Math.random() * this.json.length)]
      );
      this.timer = setTimeout(() => {
        message.channel.send(answer);
      }, random(3000, 5000));
    } else if (receivedEmbed && receivedEmbed.description.includes("truc")) {
      const answer = new MessageEmbed();
      answer.setColor("0x00ffff");
      answer.setTitle("they/them");
      answer.setDescription(
        this.json[Math.floor(Math.random() * this.json.length)]
      );
      //answer2.setImage();
      this.timer = setTimeout(() => {
        message.channel.send(answer);
      }, random(1000, 2000));
    } else if (receivedEmbed && receivedEmbed.description.includes("...")) {
      const answer = new MessageEmbed();
      answer.setColor("0x0000ff");
      answer.setTitle("he/him");
      answer.setDescription(
        this.json[Math.floor(Math.random() * this.json.length)]
      );
      //answer2.setImage();
      this.timer = setTimeout(() => {
        message.channel.send(answer);
      }, random(1000, 5000));
    } else if (receivedEmbed && receivedEmbed.description.includes("montre")) {
      const answer = new MessageEmbed();
      answer.setColor("0x00fff0");
      answer.setTitle("he/him");
      answer.setDescription("ce truc");
      answer.setImage(
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F3.bp.blogspot.com%2F-Gc-UsMhoHu0%2FVQyqI2BfFSI%2FAAAAAAAADV4%2FTq2PVXFzN7A%2Fs1600%2FHGT-Truc%252BVit%252C%252BBanh%252BVit%252BHai%252BCap-02.png&f=1&nofb=1"
      );
      this.timer = setTimeout(() => {
        message.channel.send(answer);
      }, random(3000, 4000));
    } else if (receivedEmbed && receivedEmbed.description.includes("quoi")) {
      const answer = new MessageEmbed();
      answer.setColor("0x00fff0");
      answer.setTitle("he/him");
      answer.setDescription("le machin qui est pas très cher");
      answer.setImage(
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhoalanhuyanh.com%2Fuserfiles%2Fimage%2Flan-rung%2F2017%2F12%2F25%2Flan-rung-truc-phat-ba.jpg&f=1&nofb=1s"
      );
      this.timer = setTimeout(() => {
        message.channel.send(answer);
      }, random(3000, 4000));
    } else if (receivedEmbed && receivedEmbed.description.includes("lequel")) {
      const answer = new MessageEmbed();
      answer.setColor("0x00fff0");
      answer.setTitle("she/her");
      answer.setDescription("mais haha, tu connais pas ce machin là?");
      answer.setImage(
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fsieuthichieutruc.vn%2Fwp-content%2Fuploads%2F2017%2F06%2Fchieu-truc-hat-den.jpg&f=1&nofb=1"
      );
      this.timer = setTimeout(() => {
        message.channel.send(answer);
      }, random(3000, 4000));
    } else if (message.content.includes("stop")) {
      message.channel.send("on va oublier tout ça");
      clearTimeout(this.timer);
    }
    // this.noRepeat(message);
  }
  noRepeat(message) {
    let answer = message.embeds.length - 1;
    if (message === answer) {
      message = this.json[Math.floor(Math.random() * this.json.length) + 1];
      console.log(message.embeds);
    }
  }
}

//une possible facon de declarer un module node qu'on a crée nous même
module.exports = { DiscordBot };
