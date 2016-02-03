var fs=require("fs");
var express=require("./node_modules/express");
var _ = require("./node_modules/underscore");

var diceModel=require("./server/dice.js");
var userModel=require("./server/user.js");
var gameModel=require("./server/game.js");
var http=require("http");

var config=JSON.parse(fs.readFileSync("./config.json"));
var host=config.host;
var port=config.port;

//var application_root=__dirname;


var app=express();
var server=http.createServer(app);
var io = require('socket.io')(server);

//Iniciar juego como yo lo inicie.
var dice = new diceModel.Dice();
var game = new gameModel.Game(dice, 2);

server.listen(port,host);
console.log("Servidor iniciado en puerto: "+port);
app.use("/",express.static(__dirname));


io.on('connection', function (socket) {
	
	socket.on('gameToPlay', function(){
		game.info = " ";
		socket.emit('gameToPlay', {
			namePhase: game.phase.name, 
			infoGame: game.info
		})
		socket.broadcast.emit('gameToPlay', {
			namePhase: game.phase.name, 
			infoGame: game.info
		})
	})

	socket.on('isMyTurn', function (uid){
		
		var u = game.getUser(uid);
		game.info = " ";
		u.Token.info = " ";
		socket.emit('checkIsMyTurn', {
			turn:u.turn, 
			name:u.name,
			uid: u.uid,
			infoGame:game.info, 
			infoToken:u.Token.info
		})
		
		socket.broadcast.emit('checkIsMyTurn', {
			turn:u.turn, 
			name:u.name, 
			infoGame:game.info, 
			infoToken:u.Token.info
		})
		
	})


	socket.on('changeMyTurn', function (uid){

		var u = game.getUser(uid)
		game.info = " ";
		u.Token.info = " ";
		u.passTurn();
		if(!u.turn)
		{
			socket.broadcast.emit('changeMyTurn', {
				isChanged:true, 
				infoGame:game.info, 
				infoToken:u.Token.info
			})
		}
		else
		{
			socket.broadcast.emit('changeMyTurn', {
				isChanged:false
			})
		}

	})

	socket.on('showWinnerGame', function (uid){
		
		var u = game.getUser(uid);
		console.log("jugador"+ u);
		socket.emit('showWinnerGame', {
			name: u.name,
			info: "Congratulation! You have won!"
		})
		
		socket.broadcast.emit('showWinnerGame', {
			name: u.name,
			info: "Sorry, You have lost!"
		})
		
	})


});



app.get("/",function(request,response){
	var contenido=fs.readFileSync("./client/index.html");
	response.setHeader("Content-type","text/html");
	response.send(contenido);
});

app.get("/newUser/:name",function(request,response){
	var jsonData;
	var user = new userModel.User(request.params.name)
	game.info = " ";
	game.addUser(user);
	if(user.Token)
	{
		jsonData={"name":user.name, "uid":user.uid, "color":user.Token.color, "money":user.Token.money, "position": user.Token.position, "infoGame":game.info, "infoToken":user.Token.info}
	}
	else
		jsonData={"position":-1, "infoGame":game.info}

	response.send(jsonData);
});

/*app.get("/gameToPlay", function(request, response)
{
	var jsonData;
	jsonData = {"namePhase":game.phase.name, "infoGame":game.info}
	response.send(jsonData);
})*/

/*app.get("/isMyTurn/:uid", function(request, response)
{
	var jsonData;
	var u = game.getUser(request.params.uid)
	jsonData={"turn":u.turn, "name":u.name, "infoGame":game.info, "infoToken":u.Token.info}	
	response.send(jsonData);
})*/

app.get("/throwingDice/:uid", function(request, response)
{	
	var jsonData;
	var u = game.getUser(request.params.uid)
	//game.info = " ";
	//u.Token.info = " ";
	u.throwingDice();
	jsonData={"position": u.Token.position, "money":u.Token.money, "infoGame":game.info, "infoToken":u.Token.info, "diceOne": game.diceOne, "diceTwo": game.diceTwo, "jail": u.Token.jail, "cardGoOutJail": u.Token.cardGoOutJail, "turn":u.turn, "namePhase": game.phase.name, "winner": game.winner}
	
	response.send(jsonData);
})

