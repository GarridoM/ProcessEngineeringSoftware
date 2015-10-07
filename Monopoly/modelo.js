function Tablero(numeroCasillas)
{
	this.casillas = []
	this.numeroCasillas = numeroCasillas
	this.agregarCasilla = function(posicion, Box)
	{
		this.casillas[posicion] = Box
	}

	this.iniciarTablero = function()
	{
		for (i=0; i <numeroCasillas; i++) {
			this.casillas[i] = new Box(i, new Normal())
			
		}
	}
	this.configurarTablero()
	{

		'Start board box'
		this.agregarCasilla(0,new Box(new Exit()))

		'Streets of the board'
		this.agregarCasilla(1, new Box(new Street(60, "Mediterranean Avenue", "maroon")))
		this.agregarCasilla(3, new Box(new Street(60, "Baltic Avenue", "maroon")))

		this.agregarCasilla(6, new Box(new Street(100, "Oriental Avenue", "purple")))
		this.agregarCasilla(8, new Box(new Street(100, "Vermont Avenue", "purple")))
		this.agregarCasilla(9, new Box(new Street(120, "Connecticut Avenue", "purple")))

		this.agregarCasilla(11, new Box(new Street(140, "St. Charles Place", "pink")))
		this.agregarCasilla(13, new Box(new Street(140, "States Avenue", "pink")))
		this.agregarCasilla(14, new Box(new Street(160, "Virginia Avenue", "pink")))

		this.agregarCasilla(16, new Box(new Street(180, "St. James Place Avenue", "orange")))
		this.agregarCasilla(18, new Box(new Street(180, "Tennessee Avenue", "orange")))
		this.agregarCasilla(19, new Box(new Street(200, "New York Avenue", "orange")))

		this.agregarCasilla(21, new Box(new Street(220, "Kentucky Avenue", "red")))
		this.agregarCasilla(23, new Box(new Street(220, "Indiana Avenue", "red")))
		this.agregarCasilla(24, new Box(new Street(240, "Illinois Avenue", "red")))

		this.agregarCasilla(26, new Box(new Street(260, "Atlantic Avenue", "yellow")))
		this.agregarCasilla(27, new Box(new Street(260, "Ventnor Avenue", "yellow")))
		this.agregarCasilla(29, new Box(new Street(860, "Marvin Gardens", "yellow")))

		this.agregarCasilla(31, new Box(new Street(300, "Pacific Avenue", "green")))
		this.agregarCasilla(32, new Box(new Street(300, "North Carolina Avenue", "green")))
		this.agregarCasilla(34, new Box(new Street(320, "Pennsylvania Avenue", "green")))

		this.agregarCasilla(37, new Box(new Street(350, "Park Place", "blue")))
		this.agregarCasilla(39, new Box(new Street(400, "Boardwalk", "blue")))

		'Stations'
		this.agregarCasilla(5,new Box(new Station("Reading Railroad")))
		this.agregarCasilla(15,new Box(new Station("Pennsylvania Railroad")))
		this.agregarCasilla(25,new Box(new Station("Beo Railroad")))
		this.agregarCasilla(35,new Box(new Station("Short Line")))

		'Community Chest'
		this.agregarCasilla(2, new Box(new communityChest()))
		this.agregarCasilla(17, new Box(new communityChest()))
		this.agregarCasilla(33, new Box(new communityChest()))

		'Chance'
		this.agregarCasilla(7, new Box(new chance()))
		this.agregarCasilla(22, new Box(new chance()))
		this.agregarCasilla(36, new Box(new chance()))

		'Jail'
		this.agregarCasilla(10, new )


	}
	this.iniciarTablero()

}

function Box(tema)
{
	this.tema = tema
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
}

function communityChest()
{
	this.name = "Community Chest"
}

function chance()
{
	this.name = "Chance"
}
function Station(name)
{
	this.price = 200
	this.name=name
}
function Jail(option)
{
	this.name = name
	this.option = option
}

function Exit()
{
	this.name="Exit"
}

function iniGame()
{
	board = new Board(40)
	board.configurarTablero()
}