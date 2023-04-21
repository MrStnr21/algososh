import {
  defaultColor,
  changingColor,
  modifiedColor,
} from "../../src/constants/element-captions";

describe("String", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");
  });

  it("Disabled if empty", () => {
    cy.get("input").should("be.empty");
    cy.get("form").find("button").should("be.disabled");

    cy.get("input").type("oturan");
    cy.get("form").find("button").should("not.be.disabled");
  });

  it("Correct recursion", () => {
    cy.get("input").type("oturan");
    cy.get("form").find("button").should("not.be.disabled").click();

    cy.get('[class^="circle_circle"]').as("circles");

    cy.get("@circles").should(($circles) => {
      expect($circles).to.have.length(6);

      expect($circles.eq(0))
        .to.contain("o")
        .to.have.css("border-color", defaultColor);
      expect($circles.eq(1))
        .to.contain("t")
        .to.have.css("border-color", defaultColor);
      expect($circles.eq(2))
        .to.contain("u")
        .to.have.css("border-color", defaultColor);
      expect($circles.eq(3))
        .to.contain("r")
        .to.have.css("border-color", defaultColor);
      expect($circles.eq(4))
        .to.contain("a")
        .to.have.css("border-color", defaultColor);
      expect($circles.eq(5))
        .to.contain("n")
        .to.have.css("border-color", defaultColor);
    });

    cy.wait(1000);

    cy.get("@circles").should(($circles) => {
      expect($circles).to.have.length(6);

      expect($circles.eq(0))
        .to.contain("o")
        .to.have.css("border-color", changingColor);
      expect($circles.eq(1))
        .to.contain("t")
        .to.have.css("border-color", defaultColor);
      expect($circles.eq(2))
        .to.contain("u")
        .to.have.css("border-color", defaultColor);
      expect($circles.eq(3))
        .to.contain("r")
        .to.have.css("border-color", defaultColor);
      expect($circles.eq(4))
        .to.contain("a")
        .to.have.css("border-color", defaultColor);
      expect($circles.eq(5))
        .to.contain("n")
        .to.have.css("border-color", changingColor);
    });

    cy.wait(1000);

    cy.get("@circles").should(($circles) => {
      expect($circles).to.have.length(6);

      expect($circles.eq(0))
        .to.contain("n")
        .to.have.css("border-color", modifiedColor);
      expect($circles.eq(1))
        .to.contain("t")
        .to.have.css("border-color", changingColor);
      expect($circles.eq(2))
        .to.contain("u")
        .to.have.css("border-color", defaultColor);
      expect($circles.eq(3))
        .to.contain("r")
        .to.have.css("border-color", defaultColor);
      expect($circles.eq(4))
        .to.contain("a")
        .to.have.css("border-color", changingColor);
      expect($circles.eq(5))
        .to.contain("o")
        .to.have.css("border-color", modifiedColor);
    });

    cy.wait(1000);

    cy.get("@circles").should(($circles) => {
      expect($circles).to.have.length(6);

      expect($circles.eq(0))
        .to.contain("n")
        .to.have.css("border-color", modifiedColor);
      expect($circles.eq(1))
        .to.contain("a")
        .to.have.css("border-color", modifiedColor);
      expect($circles.eq(2))
        .to.contain("u")
        .to.have.css("border-color", changingColor);
      expect($circles.eq(3))
        .to.contain("r")
        .to.have.css("border-color", changingColor);
      expect($circles.eq(4))
        .to.contain("t")
        .to.have.css("border-color", modifiedColor);
      expect($circles.eq(5))
        .to.contain("o")
        .to.have.css("border-color", modifiedColor);
    });

    cy.wait(1000);

    cy.get("@circles").should(($circles) => {
      expect($circles).to.have.length(6);

      expect($circles.eq(0))
        .to.contain("n")
        .to.have.css("border-color", modifiedColor);
      expect($circles.eq(1))
        .to.contain("a")
        .to.have.css("border-color", modifiedColor);
      expect($circles.eq(2))
        .to.contain("r")
        .to.have.css("border-color", modifiedColor);
      expect($circles.eq(3))
        .to.contain("u")
        .to.have.css("border-color", modifiedColor);
      expect($circles.eq(4))
        .to.contain("t")
        .to.have.css("border-color", modifiedColor);
      expect($circles.eq(5))
        .to.contain("o")
        .to.have.css("border-color", modifiedColor);
    });
  });
});
