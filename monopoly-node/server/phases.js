function InitialPhase(game)
{
	this.game = game;
	this.name = "Initial"
	console.log("La partida esta creada")
	this.game.iniBoard();
	this.game.iniTokens();

	this.addUser = function (user)
	{
		this.game.addingUser(user);
		if((this.game.players.length) == (this.game.minNumPlayers))
		{			
			this.game.phase = new PlayingPhase(this.game);
			console.log("Ya estan todos los usuarios, comienza el juego!")
		}
	}
	this.throwingDice = function (token)
	{
		console.log ("Todavia no puedes lanzar los dados. El juego no ha comenzado!!")
		return false;
	}
}

function PlayingPhase(game)
{
	this.game = game;
	this.name = "Playing..."
	this.game.startGame();
	this.addUser = function(token)
	{
		console.log("Tarde! Ya no puedes jugar en esta partida :S")
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
	}

	this.throwingDice = function(token)
	{
		console.log("El juego ya ha terminado")
	}

	//Añadir la condicion de finalizacion
	this.isEnded = function ()
	{
		console.log("El Ganador es: " + this.game.winner)
	}
	this.isEnded();

}

module.exports.InitialPhase = InitialPhase;
module.exports.PlayingPhase = PlayingPhase;
module.exports.EndPhase = EndPhase;