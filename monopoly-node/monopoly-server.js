var fs=require("fs");
var express=require("./node_modules/express");

//var board=require("./server/board.js");
var diceModel=require("./server/dice.js");
//var phases=require("./server/phases.js");
//var statesStations=require("./server/statesStations.js");
//var statesStreet=require("./server/statesStreets.js");
//var token=require("./server/token.js");
var userModel=require("./server/user.js");
//var cards=require("./server/cards.js");
var gameModel=require("./server/game.js");

var http=require("http");

var config=JSON.parse(fs.readFileSync("./config.json"));
var host=config.host;
var port=config.port;

//var application_root=__dirname;


var app=express();
var server=http.createServer(app);

//Iniciar juego como yo lo inicie.
var dice = new diceModel.Dice();
var game=new gameModel.Game(dice, 2);
//console.log(game.phase);

app.use("/",express.static(__dirname));


app.get("/",function(request,response){
	var contenido=fs.readFileSync("./client/index.html");
	response.setHeader("Content-type","text/html");
	response.send(contenido);
});

app.get("/newUser/:name",function(request,response){
	var jsonData;
	var user = new userModel.User(request.params.name)
	game.addUser(user);
	if(user.Token)
	{
		jsonData={"name":user.name, "uid":user.uid, "color":user.Token.color, "money":user.Token.money, "position": user.Token.position}
	}
	else
		jsonData={"name":"sorry", "color":"There are not TOKENS", "position":-1}

	response.send(jsonData);
});

app.get("/gameToPlay", function(request, response)
{
	var jsonData;
	if(game.phase.name = "Playing...")
	{
		jsonData = {"ready":true}
	}
	response.send(jsonData);
})

app.get("/isMyTurn/:uid", function(request, response)
{
	var jsonData;
	var u = game.getUser(request.params.uid)

	if(u.turn)
	{
		jsonData={"turn":true}
	}

	response.send(jsonData);
})

app.get("/throwingDice/:uid", function(request, response)
{	
	var jsonData;
	var u = game.getUser(request.params.uid)
	u.throwingDice();
	jsonData={"position": u.Token.position}
	response.send(jsonData);
})

app.get("/buy/:uid", function(request, response)
{	
	var jsonData;
	var u = game.getUser(request.params.uid)
	u.buy();
	jsonData={"buy": true}
	response.send(jsonData);
})

app.get("/changeMyTurn/:uid", function(request, response)
{
	var jsonData;
	var u = game.getUser(request.params.uid)
	u.passTurn();
	if(!u.turn)
		jsonData={"isChanged":true}
	response.send(jsonData);
})

server.listen(port,host);
console.log("Servidor iniciado en puerto: "+port);