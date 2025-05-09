var dgram = require("dgram");

var server = dgram.createSocket("udp4");    //"udp4": o tipo que o game maker suporta

var data;

server.on("message", function (msg, rinfo) {
    data = JSON.parse(msg);
    if ("id" in data) console.log("id: " + String(data.id));
    if ("x" in data) console.log("x: " + String(data.x));
    if ("y" in data) console.log("y: " + String(data.y));
    if ("b" in data) console.log("m: " + String(data.b));
    if ("bp" in data) console.log("m: " + String(data.bp));
    //console.log(String(msg));   //exibir a mensagem recebida no log
    //server.send("Recebido", rinfo.port, rinfo.address);
});

server.bind(62832)      //porta