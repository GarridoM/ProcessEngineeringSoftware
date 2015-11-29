describe("Monopoly", function(){

	var board;
	var box;
	var boxes;
	var times;

	var diceOne;
	var diceTwo;
	var dice;

	var game;
	var usr1;
	var usr2;

	beforeEach(function(){

		diceOne = new Dice();
		diceTwo = new Dice();

		diceOne = diceOne.throwingDice();
		diceTwo = diceTwo.throwingDice();

		dice = diceOne + diceTwo;

		numberBoxes = 40;		
		board = new Board(numberBoxes);
		board.configureBoard();
		times = 0;
		game = new Game(diceOne, 2);
		usr1 = new User("Lola");
		usr2 = new User("Luis");


	});

	describe("El tablero", function(){

		it("deberá de tener 40 casillas", function(){
			expect(board.numberBoxes).toBe(40);
		});

		it("deberá de crearse el tablero con el nombre Board", function(){
			expect(board.name).toBe("Board");
		});

		it("deberá de tener una casilla de inicio", function(){
			expect(board.boxes[0].theme.name).toBe("Exit");
		});
		
		it("debera de tener 22 casillas que sean calle", function(){
			for(i = 0; i < numberBoxes; i++)
			{
				if(board.boxes[i].theme.type == "Street")
				{
					times++
				}

			}
			expect(times).toBe(22);
		});

		it("deberá de tener 4 estaciones", function(){

			for(i = 0; i < numberBoxes; i++)
			{
				if(board.boxes[i].theme.type == "Station")
				{
					times++
				}
			}
			expect(times).toBe(4)

		})

		it("deberá de tener 3 cajas de comunidad", function(){

			for(i = 0; i < numberBoxes; i++)
			{
				if(board.boxes[i].theme.name == "Community Chest")
				{
					times++
				}
			}
			expect(times).toBe(3)

		})

		it("deberá de tener 3 suertes", function(){

			for(i = 0; i < numberBoxes; i++)
			{
				if(board.boxes[i].theme.name == "Chance")
				{
					times++
				}
			}
			expect(times).toBe(3)

		})


		it("deberá de tener 2 servicios publicos", function(){

			for(i = 0; i < numberBoxes; i++)
			{
				if(board.boxes[i].theme.type == "public Services")
				{
					times++
				}
			}
			expect(times).toBe(2)

		})


		it("deberá de tener 1 Carcel", function(){

			for(i = 0; i < numberBoxes; i++)
			{
				if(board.boxes[i].theme.name == "Jail")
				{
					times++
				}
			}
			expect(times).toBe(1)

		})


		it("deberá de tener 2 de Impuestos", function(){

			for(i = 0; i < numberBoxes; i++)
			{
				if(board.boxes[i].theme.type == "Tax")
				{
					times++
				}
			}
			expect(times).toBe(2)

		})


		it("deberá de tener 1 free parking", function(){

			for(i = 0; i < numberBoxes; i++)
			{
				if(board.boxes[i].theme.name == "free Parking")
				{
					times++
				}
			}
			expect(times).toBe(1)

		})

		it("deberá de tener 1 Ir a la Carcel", function(){

			for(i = 0; i < numberBoxes; i++)
			{
				if(board.boxes[i].theme.name == "Go to Jail")
				{
					times++
				}
			}
			expect(times).toBe(1)

		})

		it("la casilla 1 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[1].theme.price).toBe(60);
			expect(board.boxes[1].theme.name).toBe("Mediterranean Avenue");
			expect(board.boxes[1].theme.color).toBe("maroon");
		})


		it("la casilla 2 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[2].theme.name).toBe("Community Chest");
		})

		it("la casilla 3 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[3].theme.price).toBe(60);
			expect(board.boxes[3].theme.name).toBe("Baltic Avenue");
			expect(board.boxes[3].theme.color).toBe("maroon");
		})

		it("la casilla 6 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[6].theme.price).toBe(100);
			expect(board.boxes[6].theme.name).toBe("Oriental Avenue");
			expect(board.boxes[6].theme.color).toBe("purple");
		})

		it("la casilla 8 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[8].theme.price).toBe(100);
			expect(board.boxes[8].theme.name).toBe("Vermont Avenue");
			expect(board.boxes[8].theme.color).toBe("purple");
		})

		it("la casilla 9 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[9].theme.price).toBe(120);
			expect(board.boxes[9].theme.name).toBe("Connecticut Avenue");
			expect(board.boxes[9].theme.color).toBe("purple");
		})


		it("la casilla 11 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[11].theme.price).toBe(140);
			expect(board.boxes[11].theme.name).toBe("St. Charles Place");
			expect(board.boxes[11].theme.color).toBe("pink");
		})


		it("la casilla 13 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[13].theme.price).toBe(140);
			expect(board.boxes[13].theme.name).toBe("States Avenue");
			expect(board.boxes[13].theme.color).toBe("pink");
		})


		it("la casilla 14 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[14].theme.price).toBe(160);
			expect(board.boxes[14].theme.name).toBe("Virginia Avenue");
			expect(board.boxes[14].theme.color).toBe("pink");
		})


		it("la casilla 16 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[16].theme.price).toBe(180);
			expect(board.boxes[16].theme.name).toBe("St. James Place Avenue");
			expect(board.boxes[16].theme.color).toBe("orange");
		})

		it("la casilla 17 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[17].theme.name).toBe("Community Chest");
		})

		it("la casilla 18 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[18].theme.price).toBe(180);
			expect(board.boxes[18].theme.name).toBe("Tennessee Avenue");
			expect(board.boxes[18].theme.color).toBe("orange");
		})


		it("la casilla 19 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[19].theme.price).toBe(200);
			expect(board.boxes[19].theme.name).toBe("New York Avenue");
			expect(board.boxes[19].theme.color).toBe("orange");
		})


		it("la casilla 21 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[21].theme.price).toBe(220);
			expect(board.boxes[21].theme.name).toBe("Kentucky Avenue");
			expect(board.boxes[21].theme.color).toBe("red");
		})


		it("la casilla 23 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[23].theme.price).toBe(220);
			expect(board.boxes[23].theme.name).toBe("Indiana Avenue");
			expect(board.boxes[23].theme.color).toBe("red");
		})


		it("la casilla 24 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[24].theme.price).toBe(240);
			expect(board.boxes[24].theme.name).toBe("Illinois Avenue");
			expect(board.boxes[24].theme.color).toBe("red");
		})



		it("la casilla 26 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[26].theme.price).toBe(260);
			expect(board.boxes[26].theme.name).toBe("Atlantic Avenue");
			expect(board.boxes[26].theme.color).toBe("yellow");
		})


		it("la casilla 27 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[27].theme.price).toBe(260);
			expect(board.boxes[27].theme.name).toBe("Ventnor Avenue");
			expect(board.boxes[27].theme.color).toBe("yellow");
		})


		it("la casilla 29 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[29].theme.price).toBe(860);
			expect(board.boxes[29].theme.name).toBe("Marvin Gardens");
			expect(board.boxes[29].theme.color).toBe("yellow");
		})



		it("la casilla 31 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[31].theme.price).toBe(300);
			expect(board.boxes[31].theme.name).toBe("Pacific Avenue");
			expect(board.boxes[31].theme.color).toBe("green");
		})


		it("la casilla 32 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[32].theme.price).toBe(300);
			expect(board.boxes[32].theme.name).toBe("North Carolina Avenue");
			expect(board.boxes[32].theme.color).toBe("green");
		})

		it("la casilla 33 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[33].theme.name).toBe("Community Chest");
		})

		it("la casilla 34 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[34].theme.price).toBe(320);
			expect(board.boxes[34].theme.name).toBe("Pennsylvania Avenue");
			expect(board.boxes[34].theme.color).toBe("green");
		})


		it("la casilla 37 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[37].theme.price).toBe(350);
			expect(board.boxes[37].theme.name).toBe("Park Place");
			expect(board.boxes[37].theme.color).toBe("blue");
		})


		it("la casilla 39 debera de tener todos los atributos correctos", function(){
			expect(board.boxes[39].theme.price).toBe(400);
			expect(board.boxes[39].theme.name).toBe("Boardwalk");
			expect(board.boxes[39].theme.color).toBe("blue");
		})


	});

	describe("El dado", function(){

		describe("deberá de ser un numero entre 2 y 12, comprobando 100 veces", function(){

			for(i=0; i<100; i++){

				it("correcto " + i, function(){
					expect(dice).toBeGreaterThan(1);
					expect(dice).toBeLessThan(13);
				})
			}

		})

	});

	describe("La partida", function(){
		it("deberá de tener una fase Inicial", function(){
			expect(game.phase.name).toBe("Initial")
		})

		it("deberá de tener una fase Juego", function(){
			game.addUser(usr1);
			game.addUser(usr2);
			expect(game.phase.name).toBe("Playing...")			
		})

		it("debera de tener una fase Fin", function(){
			game.addUser(usr1);
			game.addUser(usr2);
			//usr1.throwingDice();
			usr1.throwingDiceTest(1);
			usr1.Token.setMoney(20000)
			usr1.passTurn();
			//usr2.throwingDice();
			usr2.throwingDiceTest(1);
			usr2.passTurn();			
			expect(game.phase.name).toBe("End Game")				
		})

		it("debera de tener una ganador", function(){
			game.addUser(usr1);
			game.addUser(usr2);
			//usr1.throwingDice();
			usr1.throwingDiceTest(1);
			usr1.Token.setMoney(20000)
			usr1.passTurn();
			//usr2.throwingDice();
			usr2.throwingDiceTest(1);
			usr2.passTurn();			
			expect(game.winner).toBe(usr1)				
		})
		it("deberá de tener un usuario llamado Lola", function(){
			game.addUser(usr1);
			game.addUser(usr2);			
			expect(game.players[0].name).toBe("Lola")
		})

		it("deberá de tener un usuario llamado Luis", function(){
			game.addUser(usr1);
			game.addUser(usr2);
			expect(game.players[1].name).toBe("Luis")
		})


	})

	describe("Calles", function(){

		it("el usuario podra comprar una calle", function(){
			game.addUser(usr1);
			game.addUser(usr2);
			usr1.throwingDiceTest(8);
			usr1.buy();
			expect(usr1.Token.properties[0].name).toBe("Vermont Avenue")
			//expect(usr1.Token.money).toBe(1400)
		})

		it("el usuario deberá de pagar la calle comprada", function(){
			game.addUser(usr1);
			game.addUser(usr2);
			usr1.throwingDiceTest(8);
			usr1.buy();
			expect(usr1.Token.money).toBe(1400)
		})

		it("el usuario deberá de pagar el alquiler al caer en una calle que no es suya", function(){
			game.addUser(usr1);
			game.addUser(usr2);
			usr1.throwingDiceTest(8);
			usr1.buy();
			usr1.passTurn();
			usr2.throwingDiceTest(8);
			expect(usr2.Token.money).toBe(1475);

		})

		it("el usuario no podrá construir si no tiene todas las calles de un grupo", function(){
			game.addUser(usr1);
			game.addUser(usr2);
			usr1.throwingDiceTest(6);
			usr1.buy();
			usr1.passTurn();

			usr2.throwingDiceTest(3);
			usr2.passTurn();

			usr1.throwingDiceTest(2);
			usr1.buy();
			usr1.passTurn();

			usr2.throwingDiceTest(3);
			usr2.passTurn();
			
			usr1.throwingDiceTest(1);
			usr1.buy();
			

		})

	})

	describe("La ficha", function(){
		it("se mueve por el board", function(){
			game.addUser(usr1);
			game.addUser(usr2);
			usr1.throwingDiceTest(8);
			expect(usr1.Token.position).toBe(8);
		})
	})

	describe("El usuario", function(){
		it("va a la carcel si cae en Ir a la carcel", function(){
			game.addUser(usr1);
			game.addUser(usr2);
			usr1.throwingDiceTest(30);
			expect(usr1.Token.position).toBe(10);
		})
	})

	describe("El usuario", function(){
		it("")
	})
})