describe("Monopoly", function(){

	var ficha;

	beforeEach(function(){

		ficha = new Token();
		ficha.addTokens();
		

	});

	describe("La ficha", function(){


		it("deberá de existir 6 fichas", function(){
			expect(ficha.tokens.length).toBe(6);
		});

		it("deberá de existir una ficha roja", function(){
			expect(ficha.tokens[0].color).toBe("red");
		});

		it("deberá de existir una ficha naranja", function(){
			expect(ficha.tokens[1].color).toBe("orange");
		});

		it("deberá de existir una ficha azul", function(){
			expect(ficha.tokens[2].color).toBe("blue");
		});

		it("deberá de existir una ficha verde", function(){
			expect(ficha.tokens[3].color).toBe("green");
		});

		it("deberá de existir una ficha amarillo", function(){
			expect(ficha.tokens[4].color).toBe("yellow");
		});

		it("deberá de existir una ficha rosa", function(){
			expect(ficha.tokens[5].color).toBe("pink");
		});

	})

})