//var url = "http://127.0.0.1:1337/";
var url = "http://server08-bd63j8ki.cloudapp.net/"
var socket = io();
var coord=[];
//var colorToken=["red","blue","green","black","yellow","grey"];
//var tokens={list:colorToken}

function start()
{
	showButtonAskToken();
}

function saveCookies(gamerUser)
{
	$.cookie("uid", gamerUser.uid)
	$.cookie("name", gamerUser.name)
	$.cookie("money", gamerUser.money)
	$.cookie("position", gamerUser.position)
	$.cookie("colorToken", gamerUser.color)
	//$.cookie("timesMessage", 0)
}

//Functions to modify the file index.html
function showLabelInfo()
{
	$("#infoGame").append("<p> <label id='infoGameLabelGrap'> <strong> Info: </strong></label></p>")
}

function showLabelsProperties()
{
	$("#propertiesStreets").append("<p> <label id='infoStreetLabel'> <strong> Streets' Properties: </strong></label></p>")
	$("#propertiesStations").append("<p> <label id='infoStreetLabel'> <strong> Stations' Properties: </strong></label></p>")
	$("#propertiesPublicServices").append("<p> <label id='infoStreetLabel'> <strong> Public Services' Properties: </strong></label></p>")
}

function showButtonAskToken()
{
	$("#buttonsAsk").append("<p id='askArea' style = 'text-align: center'> <label style= 'margin-right: 5px'> Nick: </label><input type ='text' id='name' placeholder='Nick'/><button class='btn btn-primary active' style='margin-left: 5px' id='askTokenButton'> Ask Token </button></p>");
	$('#askTokenButton').on("click", function(){
		getToken($("#name").val());
	})
}

function showBoardGame()
{
	var element=document.getElementById("boardGraphics");
	ctx = element.getContext("2d");
	//ctx.clearRect(0, 0, element.width, element.height);
	var imgBoard = new Image();

	imgBoard.onload = function (){
		ctx.drawImage(imgBoard, 0, 0);
	}
	imgBoard.src = "client/img/board.png";
	
	maxX = element.width;
	maxY = element.height;
}

function showInfoUser(name, uid, color, money, position){
	showName(name);
	showUid(uid);
	showColorToken(color);
	showMoneyToken(money);
	showPositionToken(position);
	showInitialGraphs();
	//showBoardGame();
}

function showInitialGraphs()
{
	showBoardGame();
	loadCoordinates();
	loadToken(setToken);
}

function reloadPositionGraphs()
{
	showBoardGame();
	loadToken(setToken);
}
//cargarFichas
function loadToken (callback){
	
	var colorToken = $.cookie("colorToken");
	var imgToken = new Image();
	//removeToken(positionBefore, imgToken);
	
	imgToken.src = "client/img/"+ colorToken + ".png";

	ctx.drawImage(imgToken, maxX, maxY);
	
	imgToken.onload = function (){
		callback(imgToken);
	}
}
//ponerFicha
function setToken (imgToken){
	var x, y;
	var position = $.cookie("position");	
	ctx.globalAlpha = 1;
	if(position>=0 && position <40){
		x = coord[position][0];
		y = coord[position][1];
		ctx.drawImage(imgToken, x, y, 30, 30);
	}
}


