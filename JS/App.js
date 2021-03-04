const { MessageEmbed } = require("discord.js");
const { ipcRenderer } = require("electron");

class App {
  constructor() {
    console.log("log depuis la page html");
    //console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }));
    this.initListeners();
  }

  initListeners() {
      ipcRenderer.on("messageDiscord", this.onMessage.bind(this));
      ipcRenderer.on("messageEmbedDiscord", this.onMessageEmbed.bind(this));
  }
  onMessage(event, message){
      console.log(message);
      let capsule = document.createElement("div");
      //let title = document.createElement("h3");
      let newMsg = document.createElement("h1");

      //title.innerHTML = message.title;
      newMsg.innerHTML = message;
      // document.body.appendChild(title);

      capsule.classList.add("right");
      newMsg.classList.add("right");
      
      document.body.appendChild(capsule);
      //capsule.appendChild(title);
      capsule.appendChild(newMsg);
      

      window.scrollTo({
        top:document.body.scrollHeight,
        behavior: 'smooth'
      })

  }

  onMessageEmbed(event, message){
    console.log(message);

    let title = document.createElement("h3");
    let capsuleEmbed = document.createElement("div");
    let newMsgEmbed = document.createElement("h1");
    
    title.innerHTML = message.title;
    newMsgEmbed.innerHTML = message.description;

    capsuleEmbed.classList.add("left");
    newMsgEmbed.classList.add("left2");
    
    // document.body.appendChild(title);
    document.body.appendChild(capsuleEmbed);
    capsuleEmbed.appendChild(title);
    capsuleEmbed.appendChild(newMsgEmbed);
  
   

    if(message.image){
      let img = document.createElement("img");
      img.src = message.image.proxyURL;
      capsuleEmbed.appendChild(title);
      capsuleEmbed.appendChild(newMsgEmbed);
      capsuleEmbed.appendChild(img);
      
  }
    
  window.scrollTo({
    top:document.body.scrollHeight,
    behavior: 'smooth'
  })
    // if(message = "machin"){
    //     document.body.style.backgroundColor = "blue";
    // }
}
}

window.onload = () => {
  new App();
};
