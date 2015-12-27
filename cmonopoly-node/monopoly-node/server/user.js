function User(name, game){

	this.name = name;
	this.userName = undefined;
	this.Password = undefined;
	this.Token = undefined;
	this.Game = undefined;
	this.turn = false;
	this.uid = undefined;

	this.askToken = function(game)
	{
		this.Game = game;
		this.Token = game.askToken();
	}

	this.throwingDice = function()
	{		
		//I write dependig of game just in case that the user doesnt have any game, ie, it isnt playing.
		if(this.Game.phase.throwingDice())
		{
			if(this.turn)
			 	if(this.Token.jail)
			 	{
			 		console.log("Estas en la carcel")
			 		//this.goOutingJail();
			 		this.Token.info = "Estas en la carcel"
			 	}
			 	else
					this.Game.throwingDice(this.Token)
			else 
			{
				console.log("No es tu turno")
				this.Token.info = "No es tu turno"
			}
				
		}
	}

	this.throwingDiceTest = function(numberPosition)
	{
		if(this.Game.phase.throwingDice())
		{
			if(this.turn)
			 	if(this.Token.jail)
			 	{
			 		console.log("Estas en la carcel")
			 		//this.goOutingJail();
			 		this.Token.info = "Estas en la carcel"
			 	}
			 	else
					this.Game.throwingDiceTest(this.Token, numberPosition)
			else 
			{
				console.log("No es tu turno")
				this.Token.info = "No es tu turno"
			}
				
		}
	}
	
	this.passTurn = function()
	{
		this.Game.changedTurn();
	}
	
	/*
	this.startGame = function()
	{
		//this.turn = true;
		this.Game.startGame();
	}*/

	this.buy = function()
	{
		return this.Game.buy(this.Token);
	}
	this.build = function(colorGroup)
	{
		this.Game.build(this.Token, colorGroup);
	}
	this.goOutJail = function(optionChoosen)
	{
		this.Game.goOutJail(this.Token, optionChoosen)
	}
}

module.exports.User = User;