function loadCoordinates (){
	for(i=0;i<40;i++) 
		coord[i]=[];
	inc=55;

	coord[0].push(maxX-inc*1.2)
	coord[0].push(maxY-inc*1.2);

	coord[1].push(maxX-inc*2.5);
	coord[1].push(maxY-inc*1.2);

	coord[2].push(maxX-inc*3.5);
	coord[2].push(maxY-inc*1.2);

	coord[3].push(maxX-inc*4.8);
	coord[3].push(maxY-inc*1.2);

	coord[4].push(maxX-inc*5.8);
	coord[4].push(maxY-inc*1.2);

	coord[5].push(maxX-inc*6.8);
	coord[5].push(maxY-inc*1.2);

	coord[6].push(maxX-inc*7.8);
	coord[6].push(maxY-inc*1.2);

	coord[7].push(maxX-inc*8.8);
	coord[7].push(maxY-inc*1.2);

	coord[8].push(maxX-inc*9.8);
	coord[8].push(maxY-inc*1.2);

	coord[9].push(maxX-inc*11);
	coord[9].push(maxY-inc*1.2);

	coord[10].push(maxX-inc*12.5)
	coord[10].push(maxY-inc*0.5);

	coord[11].push(maxX-inc*12.5);
	coord[11].push(maxY-inc*2.5);

	coord[12].push(maxX-inc*12.5);
	coord[12].push(maxY-inc*3.5);

	coord[13].push(maxX-inc*12.5);
	coord[13].push(maxY-inc*4.8);

	coord[14].push(maxX-inc*12.5);
	coord[14].push(maxY-inc*5.8);

	coord[15].push(maxX-inc*12.5);
	coord[15].push(maxY-inc*6.8);

	coord[16].push(maxX-inc*12.5);
	coord[16].push(maxY-inc*7.8);

	coord[17].push(maxX-inc*12.5);
	coord[17].push(maxY-inc*8.8);

	coord[18].push(maxX-inc*12.5);
	coord[18].push(maxY-inc*9.8);

	coord[19].push(maxX-inc*12.5);
	coord[19].push(maxY-inc*11);

	coord[20].push(maxX-inc*12.5)
	coord[20].push(maxY-inc*12.5);

	coord[21].push(maxX-inc*11)
	coord[21].push(maxY-inc*12.5);

	coord[22].push(maxX-inc*9.8)
	coord[22].push(maxY-inc*12.5);

	coord[23].push(maxX-inc*8.8)
	coord[23].push(maxY-inc*12.5);

	coord[24].push(maxX-inc*7.8)
	coord[24].push(maxY-inc*12.5);

	coord[25].push(maxX-inc*6.8)
	coord[25].push(maxY-inc*12.5);

	coord[26].push(maxX-inc*5.8)
	coord[26].push(maxY-inc*12.5);

	coord[27].push(maxX-inc*4.8)
	coord[27].push(maxY-inc*12.5);

	coord[28].push(maxX-inc*3.5)
	coord[28].push(maxY-inc*12.5);

	coord[29].push(maxX-inc*2.5)
	coord[29].push(maxY-inc*12.5);

	coord[30].push(maxX-inc*1.2)
	coord[30].push(maxY-inc*12.5);

	coord[31].push(maxX-inc*1.2);
	coord[31].push(maxY-inc*11);

	coord[32].push(maxX-inc*1.2);
	coord[32].push(maxY-inc*9.8);

	coord[33].push(maxX-inc*1.2);
	coord[33].push(maxY-inc*8.8);

	coord[34].push(maxX-inc*1.2);
	coord[34].push(maxY-inc*7.8);

	coord[35].push(maxX-inc*1.2);
	coord[35].push(maxY-inc*6.8);

	coord[36].push(maxX-inc*1.2);
	coord[36].push(maxY-inc*5.8);

	coord[37].push(maxX-inc*1.2);
	coord[37].push(maxY-inc*4.8);

	coord[38].push(maxX-inc*1.2);
	coord[38].push(maxY-inc*3.5);

	coord[39].push(maxX-inc*1.2);
	coord[39].push(maxY-inc*2.5);
}
function showName(name)
{
	$("#name").remove();
	$("#results").append("<p id='name'>Nick: " + name + "</p>")
}

function showUid(uid)
{
	$("#uid").remove();
	$("#results").append("<p id='uid'>Uid: " + uid + "</p>")
}

function showColorToken(color)
{
	$("#tokenColor").remove();
	$("#results").append("<p id='tokenColor'>Color: "+ color+"</p>")
}
function showMoneyToken(money)
{
	$("#tokenMoney").remove();
	$("#results").append("<p id='tokenMoney'>Money: "+ money+"</p>")
	$.cookie("money", money);
}

function showPositionToken(position)
{
	$("#tokenPosition").remove();	
	$("#results").append("<p id='tokenPosition'>Position: "+ position+"</p>")
	$.cookie("position", position)
}

function showInfoGame(message)
{
	//$("#infoMensa").remove();	
	//var times = $.cookie("timesMessage") + 1;
	/*$.cookie("timesMessage", ($.cookie("timesMessage")+1))
	if($.cookie("timesMessage") == 4)
	{
		console.log("aki!")
		$("#infoGame").remove();
		$.cookie("timesMessage") = 0;
	}*/

	if(message != undefined)
	{
		$("#infoMensa").remove();
		$("#infoGame").append("<p id='infoMensa'>" + message+"</p>")
	}
}

function showPropertiesUser(propertyName, propertyType)
{
	if(propertyType == 'Street')
		$("#propertiesStreets").append("<p id='propertiesStreetInfo'>" + propertyName + " " +"</p>")
	else if (propertyType == 'Station')
		$("#propertiesStations").append("<p id='propertiesStationInfo'>" + propertyName + "</p>")
	else
		$("#propertiesPublicServices").append("<p id='propertiesPublicServiceInfo'>" + propertyName +"</p>")
}

function showPropertiesWithBuilding(propertyName, numberOfHouses)
{
	$("#propertiesStreets").append("<p id='propertiesStreetInfo'> BUILD:" + propertyName + " Houses: " + numberOfHouses +"</p>")
}
function showStarGameButton()
{	
	socket.emit('gameToPlay');
}

