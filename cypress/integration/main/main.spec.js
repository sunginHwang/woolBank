describe('main e2e test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5000')
    })


    it('is access main page', () => {
        // https://on.cypress.io/type
        cy.get('.App-link')
            .should('contain', 'Learn React');

        cy.get('.App-link')
            .should('contain', 'Learn React');

    })
})
