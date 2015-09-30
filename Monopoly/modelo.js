function Tablero(numeroCasillas)
{
	this.casillas = []
	this.numeroCasillas = numeroCasillas
	this.agregarCasilla = function(posicion, casilla)
	{
		this.casillas[posicion] = casilla
	}

	this.iniciarTablero = function()
	{
		for (i=0; i <numeroCasillas; i++) {
			this.casillas[i] = new Casilla(i, new Normal())
			
		}
	}
	this.configurarTablero()
	{
		this.agregarCasilla(0,new Casilla(new Salida()))

	}
	this.iniciarTablero()
}

function Casilla(tema)
{
	this.tema = tema
}

function Normal()
{
	this.nombre = "Normal"
}

function Salida()
{
	this.nombre="Salida"
}

function iniJuego()
{
	tablero = new Tablero(40)
	tablero.configurarTablero()
}