import {
  defaultColor,
  changingColor,
  buttonAdd,
  circle,
  buttonDelete,
  buttonReset,
} from "../../src/constants/element-captions";

describe("Queue test", () => {
  beforeEach(() => {
    cy.visit("queue");
  });

  //отключение кнопок
  it("Disabled if empty", () => {
    cy.get("input").should("be.empty");
    cy.get(buttonAdd).should("be.disabled");
  });

  //добавление элемента
  it("Correct adding element", () => {
    for (let i = 0; i < 7; i++) {
      cy.get("input").type(i);
      cy.get(buttonAdd).should("not.be.disabled").click();

      cy.get(circle).as("circles");

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

    cy.get(circle).as("circles");

    cy.get("li").eq(0).should("contain", "head");
    cy.get("li").eq(-1).should("contain", "tail");
  });

  //удаление элемента
  it("Correct deleting element", () => {
    for (let i = 0; i < 3; i++) {
      cy.get("input").type(i);
      cy.get(buttonAdd).should("not.be.disabled").click();

      cy.get(circle).as("circles");

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

    cy.get("form").find(buttonDelete).should("not.be.disabled").click();

    cy.get(circle).as("circles");

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
      cy.get(buttonAdd).should("not.be.disabled").click();

      cy.get(circle).as("circles");

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

    cy.get("form").find(buttonReset).should("not.be.disabled").click();

    cy.get(circle).as("circles");

    cy.get("@circles").should(($circles) => {
      expect($circles).to.contain("");
    });
  });
});
