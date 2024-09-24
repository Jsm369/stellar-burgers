import { login } from './login.cy';

describe('constructor', function () {
  beforeEach(() => {
    login();
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.clearLocalStorage('refreshToken');
  });

  it('должен добавлять ингредиенты в конструктор', () => {
    cy.get('[data-cy="top-bun"]').as('topBun');
    cy.get('[data-cy="bottom-bun"]').as('bottomBun');
    cy.get('[data-cy="ingredients-list"]').as('ingredientsList');

    cy.fixture('ingredients.json').then(
      (ingredients: { data: Array<{ _id: string; name: string }> }) => {
        for (let i = 0; i < 3; i++) {
          const ingredientName = ingredients.data[i].name;
          const ingredientSelector = `[data-cy="ingredient-${ingredients.data[i]._id}"]`;

          cy.get('@ingredientsList').should('not.contain', ingredientName);

          cy.get(ingredientSelector).find('[type="button"]').click();

          if (i === 0) {
            cy.get('@topBun').should('contain', ingredientName);
            cy.get('@bottomBun').should('contain', ingredientName);
          } else {
            cy.get('@ingredientsList').should('contain', ingredientName);
          }
        }
      }
    );
  });
});
