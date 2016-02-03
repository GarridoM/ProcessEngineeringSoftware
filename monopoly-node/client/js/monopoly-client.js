var url = "http://127.0.0.1:80/";
//var url = "http://server08-bd63j8ki.cloudapp.net/"
//var url = "http://procesos-w03fktfd.cloudapp.net/"
var socket = io();
var coord=[];
//var colorToken=["red","blue","green","black","yellow","grey"];
//var tokens={list:colorToken}
var propertiesList = [];
var propertiesName = [];
var propertiesColor = [];
var stationsProperties = [];
var publicServicesProperties = [];

function start()
{
	if($.cookie("uid") == undefined)
		showButtonAskToken();
	else{

		$.getJSON(url+"update/" + $.cookie("uid"), function(data){
			if(data.namePhase == "Initial")
			{
				if(data.position != -1)
					showStartingGame(data);		
				else
					alert(data.infoGame)
			}
			else if (data.namePhase == "Playing")
			{
				console.log("updating...")
				showStartingGame(data);
				showTableProperties();
				showTableStations();
				showTablePublicServices();
			}
			else
			{
				alert("The game has ended")
			}

		})

	}

}

function saveCookies(gamerUser)
{
	$.cookie("uid", gamerUser.uid)
	$.cookie("name", gamerUser.name)
	$.cookie("money", gamerUser.money)
	$.cookie("position", gamerUser.position)
	$.cookie("colorToken", gamerUser.color)
	$.cookie("secondPass", false);
	//$.cookie("timesMessage", 0)
}

//Functions to modify the file index.html
function showLabelInfo()
{
	$("#infoGame").addClass("infoGameClass");
	$("#infoGame").append("<p> <label id='infoGameLabelGrap'> <strong> Info: </strong></label></p>")
}

function showLabelsProperties()
{
	$("#propertiesStreets").append("<p> <div id='infoStreetLabel' class= 'table-responsive'><table class='table'><thead><tr><th>Street</th><th>Color</th></tr></thead></table></div></p>")
	$("#propertiesStations").append("<p> <div id='infoStationsLabel' class= 'table-responsive'><table class='table'><tr><th>Station</th></tr></table></div></p>")
	$("#propertiesPublicServices").append("<p> <div id='infoPublicServicesLabel' class= 'table-responsive'><table class='table'><tr><th>Public Service</th></tr></table></div></p>")
}

function showButtonAskToken()
{
	$("#buttonsAsk").append("<p id='askArea' style = 'text-align: center'> <label style= 'margin-right: 5px'> Nick: </label><input type ='text' id='name' placeholder='Nick'/><button class='btn btn-success' style='margin-left: 5px' id='askTokenButton'> Ask Token </button></p>");
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
	//showUid(uid);	
	showMoneyToken(money);
	showPositionToken(position);
	showColorToken(color);
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
	$("#results").append("<p id='name'><strong> Nick: </strong> " + name + "</p>")
}

function showUid(uid)
{
	$("#uid").remove();
	$("#results").append("<p id='uid'><strong>Uid: </strong>" + uid + "</p>")
}

function showColorToken(color)
{
	$("#tokenColor").remove();
	//$("#results").append("<p id='tokenColor'>Color: "+ color+"</p>")
	$("#results").append("<img id='tokenColor' src = 'client/img/"+ color+".png' width = 32 height = 32 >")
}
function showMoneyToken(money)
{
	$("#tokenMoney").remove();
	$("#results").append("<p id='tokenMoney'><strong>Money: </strong>"+ money+"</p>")
	$.cookie("money", money);
}

function showPositionToken(position)
{
	$("#tokenPosition").remove();	
	$("#results").append("<p id='tokenPosition'><strong>Position: </strong>"+ position+"</p>")
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
	$("#infoMensa").remove();
	if(message != undefined)
	{
		//$("#infoMensa").remove();
		//$("#infoMensa").remove();
		$("#infoGame").append("<div id='infoMensa'>" + message+"</div>")
	}
}

function showPropertiesUser(data)
{
	if(data.propertyBoughtType == 'Street')
	{
		saveProperty(data);
		showTableProperties();		
	}		
	else if (data.propertyBoughtType == 'Station')
	{
		saveStations(data);
		showTableStations();
	}		
	else if (data.propertyBoughtType == 'PublicServices')
	{
		savePublicServices(data);
		showTablePublicServices();
	}		
}

function saveProperty(data)
{
	propertiesList.push(data);
	$.cookie("street", JSON.stringify(propertiesList));		
}

