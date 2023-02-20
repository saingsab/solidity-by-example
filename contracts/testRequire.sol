// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Error {
    function testRequire(uint _i) public pure {
       // Require should be used to validate conditions such as:
       // - inputs
        // - conditions before execution
        // - return values from calls to other functions 
        require(_i > 10, "Input must be greater then 10");
    }

    function testRevert(uint _i) public pure{
      if (_i <= 10) {
        revert("Input must be greater then 10");
      } 
    }

    uint public num;
    function testAssert() public view {
        // Assert should only be used to test for internal errors,
        // and to check invariants.

        // Here we assert that num is always equal to 0
        // since it is impossible to update the value of num 
        assert(num == 0);  
    }

    // custom error
    error InsufficientBalance(uint balance, uint withdrawAmount );

    function testCustomError(uint _withdrawAmount) public view {
        uint bal = address(this).balance;
        if(bal < _withdrawAmount) {
            revert InsufficientBalance({balance: bal, withdrawAmount: _withdrawAmount});
        } 
    }
}