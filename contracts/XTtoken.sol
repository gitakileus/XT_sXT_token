//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract XTtoken is ERC20, Ownable {
  address private usdt_address = 0xdAC17F958D2ee523a2206206994597C13D831ec7;
  address private sXT_address = 0x5F2f371F7298D50180B950389817F76a63e10512;

  uint256 private XT_decimals = 18;
  uint256 private sXT_decimals = 18;
  uint256 private usdt_decimals = 6;

  constructor(uint256 initialSupply) ERC20("XTtoken", "XT") {
    _mint(address(this), initialSupply);
  }

  function buy(uint256 tokenAmount) public {

    uint256 requiredUSDT = tokenAmount * 10 * 10 ** usdt_decimals / 10 ** XT_decimals;
    uint256 requiredSXT = tokenAmount * 1000;

    require(balanceOf(address(this)) >= tokenAmount, "contract's token amount should be greater than request amount");

    IERC20(usdt_address).transferFrom(msg.sender, address(this), requiredUSDT );

    require(IERC20(sXT_address).balanceOf(address(this)) >= 1000 * tokenAmount, "contract's sXT token amount should be greater than request amount");
    IERC20(sXT_address).transfer(msg.sender, requiredSXT);
    transfer(msg.sender, tokenAmount);
  }

  function sale(uint256 tokenAmount) public {

    uint256 requiredUSDT = tokenAmount * 10 * 10 ** usdt_decimals / 10 ** XT_decimals;

    require(IERC20(usdt_address).balanceOf(address(this)) >= tokenAmount*10, "contract's XT token amount should be greater than request amount");
    transferFrom(msg.sender, address(0), tokenAmount);
    IERC20(usdt_address).transfer(msg.sender, requiredUSDT);
  }

  function setSXTAddress(address sXTAddress)  public onlyOwner {
    sXT_address = sXTAddress;
  }

  function getSXTAddress() public view returns (address) {
    return sXT_address;
  }

  function setTestUSDTAddress(address usdtAddress)  public onlyOwner {
    usdt_address = usdtAddress;
  }

  function getTestUSDTAddress()  public view returns (address) {
    return usdt_address;
  }
}