function showTableProperties ()
{
	$('#streetTable').remove();
	var stringHeadTable = "<div id='streetTable' class= 'table-responsive'><table class='table table-bordered'><thead><tr class='success'><th>Street</th><th>Color</th></tr></thead> <tbody>";
	var stringRowTable = "";	
	var localProperties = JSON.parse($.cookie("street"));
	

	for (i = 0; i < localProperties.length; i++) {
		stringRowTable = stringRowTable + "<tr><th>"+ localProperties[i].propertyBought + "</th><th>" + localProperties[i].colorProperty + "</th></tr>"
	};
	
	stringRowTable = stringRowTable + "</tbody></table></div>";

	$("#propertiesStreets").append(stringHeadTable + stringRowTable);
}
function saveStations (data)
{
	stationsProperties.push(data.propertyBought);
	$.cookie("stationProper", JSON.stringify(stationsProperties));
}
function showTableStations()
{
	$('#stationsTable').remove();
	var stringHeadTable = "<div id='stationsTable' class= 'table-responsive'><table class='table table-bordered'><thead><tr class='success'><th>Stations</th></tr></thead> <tbody>";
	var stringRowTable = "";
	var localStations = JSON.parse($.cookie("stationProper"));

	for(i=0; i< localStations.length; i++)
	{
		stringRowTable = stringRowTable + "<tbody><tr><th>"+ localStations[i] + "</th></tr>"
	}
	
	stringRowTable = stringRowTable + "</tbody></table></div>";

	$("#propertiesStations").append(stringHeadTable + stringRowTable);
}
function savePublicServices (data)
{
	publicServicesProperties.push(data.propertyBought);
	$.cookie("publicService", JSON.stringify(publicServicesProperties));
}
function showTablePublicServices()
{
	$('#publicServicesTable').remove();
	var stringHeadTable = "<div id='publicServiceTable' class= 'table-responsive'><table class='table table-bordered'><thead><tr class='success'><th>Public Service</th></tr></thead> <tbody>";
	var stringRowTable = "";
	var localPublicService = JSON.parse($.cookie("publicService"));

	for(i=0; i<localPublicService.length; i++)
	{
		stringRowTable = stringRowTable + "<tbody><tr><th>"+ localPublicService[i] + "</th></tr>"
	}
	
	stringRowTable = stringRowTable + "</tbody></table></div>";

	$("#propertiesPublicServices").append(stringHeadTable + stringRowTable);	
}

function showPropertiesWithBuilding(propertyName, numberOfHouses)
{
	$("#propertiesStreets").append("<p id='propertiesStreetInfo'> BUILD:" + propertyName + " Houses: " + numberOfHouses +"</p>")
}
function showStarGameButton()
{	
	socket.emit('gameToPlay');
}

function showControlsStartToGame()
{
	$('#askStarGameButton').remove();
	//showInfoGame(message);
	showIsMyTurnButton();
}

function showIsMyTurnButton()
{
	socket.emit('isMyTurn', $.cookie("uid"))
}

function showThrowDiceButton()
{
	$("#buttons").append("<button class='btn btn-success' id='throwDiceButton'> Throw Dice</button>");
	$('#throwDiceButton').on("click", function(){
		throwingDice($.cookie("uid"));
	})
}

function showBuildButton(listGroupsColors)
{
	$("#listGroupsToBuild").remove();
	$("#buildButton").remove();
	var cadena= " ";
	for (i=0; i< listGroupsColors.length; i++) {
		cadena = cadena + "<option>"+ listGroupsColors[i] + "</option>"
	};
	$("#buttons").append("<select class='form-control' id='listGroupsToBuild'>"+ cadena +"</select><button id='buildButton'> Build </button>");
	$('#buildButton').on("click", function(){
		build($.cookie("uid"), $("#listGroupsToBuild option:selected").text());
	})
}

function showBuyButton()
{
	$('#buyButton').remove();
	$("#buttons").append("<button class='btn btn-success' id='buyButton'> Buy </button>");
	$('#buyButton').on("click", function(){
		buy($.cookie("uid"));
	})
}

function showSellingButton()
{
	$('#sellButton').remove();
	$("#buttons").append("<button class='btn btn-success' id='sellButton'> Sell Buildings </button>");
	$('#sellButton').on("click", function(){
		sell($.cookie("uid"));
	})
}

function showMortgageButton()
{
	$('#mortgageButton').remove();
	$("#buttons").append("<button class='btn btn-success' id='mortgageButton'> Mortgage </button>");
	$('#mortgageButton').on("click", function(){
		mortgage($.cookie("uid"));
	})
}

