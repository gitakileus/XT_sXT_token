//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract sXTtoken is ERC20, Ownable {
  address private usdt_address = 0xdAC17F958D2ee523a2206206994597C13D831ec7;

  uint256 private XT_decimals = 18;
  uint256 private sXT_decimals = 18;
  uint256 private usdt_decimals = 6;

  constructor(uint256 initialSupply) ERC20("sXTtoken", "sXT") {
    _mint(address(this), initialSupply);
  }

  function swapFromUSDT(uint256 usdtAmount) public {

    uint256 requiredSXT = usdtAmount * 1000 * 10 ** sXT_decimals / 10 ** usdt_decimals;

    require(balanceOf(address(this)) >= requiredSXT, "contract's sXT token amount should be greater than request usdt amount * 1000");
    IERC20(usdt_address).transferFrom(msg.sender, address(this), usdtAmount );
    IERC20(address(this)).transfer(msg.sender, requiredSXT);
  }

  function swapFromSXT(uint256 sxtAmount) public {
    
    uint256 requiredUSDT = sxtAmount * 10 ** usdt_decimals / 10 ** sXT_decimals / 1000;

    require(IERC20(usdt_address).balanceOf(address(this)) >= requiredUSDT, "constract usdt token amount should be greater than request sXT token amount");
    transferFrom(msg.sender, address(0), sxtAmount);
    IERC20(usdt_address).transfer(msg.sender, requiredUSDT);
  }

  function setTestUSDTAddress(address usdtAddress)  public onlyOwner {
    usdt_address = usdtAddress;
  }

  function getTestUSDTAddress()  public view returns (address) {
    return usdt_address;
  }
}