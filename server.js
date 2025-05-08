var dgram = require("dgram");

var server = dgram.createSocket("udp4");    //o tipo que o game maker suporta

server.on("message", function (msg, rinfo) {
    console.log(msg);   //mensagem do log
});

server.bind(62832)      //porta