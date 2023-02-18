// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./StructDeclaration.sol";

contract Todos {
    // An array of 'Todo' structs
    Todo[] todos;

    function create(string calldata _text) public {
        // 3 ways to initialize a struct
        // - calling it like a function   
        todos.push(Todo({text: _text, completed: false}));

        // initialize an empty struct and then update it
        Todo memory todo;
        todo.text = _text;
        todos.push(todo);
    }

    // Solidity automatically created a getter for 'todos' so
    // you don't actually need this function.
    function get(uint _index) public view returns (string memory text, bool completed) {
        Todo storage todo = todos[_index];
        return (todo.text, todo.completed);
    }

    // update text
    function updateText(uint _index, string calldata _text) public {
        Todo storage todo = todos[_index];
        todo.text = _text;
    }
    
    // update completed
    function toggleCompleted(uint _index) public {
        Todo storage todo = todos[_index];
        todo.completed = !todo.completed;
    }
}