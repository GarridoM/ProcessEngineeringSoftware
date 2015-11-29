function Free()
{
	this.moveToken = function(token, property)
	{
		console.log("Esta Libre");
	}
	this.buyProper = function(board, token, property)
	{
		console.log("Estas comprando")
		property.state = new Rent();
		property.state.buyProper(board, token, property);
	}
}


function Rent()
{
	//this.colors=[{color: "maroon", maxNumber:2}, {color: "purple", maxNumber:3}, {color: "pink", maxNumber:3}, {color: "orange", maxNumber:3}, {color: "red", maxNumber:3}, {color: "yellow", maxNumber:3}, , {color: "green", maxNumber:3}, {color: "blue", maxNumber:2}]
	this.moveToken = function(token, property)
	{
		console.log("Ya esta comprada");
	}

	this.buyProper = function(board, token, property)
	{
		console.log("Gestionando compra...")
		property.proper = token;
		token.properties[token.properties.length] = property;
		token.money = token.money - property.price;	
		console.log("Has comprado!! Ahora tienes un saldo de " + token.money);
		this.checkGroup(board, token, property);
	}
	this.payRenting = function(token, property)
	{
		console.log("Cobrando alquiler")
		token.money = token.money - (property.price * 0.25 + property.numberHouses * (property.price * 0.25));
		console.log("Has pagado el alquiler, ahora tu saldo es " + token.money)
	}

	this.checkGroup = function(board, token, property)
	{
		
		//var colors = [{color: 'maroon', maxNumber:2}, {color: 'purple', maxNumber:3}, {color: 'pink', maxNumber:3}, {color: 'orange', maxNumber:3}, {color: 'red', maxNumber:3}, {color: 'yellow', maxNumber:3}, , {color: 'green', maxNumber:3}, {color: 'blue', maxNumber:2}]
		var propertiesOK=[];
		var maxNumber=0;

		for(i=0; i<token.properties.length; i++)
		{
			if(token.properties[i].color == property.color)
			{
				propertiesOK[propertiesOK.length] = token.properties[i];
			}
		}
		//Sacar el numero de ese color que hay en el tablero
		for(i=0; i<board.boxes.length; i++)
		{
			if(board.boxes[i].theme.type == "Street")
				if(board.boxes[i].color == property.color)
					maxNumber = maxNumber + 1;
		}

		if(propertiesOK.length == maxNumber)
		{
			for(i=0; i<propertiesOK.length; i++)
			{
				propertiesOK[i].state = new Group();
			}
		}
	}
}
function Group()
{
	this.moveToken = function(token, property)
	{
		console.log("Ya esta comprada");
	}

	this.buildHouse = function (token, nameStreet)
	{
		var foundColor;
		var groupColor = [];
		var buildAble = false;

		if(property.numberHouses == 4 && property.hotel == false)
		{
			this.buildHotel(token, nameStreet);
		}
		else
		{

			for(i=0; i< token.properties.length; i++)
			{
				if(token.properties[i].name == nameStreet)
				{
					foundColor=token.properties[i].color;
					break;
				}
			}

			for(i=0; i<token.properties.length; i++)
			{
				if(token.properties[i].color == foundColor)
					groupColor[groupColor.length] = token.properties[i];
			}

			for(i=0; i<groupColor.length-1; i++)
			{
				if(groupColor[i].numberHouses == groupColor[i+1].numberHouses)
					buildAble = true;
			}
			
			if(buildAble)
			{
				property.numberHouses = property.numberHouses + 1;
				token.money = token.money - 150;
			}
		}

			
	}

	this.buildHotel = function(token, nameStreet)
	{
		console.log("Construyendo hotel porque ya tienes las 4 casas en esa calle")
		for(i=0; i< token.properties.length; i++)
		{
			if(token.properties[i].name == nameStreet)
			{
				property=token.properties[i];
				break;
			}
		}	
		property.hotel = true;
		token.money = token.money - 150;
	}

	this.payRenting = function(token, property)
	{
		console.log("Cobrando alquiler")
		token.money = token.money - 300;
		console.log("Has pagado el alquiler, ahora tu saldo es " + token.money)
	}
}

/*function Mortgaged()
{

}*/


module.exports.Free = Free;
module.exports.Rent = Rent;
module.exports.Group = Group;
