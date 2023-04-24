describe("Routes test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("open String-page", () => {
    cy.get('a[href*="recursion"]').click();
    cy.contains("Строка");
  });

  it("open Fibonacci-page", () => {
    cy.get('a[href*="fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
  });

  it("open Sorting-page", () => {
    cy.get('a[href*="sorting"]').click();
    cy.contains("Сортировка массива");
  });

  it("open Stack-page", () => {
    cy.get('a[href*="stack"]').click();
    cy.contains("Стек");
  });

  it("open Queue-page", () => {
    cy.get('a[href*="queue"]').click();
    cy.contains("Очередь");
  });

  it("open List-page", () => {
    cy.get('a[href*="list"]').click();
    cy.contains("Связный список");
  });
});
