/// <reference types='cypress' />

describe('e2e test demoblaze', () => {
  const user = {
    username: "Bob",
    password: "Ratatatata1!1",
  };

  const alert = {
    signup: "Sign up successful.",
    login: "login successful.",
    productAdd: "Product added.",
  };

  beforeEach(() => {
    cy.visit('https://www.demoblaze.com');
  });

  it('should sign up', () => {
    cy.get('#signin2').click();
    cy.get('#sign-username').type(user.username);
    cy.get('#sign-password').type(user.password);
    cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(alert.signup)
    });
  });

  it('should login', () => {
    cy.get('#login2').click();
    cy.get('#loginusername').type(user.username);
    cy.get('#loginpassword').type(user.password);
    cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(alert.login)
    });
    cy.get('#nameofuser').should('contain.text', `Welcome ${user.username}`);
  });

  it('should add staff to cart', () => {
    cy.get(':nth-child(1) > .card > .card-block > .card-title > .hrefch').click();
    cy.url().should('include', 'https://www.demoblaze.com/prod.html?idp_=1');
    cy.get('.col-sm-12 > .btn').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(alert.productAdd)
    });
    cy.get('#cartur').click();
    cy.get('#tbodyid').should('contain.text', 'Samsung galaxy s6');
  });
});
