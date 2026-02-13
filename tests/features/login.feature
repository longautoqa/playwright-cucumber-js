Feature: Login and Product Functionality
  As a user of Sauce Demo website
  I want to login and interact with products
  So that I can verify the shopping cart works correctly

  Scenario: Successful login and product cart operations
    Given I open the Sauce Demo website
    When I enter the username and password
    And I click the Login button
    Then I should see the products page

    When I get all products with their name and price
    Then all products should be displayed with name and price

    When I add a product to the cart
    Then the cart quantity should be "1"

    When I go to the cart page
    Then the cart should show the correct quantity and description
    And the Remove, Checkout, and Continue Shopping buttons should be enabled

    When I remove the product from the cart
    Then the cart quantity should be updated to "0"

  Scenario: Successful login redirects to inventory URL
    Given I open the Sauce Demo website
    When I enter the username and password
    And I click the Login button
    Then the page URL should contain "inventory"

  Scenario: Successful login displays exactly 6 products
    Given I open the Sauce Demo website
    When I enter the username and password
    And I click the Login button
    Then I should see the products page
    When I get all products with their name and price
    Then the total number of products should be 6

  Scenario: Successful login shows Products as page title
    Given I open the Sauce Demo website
    When I enter the username and password
    And I click the Login button
    Then the products page title should be "Products"

  Scenario: Login with locked out user shows error message
    Given I open the Sauce Demo website
    When I enter the username "locked_out_user" and password "secret_sauce"
    And I click the Login button
    Then I should see the error message "Epic sadface: Sorry, this user has been locked out."

  Scenario: Login with invalid credentials shows error message
    Given I open the Sauce Demo website
    When I enter the username "invalid_user" and password "wrong_password"
    And I click the Login button
    Then I should see the error message "Epic sadface: Username and password do not match any user"

  Scenario: Login with empty username and password shows error message
    Given I open the Sauce Demo website
    When I enter the username "" and password ""
    And I click the Login button
    Then I should see the error message "Epic sadface: Username is required"



  Scenario: Login with empty password shows error message
    Given I open the Sauce Demo website
    When I enter the username "standard_user" and password ""
    And I click the Login button
    Then I should see the error message "Epic sadface: Password is required - ssss"
