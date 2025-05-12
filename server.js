var dgram = require("dgram");
const { json } = require("stream/consumers");

var server = dgram.createSocket("udp4");    //"udp4": o tipo que o game maker suporta

var data;           //variavel para receber a msg do cliente
var hosts = [];     //vetor que armazenara os clientes

//function player(x,y) {
//    this.x = x;
//    this.y = y;/
//}

const msg_type = {
    CREATE_HOST : 0,
	JOIN_HOST : 1,
	STOP_HOST : 2,
    SET_PLAYER_STAT : 3
}

server.on("message", function (msg, rinfo) {
    data = JSON.parse(msg);
    console.log(String(msg));   //depuracao -----apagar depois!!!!!

    if ("id" in data) console.log("< id: " + String(data.id));    //id do player
    if ("x" in data) console.log("< x: " + String(data.x));       //x do player
    if ("y" in data) console.log("< y: " + String(data.y));       //y do player
    if ("b" in data) console.log("< m: " + String(data.b));       //quando o player soltar bomba
    if ("bp" in data) console.log("< m: " + String(data.bp));     //quando o player pegar uma bomba com luva
    if ("m" in data) console.log("< m: " + String(data.m));       //quando o player morrer
    
    switch (data.t) {
        case msg_type.CREATE_HOST:
            create_host(data, rinfo);    
            break;
        case msg_type.SET_PLAYER_STAT:
            set_player_stat(data, rinfo);    
            break;
    }
    
    //if ("t" in data) console.log("< m: " + String(data.t));       //maquina de estado
    //console.log(String(msg));   //exibir a mensagem recebida no log
    //server.send("Recebido", rinfo.port, rinfo.address);
    //if (data.b) server.send(JSON.stringify(data.b), rinfo.port, rinfo.address); //envio de msg para o cliente
});

function create_host(data, rinfo) {
    console.log("Estamos no estado create host");                   //depuracao
    //var host_number = hosts.length;                                 //recebe a qtd de clientes
    //hosts.push([new player(0, 0)]);

    //data.hn = host_number;                                          //hn recebe o numero do host
    //data.pn = 0;

    //server.send(JSON.stringify(data), rinfo.port, rinfo.address);   //enviar para o cliente
    //console.table(hosts);                                           
}

function set_player_stat(data, rinfo) {
    console.log("Estamos no estado set player stat");               //depuracao
}

server.bind(62832)      //porta