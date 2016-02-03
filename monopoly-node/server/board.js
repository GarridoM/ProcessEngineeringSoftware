var mstatesStreet=require("./statesStreets.js");
var mstatesStations = require("./statesStations.js");
var mcards=require("./cards.js");

function Board(numberBoxes)
{
	this.name = "Board"
	this.boxes = []
	this.numberBoxes = numberBoxes

	this.addBox = function(position, Box)
	{
		this.boxes[position] = Box
	}

	this.startBoard = function()
	{
		for (i=0; i <numberBoxes; i++) {
			this.boxes[i] = new Box(i, new Normal())
			
		}
	}

	this.configureBoard = function()
	{

		'Start board box'
		this.addBox(0,new Box(new Exit()))

		'Streets of the board'
		this.addBox(1, new Box(new Street(60, "Mediterranean Avenue", "maroon")))
		this.addBox(3, new Box(new Street(60, "Baltic Avenue", "maroon")))

		this.addBox(6, new Box(new Street(100, "Oriental Avenue", "purple")))
		this.addBox(8, new Box(new Street(100, "Vermont Avenue", "purple")))
		this.addBox(9, new Box(new Street(120, "Connecticut Avenue", "purple")))

		this.addBox(11, new Box(new Street(140, "St. Charles Place", "pink")))
		this.addBox(13, new Box(new Street(140, "States Avenue", "pink")))
		this.addBox(14, new Box(new Street(160, "Virginia Avenue", "pink")))

		this.addBox(16, new Box(new Street(180, "St. James Place Avenue", "orange")))
		this.addBox(18, new Box(new Street(180, "Tennessee Avenue", "orange")))
		this.addBox(19, new Box(new Street(200, "New York Avenue", "orange")))

		this.addBox(21, new Box(new Street(220, "Kentucky Avenue", "red")))
		this.addBox(23, new Box(new Street(220, "Indiana Avenue", "red")))
		this.addBox(24, new Box(new Street(240, "Illinois Avenue", "red")))

		this.addBox(26, new Box(new Street(260, "Atlantic Avenue", "yellow")))
		this.addBox(27, new Box(new Street(260, "Ventnor Avenue", "yellow")))
		this.addBox(29, new Box(new Street(860, "Marvin Gardens", "yellow")))

		this.addBox(31, new Box(new Street(300, "Pacific Avenue", "green")))
		this.addBox(32, new Box(new Street(300, "North Carolina Avenue", "green")))
		this.addBox(34, new Box(new Street(320, "Pennsylvania Avenue", "green")))

		this.addBox(37, new Box(new Street(350, "Park Place", "blue")))
		this.addBox(39, new Box(new Street(400, "Boardwalk", "blue")))

		'Stations'
		this.addBox(5,new Box(new Station("Reading Railroad")))
		this.addBox(15,new Box(new Station("Pennsylvania Railroad")))
		this.addBox(25,new Box(new Station("Beo Railroad")))
		this.addBox(35,new Box(new Station("Short Line")))

		'Community Chest'
		this.addBox(2, new Box(new communityChest()))
		this.addBox(17, new Box(new communityChest()))
		this.addBox(33, new Box(new communityChest()))

		'Chance'
		this.addBox(7, new Box(new Chance()))
		this.addBox(22, new Box(new Chance()))
		this.addBox(36, new Box(new Chance()))

		'Public Services'
		this.addBox(12, new Box(new publicServices(150, "Electric Company")))
		this.addBox(28, new Box(new publicServices(150, "Water Works")))
		

		'Jail'
		this.addBox(10, new Box(new Jail()))

		'Taxes'
		this.addBox(4, new Box(new Tax(200, "Capital Tax")))
		this.addBox(38, new Box(new Tax(75, "Luxury Tax")))

		'Free parking'
		this.addBox(20, new Box(new freeParking()))

		'Go Jail'
		this.addBox(30, new Box(new goToJail()))

	}
	
	this.moveToken = function(game, token)
	{
		console.log(token.position)
		this.boxes[token.position].moveToken(game, token)
	}
	this.actionToDoNotRealPosition = function(token, position)
	{
		this.boxes[position].actionToDoNotRealPosition(token, position);
	}

	this.buy = function (token)
	{
		return this.boxes[token.position].buy(this, token);
	}

	this.sellBuildings = function(token)
	{
		return this.boxes[token.position].sellBuildings(token);
	}
	this.build = function(token, colorGroup)
	{
		return this.boxes[token.position].build(token, colorGroup)
	}
	this.goOutJail = function(game, token, optionChoosen)
	{
		console.log(game);
		console.log(token);
		console.log(optionChoosen + " 3");
		return this.boxes[token.position].goOutJail(game, token, optionChoosen)
	}

	this.mortgage = function(token)
	{
		console.log("hipotecando")
		return this.boxes[token.position].mortgage(token);
	}

	this.startBoard();
}

