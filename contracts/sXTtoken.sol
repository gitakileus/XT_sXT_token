//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract sXTtoken is ERC20, Ownable {
  using SafeERC20 for IERC20;
  
  address private usdt_address = 0xdAC17F958D2ee523a2206206994597C13D831ec7;

  uint256 private XT_decimals = 18;
  uint256 private sXT_decimals = 18;
  uint256 private usdt_decimals = 6;

  constructor(uint256 _initialSupply) ERC20("sXTtoken", "sXT") {
    _mint(address(this), _initialSupply);
  }

  function swapFromUSDT(uint256 _usdtAmount) public {

    uint256 requiredSXT = _usdtAmount * 1000 * 10 ** sXT_decimals / 10 ** usdt_decimals;

    require(balanceOf(address(this)) >= requiredSXT, "contract's sXT token amount should be greater than request usdt amount * 1000");
    IERC20(usdt_address).transferFrom(msg.sender, address(this), _usdtAmount );
    IERC20(address(this)).transfer(msg.sender, requiredSXT);
  }

  function swapFromSXT(uint256 _sxtAmount) public {
    
    uint256 requiredUSDT = _sxtAmount * 10 ** usdt_decimals / 10 ** sXT_decimals / 1000;

    require(IERC20(usdt_address).balanceOf(address(this)) >= requiredUSDT, "constract usdt token amount should be greater than request sXT token amount");
    transferFrom(msg.sender, address(0), _sxtAmount);
    IERC20(usdt_address).transfer(msg.sender, requiredUSDT);
  }

  function setTestUSDTAddress(address _usdtAddress) external onlyOwner {
    usdt_address = _usdtAddress;
  }

  function getTestUSDTAddress() external view returns (address) {
    return usdt_address;
  }

  function mint(address _address, uint256 _amount) external onlyOwner {
    _mint(_address, _amount);
  }
}