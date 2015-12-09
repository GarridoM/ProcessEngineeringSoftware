function InitialPhase(game)
{
	this.game = game;
	this.name = "Initial"
	console.log("La partida esta creada")
	this.game.iniBoard();
	this.game.iniTokens();

	this.addUser = function (user)
	{
		return true;
	}
	this.throwingDice = function (token)
	{
		console.log ("Todavia no puedes lanzar los dados. El juego no ha comenzado!!")
		token.info = "Todavia no puedes lanzar los dados. El juego no ha comenzado!!";
		return false;
	}
	this.checkChangedPhase = function()
	{
		if((this.game.players.length) == (this.game.minNumPlayers))		
			this.game.phase = new PlayingPhase(this.game);
	}
}

function PlayingPhase(game)
{
	this.game = game;
	this.name = "Playing"
	console.log("Estoy dentro")
	this.game.startGame();
	this.addUser = function(token)
	{
		//console.log("Tarde! Ya no puedes jugar en esta partida :S")
		this.game.info = "It is so late! You cannot play in this game :S"
		return false;
	}
	this.throwingDice = function (token)
	{
		return true;
	}
}

function EndPhase(game)
{
	this.game = game;
	this.name = "End Game"
	this.addUser = function(token)
	{
		console.log("El juego ya ha terminado")
		token.info = "El juego ya ha terminado";
		return false;
	}

	this.throwingDice = function(token)
	{
		console.log("El juego ya ha terminado")
		token.info = "El juego ya ha terminado"
		return false;
	}

	//Añadir la condicion de finalizacion
	this.isEnded = function ()
	{
		console.log("El Ganador es: " + this.game.winner)
		this.game.info = "El Ganador es: " + this.game.winner;
	}
	this.isEnded();

}

module.exports.InitialPhase = InitialPhase;
module.exports.PlayingPhase = PlayingPhase;
module.exports.EndPhase = EndPhase;