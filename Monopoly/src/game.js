/**
This is Game, it isnt the system, each that I want to play, ie,
I create a game for a group of maximun 6 people.
*/

function Game(dice)
{
	this.name = "New Game Create"
	this.tokens = [];
	this.players = [];
	this.optionColor = ["red","orange", "blue", "green", "yellow", "pink"];
	this.board = undefined

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
		
	};
	this.iniGame = function()
	{
		this.iniBoard();
		this.iniTokens();
	};

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
		this.players[this.players.length] = user;
	}

	this.throwingDice = function(token)
	{
		token.position = token.position + dice.throwingDice() +  dice.throwingDice();
		token.setPosition(token.position)
		this.board.moveToken(token)
	}
}

function Token (color)
{
	this.color = color;
	this.assigned = false;
	this.position = 0;
	this.money = 1500;

	this.setPosition = function(position){
		this.position = position;
	}

	/*
	this.moveToken = function(){
		var diceOne = new Dice();
		var diceTwo = new Dice();

		diceOne = diceOne.throwingDice();
		diceTwo = diceTwo.throwingDice();

		position = diceOne + diceTwo;
	}*/
}

function User(name, game){

	this.name = name;
	this.userName = undefined;
	this.Password = undefined;
	this.Token = undefined;
	this.Game = undefined;

	this.askToken = function(game)
	{
		this.Game = game;
		this.Token = game.lookForTokenFree()
	}

	this.throwingDice = function()
	{
		//I write dependig of game just in case that the user doesnt have any game, ie, it isnt playing.
		this.Game.throwingDice(this.Token)
	}
	
}