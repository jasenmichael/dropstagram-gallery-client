describe("test dropstagrambox-gallery-client", () => {
  it("tests the page to see if it loads and filters properly", () => {
    cy.visit("/")
    cy.wait(3000)
    // check .brand-logo is "DropstagramboxGallery"
    cy.get('.brand-logo').should('have.text', 'DropstagramboxGallery')

    // instagram button displays only instagram images
    cy.get('#insta').click()
    cy.wait(1000)
    cy.get('.instagram').should('have.class', 'show')
    cy.get('.dropbox').should('not.have.class', 'show')

    // dropbox button displays only dropbox images
    cy.get('#drop').click()
    cy.wait(1000)
    cy.get('.dropbox').should('have.class', 'show')
    cy.get('.instagram').should('not.have.class', 'show')

    // both button displays only instagram  and dropbox  images
    cy.get('#both').click()
    cy.wait(1000)
    cy.get('.dropbox').should('have.class', 'show')
    cy.get('.instagram').should('have.class', 'show')

    // about section hidden by default
    cy.get('#about').should('not.be.visible')

    // about link displays only about section
    cy.get('#aboutlink').click()
    cy.wait(2000)
    cy.get('#gallery').should('not.have.class', 'show')
    cy.get('#about').should('be.visible')


  })
})
