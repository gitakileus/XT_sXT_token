const { expect } = require('chai')
const { parseEther, parseUnits } = require('ethers/lib/utils')
const { ethers } = require('hardhat')

let xtToken = null;
let sxtToken = null;
let usdt = null;

describe('Test', function () {
  it('Should return the deployed Supply', async () => {
    const XT = await ethers.getContractFactory('XTtoken')
    xtToken = await XT.deploy(parseEther('1000'))
    await xtToken.deployed()
    console.log('xtToken address has deployed to:', xtToken.address)

    expect(await xtToken.balanceOf(xtToken.address)).to.equal(
      parseEther('1000'),
    )

    const SXT = await ethers.getContractFactory('sXTtoken')
    sxtToken = await SXT.deploy(parseEther('100000000'))
    await sxtToken.deployed()
    console.log('sXToken address has deployed to', sxtToken.address)

    expect(await sxtToken.balanceOf(sxtToken.address)).to.equal(
      parseEther('100000000'),
    )

    const USDT = await ethers.getContractFactory('TetherToken')
    usdt = await USDT.deploy(parseUnits('1000', 6))
    await usdt.deployed()

    console.log('usdt token address has deployed to', usdt.address)

    expect(
      await usdt.balanceOf('0xd4be38b30fd6b336e4ac48866bbe2dffe66ab8b4'),
    ).to.equal('1000000000')

    await xtToken.setSXTAddress(sxtToken.address)
    console.log('sXT token conatract address: ', await xtToken.getSXTAddress())

    await xtToken.setTestUSDTAddress(usdt.address)
    console.log('usdt token contract address: ', await xtToken.getTestUSDTAddress())

    await sxtToken.setTestUSDTAddress(usdt.address)
  })

  it('set SXT token contract address in XT contract', async () => {
   
  })
})
