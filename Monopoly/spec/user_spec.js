describe("Monopoly", function(){

	var usuario;

	beforeEach(function(){

		usuario = new User("Pepito", "nick1", 123);
		

	});

	describe("El usuario", function(){

		it("deberá de tener nombre", function(){
			expect(usuario.name).toBe("Pepito");
		});

		it("deberá de tener nombre usuario", function(){
			expect(usuario.userName).toBe("nick1");
		});

		it("deberá de tener una contraseña", function(){
			expect(usuario.Password).toBe(123);
		});
		
		it("en un principio no tendra ficha", function(){
			expect(usuario.colorToken).toBe(undefined)
		});

		it("podra tener ficha asignada", function(){

			usuario.assignToken();		
			expect(usuario.colorToken).toBe("red")

		})
	})

})