function showChangeTurnButton()
{		
	$('#changeTurnButton').remove();
	$("#buttons").append("<button class='btn btn-success' id='changeTurnButton'> Finish my turn</button>");
	$('#changeTurnButton').on("click", function(){
		$('#throwDiceButton').remove();
		$("#payToGoButton").remove();
		$("#doubleToGoButton").remove();
		$("#cardToGoButton").remove();
		$("#listGroupsToBuild").remove();
		$('#buildButton').remove();
		$('#buyButton').remove();
		$('#sellButton').remove();
		$('#mortgageButton').remove();
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
	//$("#leftSide").addClass("leftSideClass");

}

function showStartingGame(data)
{
	saveCookies(data);
	showInfoUser(data.name, data.uid, data.color, data.money, data.position);
	showStarGameButton();		
	showLabelInfo();
	//showLabelsProperties();
	showTitlePage();
	showInfoGame(data.infoToken);
	showInfoGame(data.infoGame);

}

function showDicesGame(diceOne, diceTwo)
{
	$('#dicesArea').remove();
	$("#dices").append("<p id='dicesArea'><img src='client/img/"+ diceOne +".png' width=32 height=32> <img src='client/img/"+ diceTwo +".png' width=32 height=32></p>")
}


function showOptionsToGoOut()
{
	showButtonPayToGo();
	showButtonDoubleToGo();
	if($.cookie("cardGoOutJail"))
		showButtonCardToGoOut();
}

function showButtonPayToGo()
{
	$("#buttons").append("<button class='btn btn-success' id='payToGoButton'> Pay </button>");
	$('#payToGoButton').on("click", function(){
		goOutOfJail($.cookie("uid"), 1);
	})	
}

function showButtonDoubleToGo()
{
	$("#buttons").append("<button class='btn btn-success' id='doubleToGoButton'> Try Double </button>");
	$('#doubleToGoButton').on("click", function(){
		goOutOfJail($.cookie("uid"), 3);
	})	
}

function showButtonCardToGoOut()
{
	$("#buttons").append("<button class='btn btn-success' id='cardToGoButton'> Use Card </button>");
	$('#cardToGoButton').on("click", function(){
		goOutOfJail($.cookie("uid"), 2);
	})	
}
//////////////////////////////////////////////////////////////////////////////
//Functions to connect with the server
/////////////////////////////////////////////////////////////////////////////
function getToken(name){
	$.getJSON(url+"newUser/"+name, function(data){
		
		$("#askArea").remove();
		if(data.position != -1)
			showStartingGame(data);		
		else
			alert(data.infoGame)
	})
}

function showIsGameReadyToPlay(data)
{
    if(data.namePhase == "Playing")
    {
    	alert("Game Starts!")
    	showControlsStartToGame();    	
    }
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
	$("#payToGoButton").remove();
	$("#doubleToGoButton").remove();
	$("#cardToGoButton").remove();
	$.getJSON(url+"throwingDice/"+uid, function(data){
		//removeToken();
		//var positionBefore = $.cookie("position");
		if(data.winner == undefined)
		{
			if(data.jail == false)
			{
				showPositionToken(data.position)
				showMoneyToken(data.money)	
				showInfoGame(data.infoToken);
				//showInfoGame(data.infoToken);
				showDicesGame(data.diceOne, data.diceTwo);
				showBuyButton();
				showSellingButton();
				showMortgageButton();
				showChangeTurnButton();		
				//loadToken(setToken);
				reloadPositionGraphs();
				$.cookie("cardGoOutJail", data.cardGoOutJail);
				$.cookie("jail", data.jail);
			}
			else
			{
				showDicesGame(data.diceOne, data.diceTwo);
				showPositionToken(data.position);
				alert(data.infoToken)
				showInfoGame(data.infoToken);
				//showChangeTurnButton();	
				reloadPositionGraphs();			
				$.cookie("cardGoOutJail", data.cardGoOutJail);
				$.cookie("jail", data.jail);
				
				$('#throwDiceButton').remove();
				
				if(($.cookie("secondPass")) == false)
				{
					$.cookie("secondPass", true);
					socket.emit('changeMyTurn', $.cookie("uid"))				
				}
				else
				{				
					showInfoGame("You are in the Jail, you have to decide how to go out")
					showOptionsToGoOut();
				}			
			}
		}
		else //if(data.namePhase == "End Game")
		{
			showWinner(data);
			
		}
		/*else
		{
			alert("Error")
		}*/
	})
}

function showWinner(data)
{
	socket.emit('showWinnerGame', data.winner)

	$("#name").remove();
	$("#uid").remove();
	$("#tokenColor").remove();
	$("#tokenMoney").remove();
	$("#tokenPosition").remove();
	$("#infoGame").remove();	
	$("#payToGoButton").remove();
	$("#doubleToGoButton").remove();
	$("#cardToGoButton").remove();
	$('#throwDiceButton').remove();
	$('#throwDiceButton').remove();
	$("#payToGoButton").remove();
	$("#doubleToGoButton").remove();
	$("#cardToGoButton").remove();
	$("#listGroupsToBuild").remove();
	$('#buildButton').remove();
	$('#buyButton').remove();
	$('#sellButton').remove();
	$('#mortgageButton').remove();
	$('#changeTurnButton').remove();
	$('#boardGraphics').remove();
	$('#dicesArea').remove();

	$("#dices").append("<p id='dicesArea'> End of The Game </p>")
	
}

function throwingDiceTest(position)
{	
	uid = $.cookie("uid");
	$("#payToGoButton").remove();
	$("#doubleToGoButton").remove();
	$("#cardToGoButton").remove();
	$.getJSON(url+"throwingDiceTest/"+uid+"/"+position, function(data){
		if(data.winner == undefined)
		{
			if(data.jail == false)
			{
				showPositionToken(data.position)
				showMoneyToken(data.money)	
				showInfoGame(data.infoToken);
				//showInfoGame(data.infoToken);
				showDicesGame(data.diceOne, data.diceTwo);
				showBuyButton();
				showSellingButton();
				showMortgageButton();
				showChangeTurnButton();		
				//loadToken(setToken);
				reloadPositionGraphs();
				$.cookie("cardGoOutJail", data.cardGoOutJail);
				$.cookie("jail", data.jail);
			}
			else
			{
				showDicesGame(data.diceOne, data.diceTwo);
				showPositionToken(data.position);
				alert(data.infoToken)
				showInfoGame(data.infoToken);
				//showChangeTurnButton();	
				reloadPositionGraphs();			
				$.cookie("cardGoOutJail", data.cardGoOutJail);
				$.cookie("jail", data.jail);
				
				$('#throwDiceButton').remove();
				
				if(($.cookie("secondPass")) == false)
				{
					$.cookie("secondPass", true);
					socket.emit('changeMyTurn', $.cookie("uid"))				
				}
				else
				{				
					showInfoGame("You are in the Jail, you have to decide how to go out")
					showOptionsToGoOut();
				}			
			}
		}
		else //if(data.namePhase == "End Game")
		{
			showWinner(data);
			
		}
	})
}

function goOutOfJail(uid, optionChoosen){
	$.getJSON(url+"goOutJail/"+uid+"/"+optionChoosen, function(data){
		showMoneyToken(data.money);
		showDicesGame(data.diceOne, data.diceTwo);
		showInfoGame(data.infoToken);
		$.cookie("cardGoOutJail", data.cardGoOutJail);
		$.cookie("jail", data.jail);
		if(!data.jail)
			$.cookie("secondPass", false);
		//showChangeTurnButton();
		$("#payToGoButton").remove();
		$("#doubleToGoButton").remove();
		$("#cardToGoButton").remove();
		socket.emit('changeMyTurn', $.cookie("uid"))
	})
}

function buy(uid)
{	
	$.getJSON(url+"buy/"+uid, function(data){
		if(data.buy)
		{
			showMoneyToken(data.money);
			showPropertiesUser(data);
			if(data.state == "Group")
			{
				
				//buildWhere($.cookie("uid"))
				showBuildButton(data.listGroup);	
			}
				
		}
		showInfoGame(data.infoToken);	
	})
}

function sell(uid)
{	
	$.getJSON(url+"sell/"+uid, function(data){
		if(data.sell)
		{
			showMoneyToken(data.money);
			//showPropertiesUser(data);
		}
		showInfoGame(data.infoToken);	
	})
}

function mortgage(uid)
{	
	$.getJSON(url+"mortgage/"+uid, function(data){
		if(data.mortgage)
		{
			showMoneyToken(data.money);
			//showPropertiesUser(data);
		}
		showInfoGame(data.infoToken);	
	})
}

/*function buildWhere(uid)
{
	alert("Estoy en el BUILD")
	$.getJSON(url+"buildWhere/"+uid, function(data){
		if(data.listGroupsColors.length > 0)
		{
			showBuildButton(data.listGroupsColors);			
		}
	})
}*/

function build(uid, colorGroup)
{
	console.log("BUILDING...")
	$.getJSON(url+"build/"+uid+"/"+colorGroup, function(data){
		console.log(data)
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

socket.on('showWinnerGame', function (data){
	if(data.name == $.cookie("name"))
		alert(data.info)
	else
		alert(data.info)
})