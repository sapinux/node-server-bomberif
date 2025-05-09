var dgram = require("dgram");

var server = dgram.createSocket("udp4");    //"udp4": o tipo que o game maker suporta

var data;

server.on("message", function (msg, rinfo) {
    data = JSON.parse(msg);
    if ("id" in data) console.log("id: " + String(data.id));    //id do player
    if ("x" in data) console.log("x: " + String(data.x));       //x do player
    if ("y" in data) console.log("y: " + String(data.y));       //y do player
    if ("b" in data) console.log("m: " + String(data.b));       //quando o player soltar bomba
    if ("bp" in data) console.log("m: " + String(data.bp));     //quando o player pegar uma bomba com luva
    if ("m" in data) console.log("m: " + String(data.m));       //quando o player morrer
    //console.log(String(msg));   //exibir a mensagem recebida no log
    //server.send("Recebido", rinfo.port, rinfo.address);
});

server.bind(62832)      //porta