function Box(theme)
{
	this.theme = theme
	this.moveToken = function(game, token)
	{
		this.theme.moveToken(game, token);
	}
	this.actionToDoNotRealPosition = function(token, position)
	{
		this.theme.actionToDoNotRealPosition(token, position);
	}
	this.buy = function (board, token)
	{
		return this.theme.buy(board, token);
	}
	this.sellBuildings = function(token)
	{
		return this.theme.sellBuildings(token);
	}
	this.build = function(token, colorGroup)
	{
		return this.theme.build(token, colorGroup)
	}
	this.goOutJail=function(game, token, optionChoosen)
	{
		console.log(game);
		console.log(token);
		console.log(optionChoosen + " 4");
		return this.theme.goOutJail(game, token, optionChoosen)
	}
	this.mortgage = function(token)
	{
		console.log("hipotecando...")
		return this.theme.mortgage(token);
	}
}


function Normal()
{
	this.name = "Normal"
}

function Street(price, name, color)
{
	this.state = new mstatesStreet.Free();
	this.proper = undefined;
	this.price = price
	this.name = name
	this.color = color
	this.type = "Street"
	this.numberHouses = 0;
	this.hotel = false;
	this.stateMortgage=false;
	this.moveToken = function(game, token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
		token.info = "You are in " + this.name + " in the position: " + token.position;
		this.state.moveToken(token, this)
		if(this.proper != undefined && this.proper != token) this.payRenting(token);
	}
	this.buy = function(board, token)
	{
		return this.state.buyProper(board, token, this)
	}
	this.payRenting = function(token)
	{
		this.state.payRenting(token, this)
	}
	this.build = function(token, colorGroup)
	{
		return this.state.buildHouse(token, colorGroup)
	}
	this.mortgage = function(token)
	{
		console.log("hipotecando")
		return this.state.mortgage(token, this);
	}
	this.sellBuildings = function(token)
	{
		return this.state.sellBuildings(token, this);
	}

}

function communityChest()
{
	this.name = "Community Chest";
	this.cards = new mcards.Cards();
	this.moveToken = function(game, token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
		token.info = "You are in " + this.name + " in the position " + token.position;
		this.cards.readFollow(token);
	}
	this.buy = function(board, token)
	{
		console.log("No se puede comprar")
		token.info = "It is NOT available to buy";
	}
	this.mortgage = function(token)
	{
		token.info = "It is NOT mortgaged"
	}
	this.sellBuildings = function(token)
	{
		token.info = "This king of Box has NOT got Buildings"
	}
	this.build = function(token, colorGroup)
	{
		token.info = "You can NOT build in this box"
	}
}

