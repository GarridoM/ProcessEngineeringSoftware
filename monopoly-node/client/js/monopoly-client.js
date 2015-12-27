var url = "http://127.0.0.1:1337/";


function start()
{
	showButtonAskToken();
}

function saveCookies(gamerUser)
{
	$.cookie("uid", gamerUser.uid)
	$.cookie("name", gamerUser.name)
	$.cookie("position", gamerUser.position)
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
	element.src = "client/img/board.png";
	element.alt = "Monopoly Board";
	//maxX = canvas.width;
	//maxY = canvas.height;
}

function showInfoUser(name, uid, color, money, position){
	showName(name);
	showUid(uid);
	showColorToken(color);
	showMoneyToken(money);
	showPositionToken(position);
	showBoardGame();
}

function showName(name)
{
	$("#name").remove();
	$("#results").append("<p id='name'>Name: " + name + "</p>")
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
}

function showPositionToken(position)
{
	$("#tokenPosition").remove();
	$("#results").append("<p id='tokenPosition'>Position: "+ position+"</p>")
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
	$("#buttons").append("<button id='askStarGameButton'> Start Game </button>");
	$('#askStarGameButton').on("click", function(){
		gameReadyToPlay();
	})
}

function showControlsStartToGame(message)
{
	$('#askStarGameButton').remove();
	showInfoGame(message)
	showIsMyTurnButton();
}

function showIsMyTurnButton()
{
	$('#isMyTurnButton').remove();
	$("#buttons").append("<button id='isMyTurnButton'> Is my turn?</button>");
	$('#isMyTurnButton').on("click", function(){
		checkIsMyTurn($.cookie("uid"));
	})
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
		changeMyTurn($.cookie("uid"));
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

function gameReadyToPlay()
{
	$.getJSON(url+"gameToPlay/", function(data){		
		if(data.namePhase == "Playing")
		{
			showControlsStartToGame("Game Starts!");
		}
		else
			showInfoGame("There are not all players, you have to wait")
		
	})
}

function checkIsMyTurn(uid)
{
	$.getJSON(url+"isMyTurn/"+uid, function(data){		
		if(data.turn)
		{
			showControlsGame();
			//showInfoGame(data.infoGame);
			//showInfoGame(data.infoToken);
		}
		else
			showInfoGame("It is not your turn");		
	})
}

function throwingDice(uid)
{	
	$.getJSON(url+"throwingDice/"+uid, function(data){
		showPositionToken(data.position)
		showMoneyToken(data.money)	
		showInfoGame(data.infoGame + "<p>" + data.infoToken);
		//showInfoGame(data.infoToken);
		showBuyButton();
		showChangeTurnButton();
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
function changeMyTurn(uid)
{
	$.getJSON(url+"changeMyTurn/"+uid, function(data){
		if(data.isChanged)
			showIsMyTurnButton();	

		//showInfoGame(data.infoGame);
		//showInfoGame(data.infoToken);	
	})
}