function showControlsStartToGame(message)
{
	$('#askStarGameButton').remove();
	showInfoGame(message);
	showIsMyTurnButton();
}

function showIsMyTurnButton()
{
	socket.emit('isMyTurn', $.cookie("uid"))
}

function showThrowDiceButton()
{
	$("#buttons").append("<button id='throwDiceButton'> Throw Dice</button>");
	$('#throwDiceButton').on("click", function(){
		throwingDice($.cookie("uid"));
	})
}

function showBuildButton(listGroupsColors)
{
	var cadena= " ";
	for (i=0; i< listGroupsColors.length; i++) {
		cadena = cadena + "<option>"+ listGroupsColors[i] + "</option>"
	};
	$("#buttons").append("<select id='listGroupsToBuild'>"+ cadena +"</select><button id='buildButton'> Build </button>");
	$('#buildButton').on("click", function(){
		build($.cookie("uid"), $("listGroupsToBuild option:selected").text());
	})
}

function showBuyButton()
{
	$('#buyButton').remove();
	$("#buttons").append("<button id='buyButton'> Buy </button>");
	$('#buyButton').on("click", function(){
		buy($.cookie("uid"));
	})
}

function showChangeTurnButton()
{		
	$('#changeTurnButton').remove();
	$("#buttons").append("<button id='changeTurnButton'> Finish my turn</button>");
	$('#changeTurnButton').on("click", function(){
		$('#throwDiceButton').remove();
		$('#buildButton').remove();
		$('#buyButton').remove();
		$('#changeTurnButton').remove();
		//changeMyTurn($.cookie("uid"));
		socket.emit('changeMyTurn', $.cookie("uid"))
	})
}

function showControlsGame()
{
	$('#isMyTurnButton').remove();
	showThrowDiceButton();
	//showBuildButton();
}

function showTitlePage()
{
	var element = document.getElementById("titlePageMonopoly")
	element.innerHTML = "Monopoly";

}

//Functions to connect with the server
function getToken(name){
	$.getJSON(url+"newUser/"+name, function(data){
		
		$("#askArea").remove();
		if(data.position != -1)
		{
			saveCookies(data);
			showInfoUser(data.name, data.uid, data.color, data.money, data.position);
			showStarGameButton();			
		}		
		showLabelInfo();
		showLabelsProperties();
		showTitlePage();
		showInfoGame(data.infoToken);
		showInfoGame(data.infoGame);

	})
}

function showIsGameReadyToPlay(data)
{
    if(data.namePhase == "Playing")
    	showControlsStartToGame("Game Starts!");
    else
		showInfoGame(data.info);
}

function showCheckIsMyTurn(data)
{
	if(data.turn && (data.uid == $.cookie("uid")))
		showControlsGame();
	else
		showInfoGame(data.infoToken);		
}

function throwingDice(uid)
{	
	$.getJSON(url+"throwingDice/"+uid, function(data){
		//removeToken();
		//var positionBefore = $.cookie("position");
		showPositionToken(data.position)
		showMoneyToken(data.money)	
		showInfoGame(data.infoGame + "<p>" + data.infoToken);
		//showInfoGame(data.infoToken);
		showBuyButton();
		showChangeTurnButton();		
		//loadToken(setToken);
		reloadPositionGraphs();
	})
}

function buy(uid)
{	
	$.getJSON(url+"buy/"+uid, function(data){
		if(data.buy)
		{
			showMoneyToken(data.money);
			showPropertiesUser(data.propertyBought, data.propertyBoughtType)
		}
		showInfoGame(data.infoToken);	
	})
}

function buildWhere(uid)
{
	$.getJSON(url+"buildWhere/"+uid, function(data){
		if(data.listGroupsColors.length > 0)
		{
			showBuildButton(data.listGroupsColors);			
		}
	})
}

function build(uid, nameStreet)
{
	$.getJSON(url+"build/"+uid+nameStreet, function(data){
		if(data.build)
		{
			showMoneyToken(data.money);
			//showPropertiesWithBuilding(data.property, data.numberOfHouses)
		}
		showInfoGame(data.infoToken);	
	})
}


/*function changeMyTurn(uid)
{
	$.getJSON(url+"changeMyTurn/"+uid, function(data){
		if(data.isChanged)
			showIsMyTurnButton();	

		//showInfoGame(data.infoGame);
		//showInfoGame(data.infoToken);	
	})
}
*/

// Sockets events

socket.on('gameToPlay', function (data) {
	showIsGameReadyToPlay(data);

});

socket.on('checkIsMyTurn', function (data){
	showCheckIsMyTurn(data);
})

socket.on('changeMyTurn', function (data){
	if(data.isChanged)
		showIsMyTurnButton();
	else
		alert("Error");
})