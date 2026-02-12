Feature: Login and Product Functionality
  As a user of Sauce Lab website
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
