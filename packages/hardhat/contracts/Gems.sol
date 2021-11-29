// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

/// @title Gems contract for space miners

contract Gems is ERC20PresetMinterPauser {

    constructor(address _gameContractAddress) ERC20PresetMinterPauser('GEMS', 'GEM') {
        _mint(msg.sender, 100000000*10**18);
        grantRole(MINTER_ROLE, _gameContractAddress);
    }

    /// @notice Used by SpaceMiners.sol contract to mint gems for players
    function mintGems(address _player, uint _amount) external {
        require(hasRole(MINTER_ROLE, msg.sender));
        _mint(_player, _amount);
    }
}