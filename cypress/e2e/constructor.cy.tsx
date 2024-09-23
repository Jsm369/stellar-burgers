import { login } from './login.cy';

describe('constructor', function () {
  beforeEach(() => {
    login();
  });

  it('должен добавлять ингредиенты в конструктор', () => {
    cy.get('[data-cy="top-bun"]').as('topBun');
    cy.get('[data-cy="bottom-bun"]').as('bottomBun');
    cy.get('[data-cy="ingredients-list"]').as('ingredientsList');

    cy.fixture('ingredients.json').then(
      (ingredients: { data: Array<{ _id: string; name: string }> }) => {
        for (let i = 0; i < 3; i++) {
          cy.get(`[data-cy="ingredient-${ingredients.data[i]._id}"]`)
            .find('[type="button"]')
            .click();
        }

        cy.get('@topBun').should('contain', ingredients.data[0].name);
        cy.get('@bottomBun').should('contain', ingredients.data[0].name);

        for (let i = 1; i < 3; ++i) {
          cy.get('@ingredientsList').should(
            'contain',
            ingredients.data[i].name
          );
        }
      }
    );
  });
});