app.get("/throwingDiceTest/:uid/:position", function(request, response)
{
	var jsonData;
	var u = game.getUser(request.params.uid)
	var pos = parseInt(request.params.position)
	//game.info = " ";
	//u.Token.info = " ";
	u.throwingDiceTest(pos);
	jsonData={"position": u.Token.position, "money":u.Token.money, "infoGame":game.info, "infoToken":u.Token.info, "diceOne": game.diceOne, "diceTwo": game.diceTwo, "jail": u.Token.jail, "cardGoOutJail": u.Token.cardGoOutJail, "turn":u.turn, "namePhase": game.phase.name, "winner": game.winner}
	console.log(jsonData);
	response.send(jsonData);

})

app.get("/goOutJail/:uid/:optionChoosen", function(request, response)
{	
	console.log("Go Out of Jail")
	var jsonData;
	var u = game.getUser(request.params.uid)
	var option = request.params.optionChoosen;
	//game.info = " ";
	//u.Token.info = " ";
	u.goOutJail(option)
	/*if(u.goOutJail(option))
	{
		console.log("HA DADO TRUEEE")
		jsonData={"money":u.Token.money, "infoGame":game.info, "infoToken":u.Token.info, "diceOne": game.diceOne, "diceTwo": game.diceTwo, "jail": u.Token.jail, "cardGoOutJail": u.Token.cardGoOutJail}
	}
	else
	{*/
		//console.log("NO ha dado true")
		jsonData={"money":u.Token.money, "infoGame":game.info, "infoToken":u.Token.info, "diceOne": game.diceOne, "diceTwo": game.diceTwo, "jail": u.Token.jail, "cardGoOutJail": u.Token.cardGoOutJail}
	//}
		
	console.log(jsonData);
	response.send(jsonData);
})

function getPropertiesGroup(user)
{
	//return user.Token.getPropertiesInGroup();
	var propersGroup = [];
	
	/*propersGroup = _.find(user.Token.properties, function(each){
		if(each.state.name == "Group")
			return each.color;
	})
	return propersGroup;
	*/
	for(i=0; i<user.Token.properties.length; i++)
	{
		if(user.Token.properties[i].state.name == "Group")
		{
			propersGroup.push(user.Token.properties[i].color)
		}
	}
	console.log("COLORES " + propersGroup);
	return propersGroup;
}

app.get("/buy/:uid", function(request, response)
{	
	var jsonData;
	var u = game.getUser(request.params.uid)
	game.info = " ";
	u.Token.info = " ";
	//var val = u.buy();
	console.log(game.board.boxes[u.Token.position].theme.name)
	var namePublic = game.board.boxes[u.Token.position].theme.name;
	if(u.buy())
	{
		console.log("Estoy aki")
		console.log(game.board.boxes[u.Token.position].theme.name)
		if(game.board.boxes[u.Token.position].theme.type == 'PublicServices')
			jsonData={"buy": true, "money":u.Token.money, "propertyBought": game.board.boxes[u.Token.position].theme.name, "propertyBoughtType": game.board.boxes[u.Token.position].theme.type, "infoToken":u.Token.info, "colorProperty": game.board.boxes[u.Token.position].theme.color, "numberPropers": game.board.boxes[u.Token.position].theme.numberOfHouses, "hotel": game.board.boxes[u.Token.position].theme.hotel, "listGroup": getPropertiesGroup(u), "namePublic": namePublic}
		else
			jsonData={"buy": true, "money":u.Token.money, "propertyBought": game.board.boxes[u.Token.position].theme.name, "propertyBoughtType": game.board.boxes[u.Token.position].theme.type, "infoToken":u.Token.info, "colorProperty": game.board.boxes[u.Token.position].theme.color, "numberPropers": game.board.boxes[u.Token.position].theme.numberOfHouses, "hotel": game.board.boxes[u.Token.position].theme.hotel, "state": game.board.boxes[u.Token.position].theme.state.name, "listGroup": getPropertiesGroup(u), "namePublic": namePublic}
	}
	else
		jsonData={"buy": false, "infoToken":u.Token.info}
	
	console.log(jsonData)
	response.send(jsonData);
})

