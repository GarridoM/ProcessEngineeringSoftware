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
	this.info = undefined;

	this.setPosition = function(position){
		this.position = position;
	}

	this.setMoney = function(money){
		this.money = this.money + money;
	}

	this.getProperties = function(propertyName)
	{
		return _.find(this.properties, function(each){
			if(each.name == name)
				return each.numberHouses;
		})
	}

	this.getPropertiesInGroup = function()
	{
		var propersGroup = [];
		propersGroup = _.find(this.properties, function(each){
			if((each.state)instanceof(Group))
				return this.properties.color;
		})
		return propersGroup;
	}

}

module.exports.Token = Token;