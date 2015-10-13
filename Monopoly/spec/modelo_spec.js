describe("Monopoly", function(){

	var board;
	var box;
	var boxes;
	var Game;

	beforeEach(function(){

		numberBoxes = 40;
		boxes = [];
		board = new Board(numberBoxes);
		board.startBoard();
		board.configureBoard();

	});

	describe("El tablero", function(){

		it("deberá de tener 40 casillas", function(){
			expect(board.numberBoxes).toBe(40);
		});

		it("deberá de crearse el tablero con el nombre Board", function(){
			expect(board.name).toBe("Board");
		});

		it("deberá de tener una casilla de inicio", function(){
			expect(boxes[0].theme).toBe("Exist");
		});
		

	});



})