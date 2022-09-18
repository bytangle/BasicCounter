// SPDX-License-Identifier: GPL-3.0

pragma solidity >= 0.8.0 < 0.9.0;

/**
 * @title Counter - basic counter
 * @author Edicha Joshua <mredichaj@gmail.com>
 */
contract BasicCounter {
    address private _dev;
    mapping(address => uint) private _values;

    /// @dev emit whenever value changes
    /// @param _newValue latest value
    event ValueChanged(uint _newValue);

    constructor() {
        _dev = msg.sender;
    }

    /// @notice increae value by 1
    function increase() public {
        increaseBy(1);
    }

    /// @notice increase value by a given number
    /// @dev Check for overflow conditions before adding
    /// @param _value number to add to value
    function increaseBy(uint _value) public {
        require(type(uint).max > _values[msg.sender] + _value);
        _values[msg.sender] += _value;

        emit ValueChanged(_values[msg.sender]); // emit event
    }

    /// @notice decrease value by 1
    function decrease() public {
        decreaseBy(1);
    }

    /// @notice decrease value by a given number
    /// @dev check for underflow conditions before subtracting 
    /// @param _value number to subtract from value
    function decreaseBy(uint _value) public {
        require(type(uint).min < _values[msg.sender] - _value);
        _values[msg.sender] -= _value;

        emit ValueChanged(_values[msg.sender]); // emit event
    }

    /// @notice reset value
    function reset() public {
        delete _values[msg.sender]; // set value to zero

        emit ValueChanged(_values[msg.sender]); // emit event
    }

    function set(uint _value) public {
        require(_values[msg.sender] == 0); // can only set the value to any number if the value is zero
        require(_value < type(uint).max && _value > type(uint).min); // guard overflow and underflow conditions

        _values[msg.sender] = _value;
    }

    /// get value
    /// @return the current value
    function get() public view returns (uint) {
        return _values[msg.sender];
    }

}