var dgram = require("dgram");
const { json } = require("stream/consumers");

var server = dgram.createSocket("udp4");    //"udp4": o tipo que o game maker suporta

var data;           //variavel para receber a msg do cliente
var salas = [];     //vetor que armazenara os clientes
const limite_jogadores = 3; //quantidade de jogadores por sala

function player(y, ip) {
    //this.x = x;
    this.y = y;
    this.ip = ip;
}

const msg_type = {
    CRIAR_SALA : 0,
	JOIN_HOST : 1,
	STOP_HOST : 2,
    SET_PLAYER_STAT : 3
}

server.bind(62832)      //porta

server.on("message", function (msg, rinfo) {
    data = JSON.parse(msg);
    console.log("recebido do cliente: ");
    console.log(data);
    //console.log("msg: " + String(msg));   //depuracao -----apagar depois!!!!!

    //if ("id" in data) console.log("< id: " + String(data.id));    //id do player
    //if ("x" in data) console.log("< x: " + String(data.x));       //x do player
    //if ("y" in data) console.log("< y: " + String(data.y));       //y do player
    //if ("b" in data) console.log("< m: " + String(data.b));       //quando o player soltar bomba
    //if ("bp" in data) console.log("< m: " + String(data.bp));     //quando o player pegar uma bomba com luva
    //if ("m" in data) console.log("< m: " + String(data.m));       //quando o player morrer
    
    switch (data.t) {
        case msg_type.CRIAR_SALA:
            criar_sala(data, rinfo);    
            break;
        case msg_type.SET_PLAYER_STAT:
            set_player_stat(data, rinfo);    
            break;
        case msg_type.STOP_HOST:
            stop_host(data, rinfo);
            break;
    }
    console.log(data);      //depuracao
    console.log(rinfo);     //depuracao
    console.log("Sala: " + salas.length + " players na sala: " + salas[salas.length - 1].length); //depuracao
    console.table(salas);   //exibir uma tabela com o salas criados
});

function criar_sala(data, rinfo) {
    console.log("Estamos no estado create host");                   //depuracao
    
    //var host_number = salas.length;                                 //recebe a qtd de clientes
    
    if (salas.length == 0)                  //se não houver sala
        salas.push([new player(0, rinfo.address)]);     //cria uma com um player dentro
    else {
        if (salas[salas.length - 1].length < limite_jogadores)     //se a sala estiver abaixo do limite
            salas[salas.length - 1].push(new player(0, rinfo.address)); //adiciona jogador
        else    //caso contrario        
            salas.push([new player(0, rinfo.address)]);     //cria uma nova sala
    }
    
    data.sn = salas.length;                                         //sn recebe o numero do host
    data.pn = salas[salas.length - 1].length;                       //recebe o numero do player

    //enviar mensagem a todos da sala
    for (let i = 0; i < salas[salas.length - 1].length; i ++) {
        server.send(JSON.stringify(data), rinfo.port, salas[salas.length - 1][i].ip);   //enviar para o cliente
    };
    console.log( salas[salas.length - 1][data.pn - 1].ip );

    
                                             
}

function stop_host(data, rinfo) {
    console.log("Estamos no estado stop host");               //depuracao
    var host_to_stop = salas.indexOf(data.sn)                //capturar o host do indice sn 
    salas.splice(host_to_stop, 1)
    server.send(JSON.stringify(data), rinfo.port, rinfo.address);   //enviar para o cliente
}

function set_player_stat(data, rinfo) {
    console.log("Estamos no estado set player stat: " + String(data.sn));               //depuracao
    console.log(Object.keys(salas));        
    server.send(JSON.stringify(data), rinfo.port, rinfo.address);   //enviar para o cliente
}

