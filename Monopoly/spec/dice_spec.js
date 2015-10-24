describe("Dado", function(){

	var diceOne;
	var diceTwo;
	var dice;

	beforeEach(function(){

		diceOne = new Dice();
		diceTwo = new Dice();

		diceOne = diceOne.throwingDice();
		diceTwo = diceTwo.throwingDice();

		dice = diceOne + diceTwo;

	});

	describe("El tablero", function(){

		for(i=0; i<1000; i++){

			it("deberá de ser un numero entre 2 y 12", function(){
				expect(dice).toBeGreaterThan(1);
				expect(dice).toBeLessThan(13);
			})
		}

	});



})