function Cards()
{
	this.cardsGame=[];
	this.reading = 0;

	this.confidureCards = function()
	{
		this.cardsGame.push(new GoHead("Go ahead your token 5 positions", 5));
		this.cardsGame.push(new Prize("you receive 400 pelotis from the Bank", 400));
		this.cardsGame.push(new GoBack("Go back your token 1 positions", 1));
		this.cardsGame.push(new GoBack("Go back your token 2 positions", 2));
		this.cardsGame.push(new cardGoOutJail("Go out from the Jail"))
		this.cardsGame.push(new Penalty("you lose 200 pelotis", 200))
		this.cardsGame.push(new Prize("La banca te da 20 pelotis", 20));
		this.cardsGame.push(new GoHead("Go ahead your token 2 positions", 2));
		this.cardsGame.push(new Penalty("you lose 200 pelotis", 50))
		this.cardsGame.push(new Penalty("you lose 200 pelotis", 400))
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
		token.info = token.info + "<strong> You have get: </strong>" + this.msg 
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
		token.info = token.info + "<strong> You have get: </strong>" + this.msg
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
		token.info = token.info + "<strong> You have get: </strong>" + this.msg 
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
		token.info = token.info + "<strong> You have get: </strong>" + this.msg
		token.money = token.money - this.mount;
	}
}

function cardGoOutJail(msg)
{
	this.msg= msg;
	this.execute = function(token)
	{
		console.log(this.msg)
		token.info = token.info + "<strong> You have get: </strong>" + this.msg
		token.cardGoOutJail = true;
	}
}

module.exports.Cards = Cards;
module.exports.GoHead = GoHead;
module.exports.GoBack = GoBack;
module.exports.Penalty = Penalty;
module.exports.Prize = Prize;
module.exports.cardGoOutJail = cardGoOutJail;