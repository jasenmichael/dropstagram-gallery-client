describe("test dropstagrambox-gallery-client", () => {
  it("tests the page to see if it loads and filters properly", () => {
    cy.visit("/")
    cy.wait(3000)
    // check .brand-logo is "DropstagramboxGallery"
    cy.get('.brand-logo').should('have.text', 'DropstagramboxGallery')



  })
})
