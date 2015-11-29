function FreeStation()
{
	this.moveToken = function(token, property)
	{
		console.log("Esta Libre");
	}
	this.buyProper = function(token, property)
	{
		console.log("Estas comprando")
		property.state = new RentStation();
		property.state.buyProper(token, property);
	}
}


function RentStation()
{
	this.moveToken = function(token, property)
	{
		console.log("Ya esta comprada");
	}

	this.buyProper = function(token, property)
	{
		console.log("Gestionando compra...")
		property.proper = token;
		token.stations[token.stations.length] = property;
		token.money = token.money - property.price;	
		console.log("Has comprado!! Ahora tienes un saldo de " + token.money);
	}
	this.payRenting = function(token, property)
	{
		console.log("Cobrando alquiler de las estaciones")
		token.money = token.money - (token.stations.length * 25);
		console.log("Tu saldo ahora es " + token.money);		
	}
}

module.exports.FreeStation = FreeStation;
module.exports.RentStation = RentStation;