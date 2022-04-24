Feature: bet on soccer match

  Scenario: Bet on a only one soccer match
    Given User visits "http://localhost:3000"
    Then a match list is displayed with their odds

  Scenario: Bet on a only one soccer match
    Given A bet list with odds
    When I select on a match
    And  I choose a stake
    Then the bet summary displays the potential gain