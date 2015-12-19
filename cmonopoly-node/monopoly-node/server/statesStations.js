function FreeStation()
{
	this.moveToken = function(token, property)
	{
		console.log("Esta Libre");
		token.info = token.info + "<p> It is Free"
	}
	this.buyProper = function(token, property)
	{
		property.proper = token;
		token.stations[token.stations.length] = property;
		token.money = token.money - property.price;	
		console.log("Has comprado!! Ahora tienes un saldo de " + token.money);		
		token.info = "You have bought!! Now, you have " + token.money;
		property.state = new RentStation();
		//property.state.buyProper(token, property);
		return true;
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
		token.info = "Now, you have " + token.money;	
	}
}

module.exports.FreeStation = FreeStation;
module.exports.RentStation = RentStation;