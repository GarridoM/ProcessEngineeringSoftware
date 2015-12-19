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
		jsonData={"name":user.name, "uid":user.uid, "color":user.Token.color, "money":user.Token.money, "position": user.Token.position, "infoGame":game.info, "infoToken":user.Token.info}
	}
	else
		jsonData={"position":-1, "infoGame":game.info}

	response.send(jsonData);
});

app.get("/gameToPlay", function(request, response)
{
	var jsonData;
	jsonData = {"namePhase":game.phase.name, "infoGame":game.info}
	response.send(jsonData);
})

app.get("/isMyTurn/:uid", function(request, response)
{
	var jsonData;
	var u = game.getUser(request.params.uid)
	jsonData={"turn":u.turn, "name":u.name, "infoGame":game.info, "infoToken":u.Token.info}	
	response.send(jsonData);
})

app.get("/throwingDice/:uid", function(request, response)
{	
	var jsonData;
	var u = game.getUser(request.params.uid)
	u.throwingDice();
	jsonData={"position": u.Token.position, "money":u.Token.money, "infoGame":game.info, "infoToken":u.Token.info}
	
	response.send(jsonData);
})

app.get("/throwingDiceTest/:uid/:position", function(request, response)
{
	var jsonData;
	var u = game.getUser(request.params.uid)
	var pos = parseInt(request.params.position)
	u.throwingDiceTest(pos);
	jsonData={"position": u.Token.position, "money":u.Token.money, "infoGame":game.info, "infoToken":u.Token.info}
	
	response.send(jsonData);

})
app.get("/buy/:uid", function(request, response)
{	
	var jsonData;
	var u = game.getUser(request.params.uid)
	//var val = u.buy();
	if(u.buy())
	{
		jsonData={"buy": true, "money":u.Token.money,"propertyBought": game.board.boxes[u.Token.position].theme.name, "propertyBoughtType": game.board.boxes[u.Token.position].theme.type, "infoToken":u.Token.info}
	}
	else
		jsonData={"buy": false, "infoToken":u.Token.info}
	
	response.send(jsonData);
})

app.get("/buildWhere/:uid", function(request, response)
{	
	var jsonData;
	var u = game.getUser(request.params.uid)
	jsonData={"listGroupsColors": u.Token.getProperties()}	
	response.send(jsonData);
})

app.get("/build/:uid/:nameStreet", function(request, response)
{	
	var jsonData;
	var u = game.getUser(request.params.uid)
	var nameStreet = request.params.nameStreet;
	if(nameStreet = "")
	{
		jsonData = {"build":false, "infoToken": "Please, Introduce a Street Name"}
	}
	else
	{
		if(u.build())
		{
			jsonData={"build": true, "money":u.Token.money,"property": nameStreet, "numberOfHouses": u.Token.getProperties(nameStreet), "infoToken":u.Token.info}
		}
		else
		{
			jsonData={"buy": false, "infoToken":u.Token.info}
		}

	}	
	response.send(jsonData);
})

app.get("/changeMyTurn/:uid", function(request, response)
{
	var jsonData;
	var u = game.getUser(request.params.uid)
	u.passTurn();
	if(!u.turn)
		jsonData={"isChanged":true, "infoGame":game.info, "infoToken":u.Token.info}
	response.send(jsonData);
})

server.listen(port,host);
console.log("Servidor iniciado en puerto: "+port);