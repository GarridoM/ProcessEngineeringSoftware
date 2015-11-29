function Game(dice, numPlayers)
{
	this.name = "New Game Create"
	this.tokens = [];
	this.players = [];
	this.optionColor = ["red","orange", "blue", "green", "yellow", "pink"];
	this.board = undefined;
	this.turnGame = 0;
	this.phase = undefined;
	this.minNumPlayers = numPlayers;
	this.winner = undefined;
	this.winners = [];
	this.dice = dice;

	this.iniBoard = function()
	{
		this.board = new Board(40);
		this.board.configureBoard();
	};

	this.iniTokens = function()
	{
		for(i=0; i < this.optionColor.length; i++)
		{
			this.tokens[i] = new Token (this.optionColor[i]);

		}		
	}
	
	this.iniGame = function()
	{
		//this.iniBoard();
		//this.iniTokens();
		this.phase = new InitialPhase(this);
	};

	this.askToken = function ()
	{
		return this.lookForTokenFree();
	}

	this.lookForTokenFree = function()
	{
						
		for(i=0; i< this.tokens.length; i++)
		{

			if(this.tokens[i].assigned == false)
			{
				this.tokens[i].assigned = true;
				return this.tokens[i];
			}
		}

		console.log("ya no quedan fichas libres");
	}

	this.addUser = function(user)
	{
		//It's the same, I think It's "more" sofisticated -> this.players.push(user);
		this.phase.addUser(user);

	}
	this.addingUser = function(user)
	{
		this.players[this.players.length] = user;
		user.askToken(this)
	}

	this.throwingDice = function(token)
	{
		var diceOne = this.dice.throwingDice();
		var diceTwo = this.dice.throwingDice();
		console.log("You get " + diceOne + " & " + diceTwo);
		token.position = token.position + diceOne +  diceTwo;
		if(token.position>39)
		{
			token.position = token.position - 39;
			//token.setMoney(200);
			this.board.actionToDoNotRealPosition(token, 0);
		}
		token.setPosition(token.position)
		this.board.moveToken(this, token)

		// Para evitar que el usuario pueda lanzar dos veces si no ha conseguido
		// dobles -> Quitarle el turno :)
		if(diceOne != diceTwo){
			this.players[this.turnGame].turn = false;
		}
		
	}

	this.throwingDiceTest = function(token, position)
	{
		token.position = token.position + position;
		if(token.position>39){
			token.position = token.position - 39;
			//token.setMoney(200);
			this.board.actionToDoNotRealPosition(token, 0);
		}
		token.setPosition(token.position);
		this.board.moveToken(this, token);
		//Al añadir esta frase le obligamos a tener que pasar
		this.players[this.turnGame].turn = false;
	}
	this.changedTurn = function()
	{
		this.players[this.turnGame].turn = false;
		this.turnGame = this.turnGame + 1;
		
		if(this.turnGame > this.players.length-1)
		{
			console.log("Estoy dentro")
			this.turnGame=0;
			this.players[this.turnGame].turn = true;
			for(i=0; i<this.players.length; i++)
			{
				if(this.players[i].Token.money > 20000)
				{
					this.winners[this.winners.length] = this.players[i]
				}
				
			}

			if(this.winners.length > 0)
			{
				//this.winner = _.max(this.winners, function(win){ return win.money}); //No me saca el mayor
				this.winner = this.winners[0];
				for(i=0; i< this.winners.length; i++)
				{
					if(this.winners[i].money> this.winner.money)
						this.winner = this.winners[i];
				}
				this.phase = new EndPhase(this);
			}
				
		}
		else
		{
			this.players[this.turnGame].turn = true;
		}
			
	}
	this.startGame = function()
	{
		this.players[0].turn = true;
	}

	this.buy = function(token)
	{
		this.board.buy(token);
	}

	this.build = function(token, nameStreet)
	{
		this.board.build(token, nameStreet)
	}

	this.goOutJail = function(token, optionChoosen)
	{
		this.board.goOutJail(this, token, optionChoosen);
	}
	this.iniGame();
}

