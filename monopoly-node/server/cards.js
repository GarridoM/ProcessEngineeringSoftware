function Cards()
{
	this.cardsGame=[];
	this.reading = 0;

	this.confidureCards = function()
	{
		this.cardsGame.push(new GoHead("Avanza la ficha 5 posiciones", 5));
		this.cardsGame.push(new Prize("La banca te da 400 pelotis", 400));
		this.cardsGame.push(new GoBack("Retrocede la ficha 1 posicion", 1));
		this.cardsGame.push(new GoBack("Retrocede la ficha 2 posiciones", 2));
		this.cardsGame.push(new cardGoOutJail("Has ganado la carta para salir de la carcel"))
		this.cardsGame.push(new Penalty("Se te quitaran 200 pelotis", 200))
		this.cardsGame.push(new Prize("La banca te da 20 pelotis", 20));
		this.cardsGame.push(new GoHead("Avanza la ficha 2 posiciones", 2));
		this.cardsGame.push(new Penalty("Se te quitaran 200 pelotis", 50))
		this.cardsGame.push(new Penalty("Se te quitaran 200 pelotis", 400))
	}
	this.readFollow = function(token)
	{
		this.cardsGame[this.reading].execute(token);
		this.reading = this.reading + 1;
	}
	this.confidureCards();
}

function GoHead(msg, mount)
{
	this.msg = msg;
	this.mount = mount

	this.execute = function(token)
	{
		console.log(this.msg)
		token.position = token.position + this.mount;
	}
}

function GoBack(msg, mount)
{
	this.msg = msg;
	this.mount = mount;

	this.execute = function(token)
	{
		console.log(this.msg)
		token.position = token.position - this.mount;
	}
}
function Penalty(msg, mount)
{
	this.msg = msg;
	this.mount = mount;

	this.execute=function(token)
	{
		console.log(this.msg)
		token.money = token.money - this.mount;
	}
}

function Prize(msg, mount)
{
	this.msg = msg;
	this.mount = mount;

	this.execute = function(token)
	{
		console.log(this.msg)
		token.money = token.money - this.mount;
	}
}

function cardGoOutJail(msg)
{
	this.msg= msg;
	this.execute = function(token)
	{
		console.log(this.msg)
		token.cardGoOutJail = true;
	}
}

module.exports.Cards = Cards;
module.exports.GoHead = GoHead;
module.exports.GoBack = GoBack;
module.exports.Penalty = Penalty;
module.exports.Prize = Prize;
module.exports.cardGoOutJail = cardGoOutJail;