describe("Authentication test", () => {
  it("Visit the SignIn page", () => {
    cy.visit("http://localhost:4173");
    cy.get(".MuiButton-containedWarning").click();
    cy.url().should("include", "/createProfile");
    cy.get("#displayName")
      .type("fake@email.com")
      .should("have.value", "fake@email.com");
    cy.get(".MuiButton-root").click();
    cy.url().should("include", "/");
  });
});
