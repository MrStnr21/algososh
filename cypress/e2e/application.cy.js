describe("application starts successfully", () => {
  //запуск приложения
  it("Available on localhost:3000", () => {
    cy.visit("http://localhost:3000");
  });
});
