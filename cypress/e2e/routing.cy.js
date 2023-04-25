describe("Routes test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  //страница String
  it("open String-page", () => {
    cy.get('a[href*="recursion"]').click();
    cy.contains("Строка");
  });

  //страница Fibonacci
  it("open Fibonacci-page", () => {
    cy.get('a[href*="fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
  });

  //страница Sorting
  it("open Sorting-page", () => {
    cy.get('a[href*="sorting"]').click();
    cy.contains("Сортировка массива");
  });

  //страница Stack
  it("open Stack-page", () => {
    cy.get('a[href*="stack"]').click();
    cy.contains("Стек");
  });

  //страница Queue
  it("open Queue-page", () => {
    cy.get('a[href*="queue"]').click();
    cy.contains("Очередь");
  });

  //страница List
  it("open List-page", () => {
    cy.get('a[href*="list"]').click();
    cy.contains("Связный список");
  });
});
