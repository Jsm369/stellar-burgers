declare namespace Cypress {
  interface Chainable {
    getIngredients(): void;
    userLogin(): void;
    orderData(): void;
  }
}
