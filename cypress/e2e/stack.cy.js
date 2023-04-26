import {
  defaultColor,
  changingColor,
  circle,
  buttonAdd,
  buttonDelete,
  buttonReset,
} from "../../src/constants/element-captions";

describe("Stack test", () => {
  beforeEach(() => {
    cy.visit("stack");
  });

  //отключение кнопок
  it("Disabled if empty", () => {
    cy.get("input").should("be.empty");
    cy.get("form").find(buttonAdd).should("be.disabled");
  });

  //добавление элемента
  it("Correct adding element", () => {
    cy.get("input").type("21");
    cy.get("form").find(buttonAdd).should("not.be.disabled").click();

    cy.get(circle).as("circle");

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
    cy.get("form").find(buttonAdd).should("not.be.disabled").click();

    cy.get("form").find(buttonDelete).should("not.be.disabled").click();

    cy.get(circle).as("circle");

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
      cy.get("form").find(buttonAdd).should("not.be.disabled").click();
    }

    cy.get("form").find(buttonReset).should("not.be.disabled").click();
  });
});
