// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

struct Person {
  string name;
  uint256 favoriteNumber;
}

contract SimpleStorage {
  uint256 public singleFavoriteNumber;
  Person[] public listOfPeople;
  mapping(string => uint256) public nameToFavoriteNumber;

  function storeFavoriteNumber(uint256 _favoriteNumber) public {
    singleFavoriteNumber = _favoriteNumber;
  }

  function addPerson(string memory name, uint256 favoriteNumber) public {
    listOfPeople.push(Person(name, favoriteNumber));
    nameToFavoriteNumber[name] = favoriteNumber;
  }

  function retrieveFavoriteNumber() public view returns (uint256) {
    return singleFavoriteNumber;
  }
}
