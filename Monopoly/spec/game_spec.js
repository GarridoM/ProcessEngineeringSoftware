describe("Juego/Partida", function(){

	var game;
	var board;

	beforeEach(function(){

		game = new Game();
		game.createGame();

	});

	describe("Debe de existir una partida", function(){

		it("deberá de existir una partida", function(){
			expect(game.name).toBe("New Game Create");
		});

		it("deberá de tener un tablero", function(){
			expect(game.iniGame()).toBe("Board");
		})

	});



})