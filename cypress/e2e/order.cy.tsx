import { login } from './login.cy';

describe('создание заказа', function () {
  beforeEach(() => {
    cy.getIngredients();
    login();
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.clearLocalStorage('refreshToken');
  });

  it('должен успешно войти в систему', () => {
    cy.wait('@api/login').its('request.body').should('deep.equal', {
      email: 'test@yandex.ru',
      password: 'password'
    });

    cy.fixture('user.json').then((user) => {
      cy.getCookie('accessToken')
        .should('exist')
        .should('have.property', 'value', user.accessToken);

      cy.window().then((win) => {
        expect(win.localStorage).to.have.property('refreshToken');
        expect(win.localStorage.getItem('refreshToken')).to.equal(
          user.refreshToken
        );
      });
    });
  });

  it('должен добавить ингредиенты в конструктор и создать заказ', () => {
    cy.get('[data-cy="top-bun"]').as('topBun');
    cy.get('[data-cy="bottom-bun"]').as('bottomBun');
    cy.get('[data-cy="ingredients-list"]').as('ingredientsList');

    cy.fixture('ingredients.json').then((ingredients) => {
      ingredients.data.slice(0, 3).forEach((ingredient) => {
        cy.get(`[data-cy="ingredient-${ingredient._id}"]`)
          .find('[type="button"]')
          .click();
      });

      cy.get('@topBun').should('contain', ingredients.data[0].name);
      cy.get('@bottomBun').should('contain', ingredients.data[0].name);
      cy.get('@ingredientsList').should('contain', ingredients.data[1].name);
      cy.get('@ingredientsList').should('contain', ingredients.data[2].name);
    });

    cy.orderData();
    cy.get('[data-cy="order-button__container"]')
      .find('[type="button"]')
      .click();

    cy.fixture('order.json').then((orderData) => {
      cy.get('[data-cy="modal"]')
        .should('be.visible')
        .should('contain', orderData.order.number);
    });

    cy.get('[data-cy="modal-close"]').click();
    cy.get('@topBun').should('contain', 'Выберите булки');
    cy.get('@bottomBun').should('contain', 'Выберите булки');
    cy.get('@ingredientsList').should('contain', 'Выберите начинку');
  });
});