app.get("/sell/:uid", function(request, response)
{	
	var jsonData;
	var u = game.getUser(request.params.uid)
	game.info = " ";
	u.Token.info = " ";
	//var val = u.buy();
	if(u.sellBuildings())
	{
		jsonData={"sell": true, "money":u.Token.money,"propertySoldBuildings": game.board.boxes[u.Token.position].theme.name, "infoToken":u.Token.info, "colorPropertySoldBuild": game.board.boxes[u.Token.position].theme.color}
	}
	else
		jsonData={"sell": false, "infoToken":u.Token.info}
	
	response.send(JSON.stringify(jsonData));
})

app.get("/mortgage/:uid", function(request, response)
{	
	var jsonData;
	var u = game.getUser(request.params.uid)
	game.info = " ";
	u.Token.info = " ";
	//var val = u.buy();
	if(u.mortgage())
	{
		jsonData={"mortgage": true, "money":u.Token.money,"propertyMortgage": game.board.boxes[u.Token.position].theme.name, "infoToken":u.Token.info, "colorPropertyMortgaged": game.board.boxes[u.Token.position].theme.color}
	}
	else
		jsonData={"mortgage": false, "infoToken":u.Token.info}
	
	response.send(JSON.stringify(jsonData));
})
/*app.get("/buildWhere/:uid", function(request, response)
{	
	var jsonData;
	var u = game.getUser(request.params.uid)
	game.info = " ";
	u.Token.info = " ";
	jsonData={"listGroupsColors": u.Token.getProperties()}	
	response.send(jsonData);
})*/

app.get("/build/:uid/:colorGroup", function(request, response)
{	
	console.log("Building")
	var jsonData;
	var u = game.getUser(request.params.uid)
	var colorGroup = request.params.colorGroup;
	game.info = " ";
	u.Token.info = " ";
	/*if(nameStreet = "")
	{
		jsonData = {"build":false, "infoToken": "Please, Introduce a Street Name"}
	}
	else
	{*/
		if(u.build(colorGroup))
		{
			jsonData={"build": true, "money":u.Token.money, "infoToken":u.Token.info}
		}
		else
		{
			jsonData={"build": false, "infoToken":u.Token.info}
		}

	//}	
	console.log(jsonData);
	response.send(jsonData);
})

app.get("/update/:uid", function(request, response)
{
	var jsonData;
	var u = game.getUser(request.params.uid)
	game.info = " ";
	u.Token.info = " ";	
	jsonData = {"namePhase": game.phase.name, "uid": u.uid, "name": u.name, "money": u.Token.money, "color": u.Token.color, "turn": u.turn, "position": u.Token.position}//, "properties": u.Token.properties, "stations": u.Token.stations, "publicServices": u.Token.publicServices}
	console.log(jsonData);
	response.send(JSON.stringify(jsonData));
})

app.get("/myPropertiesStreets/:uid", function(request, response)
{
	var jsonData;
	var u = game.getUser(request.params.uid)
	game.info = " ";
	u.Token.info = " ";
	var list = []
	//jsonData = {list}
	for(i=0; i<u.Token.properties.length; i++)
	{
		list.push(u.Token.properties[i])
	}
	
	response.send(list);
})
/*app.get("/changeMyTurn/:uid", function(request, response)
{
	var jsonData;
	var u = game.getUser(request.params.uid)
	u.passTurn();
	if(!u.turn)
		jsonData={"isChanged":true, "infoGame":game.info, "infoToken":u.Token.info}
	response.send(jsonData);
})*/

