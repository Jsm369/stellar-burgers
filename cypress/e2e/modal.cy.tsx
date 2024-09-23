describe('модальное окно', function () {
  this.beforeEach(() => {
    cy.getIngredients();
    cy.visit('http://localhost:4000');
    cy.fixture('ingredients.json').then((ingredients) => {
      cy.get(`[data-cy="ingredient-link-${ingredients.data[0]._id}"]`, {
        timeout: 10000
      })
        .should('exist')
        .click({ force: true });
    });
  });

  it('должно открываться', () => {
    cy.get('[data-cy="modal"]').should('be.visible');
  });

  it('должно закрываться по кнопке закрытия', () => {
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('должно закрываться при клике на оверлей', () => {
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('должно отображать правильный ингредиент', () => {
    cy.fixture('ingredients.json').then((ingredients) => {
      cy.get('[data-cy="ingredient-title"]').should(
        'contain',
        ingredients.data[0].name
      );
    });
  });
});
