import {
  defaultColor,
  changingColor,
  modifiedColor,
  circle,
  circleSmall,
  inputValue,
  inputIndex,
  buttonAddHead,
  buttonAddTail,
  buttonAddByIndex,
  buttonDeleteHead,
  buttonDeleteTail,
  buttonDeleteByIndex,
} from "../../src/constants/element-captions";

describe("List test", () => {
  beforeEach(() => {
    cy.visit("list");
  });

  //отключение кнопок
  it("Disabled if input empty", () => {
    cy.get(inputValue).should("be.empty");
    cy.get(buttonAddHead).should("be.disabled");
    cy.get(buttonAddTail).should("be.disabled");
  });

  //отключение кнопок
  it("Disabled if index empty", () => {
    cy.get(inputIndex).should("be.empty");
    cy.get(buttonAddByIndex).should("be.disabled");
  });

  //отрисовка дефолтного списка
  it("Showing default list", () => {
    cy.get(circle).as("circles");

    cy.get("@circles").each(($circles) => {
      expect($circles).to.have.css("border-color", defaultColor);
    });

    cy.get("li").eq(0).should("contain", "head");
    cy.get("li").eq(-1).should("contain", "tail");
  });

  //добавление элемента в head
  it("Adding element in head", () => {
    cy.get(inputValue).type("21");
    cy.get(buttonAddHead).should("not.be.disabled").click();

    cy.get(circle).as("circles");
    cy.get(circleSmall).as("circleSmall");

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
    cy.get(inputValue).type("21");
    cy.get(buttonAddTail).should("not.be.disabled").click();

    cy.get(circle).as("circles");
    cy.get(circleSmall).as("circleSmall");

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
    cy.get(buttonDeleteHead).should("not.be.disabled").click();

    cy.get(circle).as("circles");
    cy.get(circleSmall).as("circleSmall");

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
    cy.get(buttonDeleteTail).should("not.be.disabled").click();

    cy.get(circle).as("circles");
    cy.get(circleSmall).as("circleSmall");

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
    cy.get(inputValue).type("21");
    cy.get(inputIndex).type(2);

    cy.get(buttonAddByIndex).should("not.be.disabled").click();

    cy.get(circle).as("circles");
    cy.get(circleSmall).as("circleSmall");

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
    cy.get(inputIndex).type("2");

    cy.get(buttonDeleteByIndex).should("not.be.disabled").click();

    cy.get(circle).as("circles");
    cy.get(circleSmall).as("circleSmall");

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
