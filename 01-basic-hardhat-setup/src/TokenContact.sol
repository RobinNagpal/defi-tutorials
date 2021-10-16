// SPDX-License-Identifier: MIT
// The line above is recommended and let you define the license of your contract
// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

// This is the main building block for smart contracts.
contract TokenContact is Initializable {
    // Some string type variables to identify the token.
    // The `public` modifier makes a variable readable from outside the contract.
    string public name;

    string public symbol;

    // The fixed amount of tokens stored in an unsigned integer type variable.
    uint256 public totalSupply;

    // An address type variable is used to store ethereum accounts.
    address public owner;

    // A mapping is a key/value map. Here we store each account balance.
    mapping(address => uint256) public balances;

    struct Set {
        address[] values;
        mapping(address => bool) is_in;
    }

    Set tokenHolders;

    /**
     * Contract initialization.
     *
     * The `constructor` is executed only once when the contract is created.
     */
    function initialize(
        string calldata _symbol,
        string calldata _name,
        uint256 _totalSupply
    ) public initializer {
        // The totalSupply is assigned to transaction sender, which is the account
        // that is deploying the contract.
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply;
        owner = msg.sender;
        balances[msg.sender] = totalSupply;

        tokenHolders.values.push(owner);
    }

    /**
     * A function to transfer tokens.
     *
     * The `external` modifier makes a function *only* callable from outside
     * the contract.
     */
    function transfer(address to, uint256 amount) external {
        // Check if the transaction sender has enough tokens.
        // If `require`'s first argument evaluates to `false` then the
        // transaction will revert.
        require(balances[msg.sender] >= amount, "Not enough tokens");

        if (!tokenHolders.is_in[to]) {
            tokenHolders.values.push(to);
            tokenHolders.is_in[to] = true;
        }

        // Transfer the amount.
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    /**
     * Read only function to retrieve the token balance of a given account.
     *
     * The `view` modifier indicates that it doesn't modify the contract's
     * state, which allows us to call it without executing a transaction.
     */
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

    function getTokenHolders() external view returns (address[] memory) {
        return tokenHolders.values;
    }
}
