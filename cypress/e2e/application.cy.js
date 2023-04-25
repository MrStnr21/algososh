describe("application is available", () => {
  //запуск приложения
  it("should be available on localhost:3000", () => {
    cy.visit("http://localhost:3000");
  });
});
