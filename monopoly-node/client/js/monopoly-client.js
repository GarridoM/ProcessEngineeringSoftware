var url = "http://127.0.0.1:1337/";


function start()
{
	showButtonAskToken();
}

function saveCookies(gamerUser)
{
	$.cookie("uid", gamerUser.uid)
}

//Functions to modify the file index.html
function showButtonAskToken()
{
	$("#buttons").append("<p id='askArea'>Name: <input type ='text' id='name'/><button id='askTokenButton'> Ask Token </button></p>");
	$('#askTokenButton').on("click", function(){
		getToken($("#name").val());
	})
}

function removeButtonAskToken()
{
	$("#askArea").remove();
}

function showInfoUser(name, uid, color, money, position){
	showName(name);
	showUid(uid);
	showColorToken(color);
	showMoneyToken(money);
	showPositionToken(position);
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

function showInfoGame(mensage)
{
	$("#infoMensa").remove();
	$("#infoGame").append("<p id='infoMensa'>Info: "+ mensage+"</p>")

}

function showStarGameButton()
{
	$("#buttons").append("<button id='askStarGameButton'> Start Game </button>");
	$('#askStarGameButton').on("click", function(){
		gameReadyToPlay()
	})
}

function showControlsStartToGame(mensage)
{
	$('#askStarGameButton').remove();	
	showInfoGame(mensage)
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

function buildButton()
{
	$("#buttons").append("<button id='buildButton'> Build </button>");
	$('#buildButton').on("click", function(){
		//throwingDice($.cookie("uid"));
	})
}

function showBuyButton()
{
	$("#buttons").append("<button id='buyButton'> Buy </button>");
	$('#buyButton').on("click", function(){
		buy($.cookie("uid"));
	})
}

function showChangeTurnButton()
{
	$("#buttons").append("<button id='changeTurnButton'> Finish my turn</button>");
	$('#changeTurnButton').on("click", function(){
		$('#throwDiceButton').remove();
		$('#buyButton').remove();
		$('#changeTurnButton').remove();
		changeMyTurn($.cookie("uid"));
	})
}

function showControlsGame()
{
	$('#isMyTurnButton').remove();
	showThrowDiceButton();
	buildButton();
}

//Functions to connect with the server
function getToken(name){
	$.getJSON(url+"newUser/"+name, function(data){
		
		removeButtonAskToken();
		if(data.position != -1)
			saveCookies(data);

		showInfoUser(data.name, data.uid, data.color, data.money, data.position);
		showStarGameButton();
	})
}

function gameReadyToPlay()
{
	$.getJSON(url+"gameToPlay/", function(data){		
		if(data.ready)
		{
			showControlsStartToGame("Game Starts!");
		}			
	})
}

function checkIsMyTurn(uid)
{
	$.getJSON(url+"isMyTurn/"+uid, function(data){		
		if(data.turn)
		{
			showControlsGame();
		}			
	})
}

function throwingDice(uid)
{	
	$.getJSON(url+"throwingDice/"+uid, function(data){
		showPositionToken(data.position)
		showBuyButton();
		showChangeTurnButton();
	})
}

function buy(uid)
{	
	$.getJSON(url+"buy/"+uid, function(data){
		if(data.buy)
			showInfoGame("ya compra")		
	})
}

function changeMyTurn(uid)
{
	$.getJSON(url+"changeMyTurn/"+uid, function(data){
		if(data.isChanged)
			showIsMyTurnButton();		
	})
}