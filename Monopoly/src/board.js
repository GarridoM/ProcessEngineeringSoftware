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

		'Income Tax'
		this.addBox(4, new Box(new Tax("option")))

		'Jail'
		this.addBox(10, new Box(new Jail("option")))

		'othersExpenses'
		this.addBox(12, new Box(new othersExpenses(150, "Electric Company")))
		this.addBox(28, new Box(new othersExpenses(150, "Water Works")))
		this.addBox(38, new Box(new othersExpenses(75, "Luxury Tax")))

		'Free parking'
		this.addBox(20, new Box(new freeParking()))

		'Go Jail'
		this.addBox(30, new Box(new goToJail()))

	}

	this.startBoard()
	this.moveToken = function(token)
	{
		this.boxes[token.position].moveToken(token)
	}

}

function Box(theme)
{
	this.theme = theme
	this.moveToken = function(token)
	{
		this.theme.moveToken(token);
	}
}


function Normal()
{
	this.name = "Normal"
}

function Street(price, name, color)
{
	this.price = price
	this.name = name
	this.color = color
	this.type = "Street"
	this.moveToken = function(token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
	}
}

function communityChest()
{
	this.name = "Community Chest"
	this.moveToken = function(token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
	}
}

function Chance()
{
	this.name = "Chance"
	this.moveToken = function(token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
	}
}
function Station(name)
{
	this.price = 200
	this.name=name
	this.type = "Station"
	this.moveToken = function(token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
	}
}
function Tax(option)
{
	this.name = "Tax box"
	this.option = option
	this.moveToken = function(token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
	}

}
function Jail(option)
{
	this.name = "Jail"
	this.option = option
	this.moveToken = function(token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
	}
}
function othersExpenses(price, name)
{
	this.price = price;
	this.name = name;
	this.type = "Others Expenses"
	this.moveToken = function(token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
	}	

}

function freeParking()
{
	this.name = "free Parking"
	this.moveToken = function(token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
	}
}
function goToJail()
{
	this.name = "Go to Jail"
	this.moveToken = function(token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
		this.goJail(token);

	}

	this.goJail = function(token)
	{
		token.setPosition(10);
		console.log("Vas a la carcel!")
	}
}

function Exit()
{
	this.name="Exit"
	this.moveToken = function(token)
	{
		console.log("Esta en " + this.name + " En la posicion " + token.position);
	}
}