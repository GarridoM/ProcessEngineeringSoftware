function FreeStation()
{
	this.moveToken = function(token, property)
	{
		console.log("Esta Libre");
		token.info = token.info + " It is Free"
	}
	this.buyProper = function(token, property)
	{
		if(property.price > token.money)
		{
			token.info = "You do NOT have enough money"
			return false;
		}
		else
		{
			property.proper = token;
			//token.stations[token.stations.length] = property;
			token.stationsProperties.push(property);
			token.money = token.money - property.price;	
			console.log("Has comprado!! Ahora tienes un saldo de " + token.money);		
			token.info = " You have bought!! Now, you have " + token.money;
			property.state = new RentStation();
			//property.state.buyProper(token, property);
			return true;			
		}

	}

	this.mortgage = function(token, property)
	{
		token.info = " This station has NOT got any owner."
	}
}


function RentStation()
{
	this.moveToken = function(token, property)
	{
		console.log("Ya esta comprada");
		token.info = property.name + " It is not Free";
	}

	this.buyProper = function(token, property)
	{
		/*console.log("Gestionando compra...")
		property.proper = token;
		token.stations[token.stations.length] = property;
		token.money = token.money - property.price;	
		console.log("Has comprado!! Ahora tienes un saldo de " + token.money);		
		token.info = "You have bought!! Now, you have " + token.money;*/
		return false;
	}

	this.payRenting = function(token, property)
	{
		console.log("Cobrando alquiler de las estaciones")
		token.money = token.money - (token.stations.length * 25);
		console.log("Tu saldo ahora es " + token.money);	
		token.info = " Now, you have " + token.money;	
	}

	this.mortgage = function(token, property)
	{
		if(property.stateMortgage == false)
		{
			property.stateMortgage = true;
			token.info = " You receibe " + property.price*1.25;
			token.money = token.money + property.price*1.25;
			token.mortagedStations[token.mortagedStations.length] = property;
			return true;
		}
		else
		{
			token.info = " It is mortgaged"
			return false;
		}
	}
}

module.exports.FreeStation = FreeStation;
module.exports.RentStation = RentStation;