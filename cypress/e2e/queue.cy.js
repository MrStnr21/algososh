import {
  defaultColor,
  changingColor,
} from "../../src/constants/element-captions";

describe("Queue test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/queue");
  });

  //отключение кнопок
  it("Disabled if empty", () => {
    cy.get("input").should("be.empty");
    cy.get('button[data-testid="add"]').should("be.disabled");
  });

  //добавление элемента
  it("Correct adding element", () => {
    for (let i = 0; i < 7; i++) {
      cy.get("input").type(i);
      cy.get('button[data-testid="add"]').should("not.be.disabled").click();

      cy.get('[class^="circle_circle"]').as("circles");

      cy.get("@circles").should(($circles) => {
        expect($circles[i])
          .to.contain(i)
          .to.have.css("border-color", changingColor);
      });

      cy.wait(1000);

      cy.get("@circles").should(($circles) => {
        expect($circles[i])
          .to.contain(i)
          .to.have.css("border-color", defaultColor);
      });
    }

    cy.get('[class^="circle_circle"]').as("circles");

    cy.get("li").eq(0).should("contain", "head");
    cy.get("li").eq(-1).should("contain", "tail");
  });

  //удаление элемента
  it("Correct deleting element", () => {
    for (let i = 0; i < 3; i++) {
      cy.get("input").type(i);
      cy.get('button[data-testid="add"]').should("not.be.disabled").click();

      cy.get('[class^="circle_circle"]').as("circles");

      cy.get("@circles").should(($circles) => {
        expect($circles[i])
          .to.contain(i)
          .to.have.css("border-color", changingColor);
      });

      cy.wait(1000);

      cy.get("@circles").should(($circles) => {
        expect($circles[i])
          .to.contain(i)
          .to.have.css("border-color", defaultColor);
      });
    }

    cy.get("form")
      .find('button[data-testid="delete"]')
      .should("not.be.disabled")
      .click();

    cy.get('[class^="circle_circle"]').as("circles");

    cy.get("@circles").should(($circles) => {
      expect($circles[0])
        .to.contain("")
        .to.have.css("border-color", changingColor);
    });

    cy.wait(1000);

    cy.get("@circles").should(($circles) => {
      expect($circles[0]).to.have.css("border-color", defaultColor);
    });

    cy.get("li").eq(1).should("contain", "head");
  });

  //сброс стека
  it("Correct reseting stack", () => {
    for (let i = 0; i < 3; i++) {
      cy.get("input").type(i);
      cy.get('button[data-testid="add"]').should("not.be.disabled").click();

      cy.get('[class^="circle_circle"]').as("circles");

      cy.get("@circles").should(($circles) => {
        expect($circles[i])
          .to.contain(i)
          .to.have.css("border-color", changingColor);
      });

      cy.wait(1000);

      cy.get("@circles").should(($circles) => {
        expect($circles[i])
          .to.contain(i)
          .to.have.css("border-color", defaultColor);
      });
    }

    cy.get("form")
      .find('button[data-testid="reset"]')
      .should("not.be.disabled")
      .click();

    cy.get('[class^="circle_circle"]').as("circles");

    cy.get("@circles").should(($circles) => {
      expect($circles).to.contain("");
    });
  });
});
