function Token (color)
{
	this.color = color;
	this.assigned = false;
	this.position = 0;
	this.money = 1500;
	this.properties = [];
	this.stations = [];
	this.publicServices = [];
	this.jail = false;
	this.cardGoOutJail = false;
	this.timesTriedGoOut = 0;

	this.setPosition = function(position){
		this.position = position;
	}

	this.setMoney = function(money){
		this.money = this.money + money;
	}

}