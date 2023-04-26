import { defaultColor, circle } from "../../src/constants/element-captions";

describe("Fibonacci test", () => {
  beforeEach(() => {
    cy.visit("fibonacci");
  });

  //отключение кнопок
  it("Disabled if empty", () => {
    cy.get("input").should("be.empty");
    cy.get("form").find("button").should("be.disabled");
  });

  //корректная отрисовка массива
  it("Correct fibonacci array", () => {
    cy.get("input").type("5");
    cy.get("form").find("button").should("not.be.disabled").click();

    cy.get(circle).as("circles");

    cy.get("@circles").should(($circles) => {
      expect($circles).to.have.length(6);

      expect($circles.eq(0))
        .to.contain("0")
        .to.have.css("border-color", defaultColor);
      expect($circles.eq(1))
        .to.contain("1")
        .to.have.css("border-color", defaultColor);
      expect($circles.eq(2))
        .to.contain("1")
        .to.have.css("border-color", defaultColor);
      expect($circles.eq(3))
        .to.contain("2")
        .to.have.css("border-color", defaultColor);
      expect($circles.eq(4))
        .to.contain("3")
        .to.have.css("border-color", defaultColor);
      expect($circles.eq(5))
        .to.contain("5")
        .to.have.css("border-color", defaultColor);
    });
  });
});