function Chance()
{
	this.name = "Chance"
	this.cards = new mcards.Cards();

	this.moveToken = function(game, token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
		token.info = "You are in " + this.name + " in the position: " + token.position;
		this.cards.readFollow(token);
	}
	this.buy = function(board, token)
	{
		console.log("No se puede comprar")
		token.info = "No se puede comprar";
	}
	this.mortgage = function(token)
	{
		token.info = "It is NOT mortgaged"
	}
	this.sellBuildings = function(token)
	{
		token.info = "This king of Box has NOT got Buildings"
	}
	this.build = function(token, colorGroup)
	{
		token.info = "You can NOT build in this box"
	}
}
function Station(name)
{
	this.state = new mstatesStations.FreeStation()
	this.proper = undefined;
	this.price = 200
	this.name=name
	this.type = "Station"
	this.moveToken = function(game, token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
		token.info = "You are in " + this.name + " in the position: " + token.position;
		this.state.moveToken(token, this)
		if(this.proper != undefined && this.proper != token) this.payRenting();
	}
	this.buy = function(board, token)
	{
		return this.state.buyProper(token, this)
	}
	this.payRenting = function(token)
	{
		this.state.payRenting(token, this);
	}
	this.mortgage = function(token)
	{
		return this.state.mortgage(token, this);
	}

	this.sellBuildings = function(token)
	{
		token.info = "This king of Box has NOT got Buildings"
	}
	this.build = function(token, colorGroup)
	{
		token.info = "You can NOT build in this box"
	}
}

function publicServices(price, name)
{
	this.price = price;
	this.name = name;
	this.proper = undefined;
	this.stateBuy = false;
	this.stateMortgage = false;
	this.type = "PublicServices"

	this.moveToken = function(game, token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
		token.info = "You are in " + this.name + " in the position: " + token.position;
		if(this.proper != undefined && this.proper != token)
			this.payRenting(token);
	}
	this.buy = function(board, token)
	{
		/*console.log("Proceso Compraaaaa")
		console.log(this.price);
		console.log(token.money);
		console.log(this.stateBuy);*/
		if(this.stateBuy == false)
		{
			if(this.price > token.money)
			{
				token.info = "You do NOT have enough money";
				return false;
			}
			else
			{
				this.stateBuy = true;
				this.proper = token;
				token.publicServices[token.publicServices.length] = this;
				token.money = token.money - this.price;
				token.info = "You have bought!! Now, you have " + token.money;
				return true;
			}
		}
		else
		{
			console.log("Ya esta comprada")
			token.info = "It is NOT free";
			return false;
		}
			
	}
	this.payRenting = function(token)
	{
		if(this.stateMortgage == false)
			token.money = token.money - 30;
		else
			token.info = "You do NOT pay because It is mortgaged"
	}

	this.mortgage = function(token)
	{
		if(this.stateMortgage == false)
		{
			this.stateMortgage = true;
			token.info = "You receive " + this.price*1.25;
			token.money = token.money + this.price*1.25;
			token.mortagedPublicServices[token.mortagedPublicServices.length] = this;
			return true;
		}
		else
		{
			token.info = "It is mortgaged"
			return false;
		}

	}
	this.sellBuildings = function(token)
	{
		token.info = "This king of Box has NOT got Buildings"
	}
	this.build = function(token, colorGroup)
	{
		token.info = "You can NOT build in this box"
	}

}
function Jail()
{
	this.name = "Jail"
	this.moveToken = function(game, token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
		token.info = "You are in " + this.name + " in the position: " + token.position;
	}
	this.goOutJail = function(game, token, optionChoosen)
	{
		console.log(game);
		console.log(token);
		console.log(optionChoosen + " 5");
		console.log("OPTION: " + optionChoosen)
		if(optionChoosen == 1)
		{
			console.log("Pagando")
			token.money = token.money - 100;
			token.jail = false;
			token.info = token.info + "You are out"
			return true;
		}
		else if (optionChoosen == 2)
		{
			console.log("Cartaaa")
			if(token.cardGoOutJail)
			{
				token.jail = false;
				token.info = token.info + "You are out"
				return true;
			}
			else
			{
				token.info = token.info + "Sorry, you are NOT out"
				return false;
			}		
		}
		else if (optionChoosen == 3)
		{
			if(token.timesTriedGoOut < 4)
			{
				if(game.throwingDiceGoOut(token))
				{
					token.jail = false;
					token.info = token.info + "You are out"
					return true;
				}
				else
				{
					token.info = token.info + "Sorry, you are NOT out"
					return false;
				}					
			}				
			else
			{
				token.info = token.info + "You have to pay to go out"
				this.goOutJail(game, token, "Pagar");
			}
				
		}

	}

	this.buy = function(board, token)
	{
		console.log("No se puede comprar")
		token.info = token.info + "Yo can NOT buy"
	}

	this.mortgage = function(token)
	{
		token.info = token.info + "It is NOT mortgaged"
	}
	this.sellBuildings = function(token)
	{
		token.info = token.info + "This king of Box has NOT got Buildings"
	}
	this.build = function(token, colorGroup)
	{
		token.info = token.info + "You can NOT build in this box"
	}
}

