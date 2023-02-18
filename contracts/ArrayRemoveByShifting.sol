// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract ArrayRemoveByShifting {
  // [1, 2, 3] -- remove(1) --> [1, 3, 3] --> [1, 3]
  // [1, 2, 3, 4, 5, 6] -- remove(2) --> [1, 2, 4, 5, 6, 6] --> [1, 2, 4, 5, 6]
  // [1, 2, 3, 4, 5, 6] -- remove(0) --> [2, 3, 4, 5, 6, 6] --> [2, 3, 4, 5, 6]
  // [1] -- remove(0) --> [1] --> []  
}