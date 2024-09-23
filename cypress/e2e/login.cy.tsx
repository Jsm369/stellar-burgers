export const login = () => {
  cy.getIngredients();
  cy.visit('http://localhost:4000/login');
  cy.userLogin();
  cy.get('[data-cy="email-input"]').type('test@yandex.ru');
  cy.get('[data-cy="password-input"]').type('password');
  cy.get('[data-cy="login-button"]').click();
};

describe('Тестирование логина', function () {
  beforeEach(() => {
    cy.getIngredients();
  });

  it('должен успешно войти в систему', () => {
    login();

    // Проверка, что запрос на логин был выполнен с правильными данными
    cy.wait('@api/login').its('request.body').should('deep.equal', {
      email: 'test@yandex.ru',
      password: 'password'
    });

    // Проверка наличия токенов в куках и локальном хранилище
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

    cy.url().should('eq', 'http://localhost:4000/');
  });
});
