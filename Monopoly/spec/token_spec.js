describe("Monopoly", function(){

	var dice;
	var game;
	var user;
	var board;
	var numberBoxes;

	beforeEach(function(){

		dice = new Dice();
		game = new Game(dice);
		game.iniGame();
		numberBoxes = 40;		
		board = new Board(numberBoxes);
		board.configureBoard();
		user1 = new User("Pepito");

	});

	describe("La ficha", function(){


		it("deberá de existir 6 fichas", function(){
			expect(game.tokens.length).toBe(6);
		});

		it("deberá de existir una ficha roja", function(){
			expect(game.tokens[0].color).toBe("red");
		});

		it("deberá de existir una ficha naranja", function(){
			expect(game.tokens[1].color).toBe("orange");
		});

		it("deberá de existir una ficha azul", function(){
			expect(game.tokens[2].color).toBe("blue");
		});

		it("deberá de existir una ficha verde", function(){
			expect(game.tokens[3].color).toBe("green");
		});

		it("deberá de existir una ficha amarillo", function(){
			expect(game.tokens[4].color).toBe("yellow");
		});

		it("deberá de existir una ficha rosa", function(){
			expect(game.tokens[5].color).toBe("pink");
		});

		it("debera moverse por el tablero", function(){
			game.addUser(user1);
			user1.askToken(game);
			user1.throwingDiceTest(4);
			expect(user1.token.position).toBe(4);
		})

	})

})