function Tax(price, name)
{
	this.price = price;
	this.name = name;
	this.type = "Tax"
	this.moveToken = function(game, token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
		token.info = "You are in " + this.name + " in the position: " + token.position;
		this.paying(token)
	}
	this.buy = function(board, token)
	{
		console.log("No se puede comprar")
		token.info = "I can NOT buy";
	}
	this.paying = function(token)
	{
		token.money = token.money - this.price;
	}

	this.mortgage = function(token)
	{
		token.info = "It is NOT mortgaged"
	}
	this.sellBuildings = function(token)
	{
		token.info = "This king of Box has NOT got Buildings"
	}
	this.build = function(token, colorGroup)
	{
		token.info = "You can NOT build in this box"
	}

}

function freeParking()
{
	this.name = "free Parking"
	this.moveToken = function(game, token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
		token.info = "You are in " + this.name + " in the position: " + token.position;
	}
	this.buy = function(board, token)
	{
		console.log("No se puede comprar")
		token.info = "You can NOT buy";
	}	
	this.mortgage = function(token)
	{
		token.info = "It is NOT mortgaged"
	}
	this.sellBuildings = function(token)
	{
		token.info = "This king of Box has NOT got Buildings"
	}
	this.build = function(token, colorGroup)
	{
		token.info = "You can NOT build in this box"
	}
}
function goToJail()
{
	this.name = "Go to Jail"
	this.moveToken = function(game, token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
		token.info = "You are in " + this.name + " in the position: " + token.position;
		this.goJail(game, token);
	}

	this.goJail = function(game, token)
	{
		token.jail = true;
		//game.changedTurn();
		token.setPosition(10);
		console.log("Go to the Jail!")
		token.info = "Go to the Jail!"
		
	}
	this.buy = function(board, token)
	{
		console.log("No se puede comprar")
		token.info = "You can NOT buy"
	}

	this.mortgage = function(token)
	{
		token.info = "It is NOT mortgaged"
	}
	this.sellBuildings = function(token)
	{
		token.info = "This king of Box has NOT got Buildings"
	}
	this.build = function(token, colorGroup)
	{
		token.info = "You can NOT build in this box"
	}
}

function Exit()
{
	this.name="Exit"
	this.moveToken = function(game, token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
		token.info = "You are in " + this.name + " in the position: " + token.position;
		this.otherTimeHere(token);
	}
	this.actionToDoNotRealPosition = function(token)
	{
		this.otherTimeHere(token);
	}
	this.otherTimeHere = function(token)
	{
		token.setMoney(200);
		console.log("Tu salario a subido en 200 pelotis, ahora tienes " + token.money)
		token.info = "You receive 200 pelotis, now you have " + token.money;
	}
	this.buy = function(board,token)
	{
		console.log("No se puede comprar")
		token.info = ("You can NOT buy")
	}

	this.mortgage = function(token)
	{
		token.info = "It is NOT mortgaged"
	}
	this.sellBuildings = function(token)
	{
		token.info = "This king of Box has NOT got Buildings"
	}
	this.build = function(token, colorGroup)
	{
		token.info = "You can NOT build in this box"
	}
}

module.exports.Board = Board;
module.exports.Box = Box;
module.exports.Normal = Normal;
module.exports.Street = Street;
module.exports.communityChest = communityChest;
module.exports.Chance = Chance;
module.exports.Station = Station;
module.exports.publicServices = publicServices;
module.exports.Jail = Jail;
module.exports.Tax = Tax;
module.exports.freeParking = freeParking;
module.exports.goToJail = goToJail;
module.exports.Exit = Exit;