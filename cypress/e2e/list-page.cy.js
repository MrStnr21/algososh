import {
  defaultColor,
  changingColor,
  modifiedColor,
} from "../../src/constants/element-captions";

describe("List test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");
  });

  //отключение кнопок
  it("Disabled if input empty", () => {
    cy.get('input[placeholder="Введите значение"]').should("be.empty");
    cy.get('button[data-testid="add-head"]').should("be.disabled");
    cy.get('button[data-testid="add-tail"]').should("be.disabled");
  });

  //отключение кнопок
  it("Disabled if index empty", () => {
    cy.get('input[placeholder="Введите индекс"]').should("be.empty");
    cy.get('button[data-testid="add-by-index"]').should("be.disabled");
  });

  //отрисовка дефолтного списка
  it("Showing default list", () => {
    cy.get('[class^="circle_circle"]').as("circles");

    cy.get("@circles").each(($circles) => {
      expect($circles).to.have.css("border-color", defaultColor);
    });

    cy.get("li").eq(0).should("contain", "head");
    cy.get("li").eq(-1).should("contain", "tail");
  });

  //добавление элемента в head
  it("Adding element in head", () => {
    cy.get('input[placeholder="Введите значение"]').type("21");
    cy.get('button[data-testid="add-head"]').should("not.be.disabled").click();

    cy.get('[class^="circle_circle"]').as("circles");
    cy.get('[class*="circle_small"]').as("circleSmall");

    cy.get("@circleSmall").should(($circle) => {
      expect($circle)
        .to.contain("21")
        .to.have.css("border-color", changingColor);
    });

    cy.wait(500);

    cy.get("@circles").should(($circles) => {
      expect($circles.eq(0))
        .to.contain("21")
        .to.have.css("border-color", modifiedColor);
    });

    cy.wait(500);

    cy.get("@circles").should(($circles) => {
      expect($circles.eq(0))
        .to.contain("21", "head")
        .to.have.css("border-color", defaultColor);
    });
  });

  //добавление элемента в tail
  it("Adding element in tail", () => {
    cy.get('input[placeholder="Введите значение"]').type("21");
    cy.get('button[data-testid="add-tail"]').should("not.be.disabled").click();

    cy.get('[class^="circle_circle"]').as("circles");
    cy.get('[class*="circle_small"]').as("circleSmall");

    cy.get("@circleSmall").should(($circle) => {
      expect($circle)
        .to.contain("21")
        .to.have.css("border-color", changingColor);
    });

    cy.wait(500);

    cy.get("@circleSmall").should("not.exist");

    cy.get("@circles").should(($circle) => {
      expect($circle.eq(-1))
        .to.contain("21")
        .to.have.css("border-color", modifiedColor);
    });

    cy.wait(500);

    cy.get("@circles").should(($circles) => {
      expect($circles.last())
        .to.contain("21", "tail")
        .to.have.css("border-color", defaultColor);
    });
  });

  //удаление элемента из head
  it("Deleting element from head", () => {
    cy.get('button[data-testid="delete-head"]')
      .should("not.be.disabled")
      .click();

    cy.get('[class^="circle_circle"]').as("circles");
    cy.get('[class*="circle_small"]').as("circleSmall");

    cy.get("@circles").should(($circles) => {
      expect($circles[0]).to.contain("");
    });

    cy.get("@circleSmall").should(($circleSmall) => {
      expect($circleSmall)
        .to.contain("0")
        .to.have.css("border-color", changingColor);
    });

    cy.wait(500);

    cy.get("@circles").should(($circles) => {
      expect($circles[0]).to.contain("34", "tail");
    });

    cy.get("@circleSmall").should("not.exist");
  });

  //удаление элемента из tail
  it("Deleting element from tail", () => {
    cy.get('button[data-testid="delete-tail"]')
      .should("not.be.disabled")
      .click();

    cy.get('[class^="circle_circle"]').as("circles");
    cy.get('[class*="circle_small"]').as("circleSmall");

    cy.get("@circles").should(($circles) => {
      expect($circles[3]).to.contain("");
    });

    cy.get("@circleSmall").should(($circleSmall) => {
      expect($circleSmall)
        .to.contain("1")
        .to.have.css("border-color", changingColor);
    });

    cy.wait(500);

    cy.get("@circles").should(($circles) => {
      expect($circles[2]).to.contain("8", "tail");
    });

    cy.get("@circleSmall").should("not.exist");
  });

  //добавление элемента по индексу
  it("Adding element by index", () => {
    cy.get("input[placeholder='Введите значение']").type("21");
    cy.get("input[placeholder='Введите индекс']").type(2);

    cy.get('button[data-testid="add-by-index"]')
      .should("not.be.disabled")
      .click();

    cy.get('[class^="circle_circle"]').as("circles");
    cy.get('[class*="circle_small"]').as("circleSmall");

    for (let i = 0; i < 2; i++) {
      cy.get("@circles").should(($circles) => {
        expect($circles[i]).to.have.css("border-color", changingColor);
      });
    }

    cy.wait(500);

    cy.get("@circleSmall").should(($circleSmall) => {
      expect($circleSmall)
        .to.have.css("border-color", changingColor)
        .to.contain("21");
    });

    cy.wait(500);

    cy.get("@circles").should(($circles) => {
      expect($circles.eq(2))
        .to.contain("21")
        .to.have.css("border-color", modifiedColor);
    });

    cy.wait(500);

    cy.get("@circleSmall").should("not.exist");

    cy.get("@circles").should(($circles) => {
      expect($circles.eq(2)).to.have.css("border-color", defaultColor);
    });
  });

  //удаление элемента по индексу
  it("deleting element by index", () => {
    cy.get("input[placeholder='Введите индекс']").type("2");

    cy.get('button[data-testid="delete-by-index"]')
      .should("not.be.disabled")
      .click();

    cy.get('[class^="circle_circle"]').as("circles");
    cy.get('[class*="circle_small"]').as("circleSmall");

    cy.get("@circleSmall").should(($circleSmall) => {
      expect($circleSmall)
        .to.have.css("border-color", changingColor)
        .to.contain("8");
    });

    for (let i = 0; i <= 2; i++) {
      cy.get("@circles").should(($circles) => {
        expect($circles.eq(i))
          .to.have.css("border-color", defaultColor)
          .to.contain("");
      });
    }

    cy.wait(500);

    cy.get("@circleSmall").should("not.exist");
  });
});
