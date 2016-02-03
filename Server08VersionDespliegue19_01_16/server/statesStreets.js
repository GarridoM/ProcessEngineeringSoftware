function Free()
{
	this.moveToken = function(token, property)
	{
		console.log("Esta Libre");
		token.info = token.info + "<p> It is Free"
	}
	this.buyProper = function(board, token, property)
	{	
		property.proper = token;
		token.properties[token.properties.length] = property;
		token.money = token.money - property.price;	
		console.log("Has comprado!! Ahora tienes un saldo de " + token.money);
		token.info = "You have bought!! Now, you have " + token.money;
		property.state = new Rent();
		property.state.checkGroup(board, token, property);
		
		//property.state.buyProper(board, token, property);
		return true;
	}
}


function Rent()
{
	//this.colors=[{color: "maroon", maxNumber:2}, {color: "purple", maxNumber:3}, {color: "pink", maxNumber:3}, {color: "orange", maxNumber:3}, {color: "red", maxNumber:3}, {color: "yellow", maxNumber:3}, , {color: "green", maxNumber:3}, {color: "blue", maxNumber:2}]
	this.moveToken = function(token, property)
	{
		console.log("Ya esta comprada");
		token.info = property.name + " It is not Free";
	}

	this.buyProper = function(board, token, property)
	{
		/*console.log("Gestionando compra...")
		property.proper = token;
		token.properties[token.properties.length] = property;
		token.money = token.money - property.price;	
		console.log("Has comprado!! Ahora tienes un saldo de " + token.money);
		token.info = "You have bought!! Now, you have " + token.money;
		this.checkGroup(board, token, property);*/
		token.info = "You cannot buy this proper"
		return false;
	}
	this.payRenting = function(token, property)
	{
		console.log("Cobrando alquiler")
		token.info = "Cobrando alquiler"
		token.money = token.money - (property.price * 0.25 + property.numberHouses * (property.price * 0.25));
		console.log("Has pagado el alquiler, ahora tu saldo es " + token.money)
		token.info = token.info + " You have pay the rent, now you have " + token.money;
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
		token.info = "Ya esta comprada";
	}

	this.buildHouse = function (token, colorGroup)
	{
		var foundColor;
		var groupColor = [];
		var buildAble = false;

		if(property.numberHouses == 4) //&& property.hotel == false)
		{
			if(property.hotel == false)
				this.buildHotel(token, colorGroup);
			else
			{
				token.info = "You have all kind of buildings"
				return false;
			}
		}
		else
		{

			/*for(i=0; i< token.properties.length; i++)
			{
				if(token.properties[i].color == colorGroup)
				{
					foundColor=token.properties[i].color;
					break;
				}
			}*/

			for(i=0; i<token.properties.length; i++)
			{
				if(token.properties[i].color == colorGroup)
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
				token.info = "Congratulations! You build another house"
				return true;
			}
			else
			{
				token.info = "You cannot build"
				return false;
			}
				
		}

			
	}

	this.buildHotel = function(token, nameStreet)
	{
		console.log("Construyendo hotel porque ya tienes las 4 casas en esa calle")
		//token.info = "Construyendo hotel porque ya tienes las 4 casas en esa calle";
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
		token.info = "Congratulations!! You build a hotel!"
	}

	this.payRenting = function(token, property)
	{
		console.log("Cobrando alquiler")
		token.info = "Cobrando alquiler"
		token.money = token.money - 300;
		console.log("Has pagado el alquiler, ahora tu saldo es " + token.money)
		token.info = token.info + " Has pagado el alquiler, ahora tu saldo es " + token.money
	}
}

/*function Mortgaged()
{

}*/


module.exports.Free = Free;
module.exports.Rent = Rent;
module.exports.Group = Group;
