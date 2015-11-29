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

	this.startBoard()
	this.moveToken = function(game, token)
	{
		this.boxes[token.position].moveToken(game, token)
	}
	this.actionToDoNotRealPosition = function(token, position)
	{
		this.boxes[position].actionToDoNotRealPosition(token, position);
	}

	this.buy = function (token)
	{
		this.boxes[token.position].buy(this, token);
	}
	this.build = function(token, nameStreet)
	{
		this.boxes[token.position].build(token, nameStreet)
	}
	this.goOutJail = function(game, token, optionChoosen)
	{
		this.boxes[token.position].goOutJail(game, token, optionChoosen)
	}

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
		this.theme.buy(board, token);
	}
	this.build = function(token, nameStreet)
	{
		this.theme.build(token, nameStreet)
	}
	this.goOutJail=function(token, optionChoosen)
	{
		this.theme.build(token, optionChoosen)
	}
}


function Normal()
{
	this.name = "Normal"
}

function Street(price, name, color)
{
	this.state = new Free();
	this.proper = undefined;
	this.price = price
	this.name = name
	this.color = color
	this.type = "Street"
	this.numberHouses = 0;
	this.hotel = false;
	this.moveToken = function(game, token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
		this.state.moveToken(token, this)
		if(this.proper != undefined && this.proper != token) this.payRenting(token);
	}
	this.buy = function(board, token)
	{
		this.state.buyProper(board, token, this)
	}
	this.payRenting = function(token)
	{
		this.state.payRenting(token, this)
	}
	this.build = function(token, nameStreet)
	{
		this.state.buildHouse(token, nameStreet)
	}
}

function communityChest()
{
	this.name = "Community Chest";
	this.cards = new Cards();
	this.moveToken = function(game, token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
		this.cards.readFollow(token);
	}
	this.buy = function(board, token)
	{
		console.log("No se puede comprar")
	}
}

function Chance()
{
	this.name = "Chance"
	this.cards = new Cards();

	this.moveToken = function(game, token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
		this.cards.readFollow(token);
	}
	this.buy = function(board, token)
	{
		console.log("No se puede comprar")
	}
}
function Station(name)
{
	this.state = new FreeStation()
	this.proper = undefined;
	this.price = 200
	this.name=name
	this.type = "Station"
	this.moveToken = function(game, token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
		this.state.moveToken(token, this)
		if(this.proper != undefined && this.proper != token) this.payRenting();
	}
	this.buy = function(token)
	{
		this.state.buyProper(token, this)
	}
	this.payRenting = function(token)
	{
		this.state.payRenting(token, this);
	}
}

function publicServices(price, name)
{
	this.price = price;
	this.name = name;
	this.proper = undefined;
	this.stateBuy = false;
	this.type = "public Services"

	this.moveToken = function(game, token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
		if(this.proper != undefined && this.proper != token)
			this.payRenting(token);
	}
	this.buy = function(board, token)
	{
		if(this.stateBuy == false)
		{
			this.stateBuy = true;
			this.proper = token;
			token.publicServices[token.publicServices.length] = this;
			token.money = token.money - this.price;
		}
		else
			console.log("ya esta comprada")
	}
	this.payRenting = function(token)
	{
		token.money = token.money - 30;
	}

}
function Jail()
{
	this.name = "Jail"
	this.moveToken = function(game, token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
	}
	this.goOutJail = function(game, token, optionChoosen)
	{
		if(optionChoosen == "Pagar")
		{
			token.money = token.money - 100;
			token.jail = false;
		}
		else if (optionChoosen == "Carta")
		{
			if(token.cardGoOutJail)
				token.jail = false;
		}
		else if (optionChoosen == "Sacar Doble")
		{
			if(token.timesTriedGoOut < 4)
			{
				game.throwingDice(token)
			}
			else
				this.goOutJail(token, "Pagar");
		}

	}
	this.buy = function(board, token)
	{
		console.log("No se puede comprar")
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
		this.paying(token)
	}
	this.buy = function(board, token)
	{
		console.log("No se puede comprar")
	}
	this.paying = function(token)
	{
		token.money = token.money - this.price;
	}

}

function freeParking()
{
	this.name = "free Parking"
	this.moveToken = function(game, token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
	}
	this.buy = function(board, token)
	{
		console.log("No se puede comprar")
	}
}
function goToJail()
{
	this.name = "Go to Jail"
	this.moveToken = function(game, token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
		this.goJail(game, token);

	}

	this.goJail = function(game, token)
	{
		token.jail = true;
		token.setPosition(10);
		console.log("Go to the Jail!")
		game.changedTurn();
	}
	this.buy = function(board, token)
	{
		console.log("No se puede comprar")
	}
}

function Exit()
{
	this.name="Exit"
	this.moveToken = function(game, token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
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
	}
	this.buy = function(board,token)
	{
		console.log("No se puede comprar")
	}
}