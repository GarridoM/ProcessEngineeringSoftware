function Dice(){

	
	this.throwingDice = function()
	{
		return Math.round(Math.random()*5+1);
	}

}

module.exports.Dice = Dice;