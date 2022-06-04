//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract XTtoken is ERC20, Ownable {
  using SafeERC20 for IERC20;

  address private usdt_address = 0x509e9613DdC6508F717341e013a222Acf684c11e;
  address private sXT_address = 0x0Bb34d8E5786cbECF6CC38651d32Bf2c765f0bA0;

  uint256 private XT_decimals = 18;
  uint256 private sXT_decimals = 18;
  uint256 private usdt_decimals = 6;

  constructor(uint256 _initialSupply) ERC20("XTtoken", "XT") {
    _mint(address(this), _initialSupply);
  }

  function buy(uint256 _xtTokenAmount) public {

    uint256 requiredUSDT = _xtTokenAmount * 10 * 10 ** usdt_decimals / 10 ** XT_decimals;
    uint256 requiredSXT = _xtTokenAmount * 1000;

    require(balanceOf(address(this)) >= _xtTokenAmount, "contract's token amount should be greater than request amount");

    IERC20(usdt_address).safeTransferFrom(msg.sender, address(this), requiredUSDT );

    require(IERC20(sXT_address).balanceOf(address(this)) >= requiredSXT, "contract's sXT token amount should be greater than request amount");
    IERC20(sXT_address).transfer(msg.sender, requiredSXT);
    _transfer(address(this), msg.sender, _xtTokenAmount);
  }

  function sale(uint256 _xtTokenAmount) public {

    uint256 requiredUSDT = _xtTokenAmount * 10 * 10 ** usdt_decimals / 10 ** XT_decimals;

    require(IERC20(usdt_address).balanceOf(address(this)) >= _xtTokenAmount*10, "contract's XT token amount should be greater than request amount");
    transfer(0x000000000000000000000000000000000000dEaD, _xtTokenAmount);
    IERC20(usdt_address).transfer(msg.sender, requiredUSDT);
  }

  function setSXTAddress(address _sXTAddress)  public onlyOwner {
    sXT_address = _sXTAddress;
  }

  function getSXTAddress() public view returns (address) {
    return sXT_address;
  }

  function setTestUSDTAddress(address _usdtAddress)  public onlyOwner {
    usdt_address = _usdtAddress;
  }

  function getTestUSDTAddress()  public view returns (address) {
    return usdt_address;
  }

  function mint(address _address, uint256 _amount) external onlyOwner {
    _mint(_address, _amount);
  }
}