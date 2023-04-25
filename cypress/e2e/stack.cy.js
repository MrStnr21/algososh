import {
  defaultColor,
  changingColor,
} from "../../src/constants/element-captions";

describe("Stack test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/stack");
  });

  //отключение кнопок
  it("Disabled if empty", () => {
    cy.get("input").should("be.empty");
    cy.get("form").find('button[data-testid="add"]').should("be.disabled");
  });

  //добавление элемента
  it("Correct adding element", () => {
    cy.get("input").type("21");
    cy.get("form")
      .find('button[data-testid="add"]')
      .should("not.be.disabled")
      .click();

    cy.get('[class^="circle_circle"]').as("circle");

    cy.get("@circle").should(($circle) => {
      expect($circle).to.have.length(1);
      expect($circle)
        .to.contain("21")
        .to.have.css("border-color", changingColor);
    });

    cy.wait(1000);

    cy.get("@circle").should(($circle) => {
      expect($circle).to.have.length(1);
      expect($circle).to.contain("2").to.have.css("border-color", defaultColor);
    });
  });

  //удаление элемента
  it("Correct deleting element", () => {
    cy.get("input").type("21");
    cy.get("form")
      .find('button[data-testid="add"]')
      .should("not.be.disabled")
      .click();

    cy.get("form")
      .find('button[data-testid="delete"]')
      .should("not.be.disabled")
      .click();

    cy.get('[class^="circle_circle"]').as("circle");

    cy.get("@circle").should(($circle) => {
      expect($circle).to.have.css("border-color", changingColor);
    });

    cy.wait(1000);

    cy.get("@circle").should(($circle) => {
      expect($circle).to.have.length(0);
    });
  });

  //сброс стека
  it("Correct reseting stack", () => {
    for (let i = 0; i < 3; i++) {
      cy.get("input").type(i);
      cy.get("form")
        .find('button[data-testid="add"]')
        .should("not.be.disabled")
        .click();
    }

    cy.get("form")
      .find('button[data-testid="reset"]')
      .should("not.be.disabled")
      .click();
  });
});
