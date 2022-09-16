/// <reference types="cypress" />
import {SausedemoLogIn} from "../support/selectors"

const loginPage = new SausedemoLogIn()

it('Sausedemo', () => {

    cy.visit(loginPage.baseUrl)

    //Verify that the page loaded successfully
    cy.url().should('include',loginPage.baseUrl)
    assert.exists(cy.get(loginPage.loginButton))

    //Verify that [Log in] button is visible for user
    cy.get(loginPage.loginButton).should('be.visible')

    //Clear inputs
    cy.get(loginPage.userNameField).clear()
    cy.get(loginPage.passwordField).clear()

    // Verify that input fields (email/password) 
    // are visible (have placeholders)
    cy.get(loginPage.userNameField)
        .should('be.visible')
        .and('have.attr', 'placeholder')
    
    cy.get(loginPage.passwordField)
        .should('be.visible')
        .and('have.attr', 'placeholder')

    //Logging in
    cy.get(loginPage.userNameField)
        .type('standard_user')

    cy.get(loginPage.passwordField)
        .type('secret_sauce{enter}')


    // Verify that the user is logged in successfully (check url)
    cy.url().should('include', loginPage.targetUrl)

    //Click the hamburger menu at the top left of the window
    cy.get(loginPage.hamburgerMenuButton)
        .click()

    //Verify that [Log out] button is visible and log out
    cy.get(loginPage.logOutButton)
        .should('be.visible')
        .click()
    
    //Verify that the user was redirected to the main page
    cy.url().should('include',loginPage.baseUrl)
    
})