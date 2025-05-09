var dgram = require("dgram");

var server = dgram.createSocket("udp4");    //"udp4": o tipo que o game maker suporta

server.on("message", function (msg, rinfo) {
    console.log(String(msg));   //exibir a mensagem recebida no log
});

server.bind(62832)      //porta