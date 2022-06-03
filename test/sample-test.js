const { expect } = require('chai')
const { parseEther } = require('ethers/lib/utils')
const { ethers } = require('hardhat')

describe('Test', function () {
  it('Should return the deployed Supply', async () => {
    const XT = await ethers.getContractFactory('XTtoken')
    const xtToken = await XT.deploy(parseEther('1000'))
    await xtToken.deployed()
    console.log('xtToken address has deployed to:', xtToken.address)

    expect(await xtToken.balanceOf(xtToken.address)).to.equal(
      parseEther('1000'),
    )

    const SXT = await ethers.getContractFactory('sXTtoken')
    const sxtToken = await SXT.deploy(parseEther('100000000'))
    await sxtToken.deployed()
    console.log('sXToken address has deployed to', sxtToken.address)

    expect(await sxtToken.balanceOf(sxtToken.address)).to.equal(
      parseEther('100000000'),
    )

    const USDT = await ethers.getContractFactory('TetherToken')
    const usdt = await USDT.deploy(parseEther('1000'))
    await usdt.deployed()

    console.log('usdt token address has deployed to', usdt.address)

    expect(
      await usdt.balanceOf(0xd4be38b30fd6b336e4ac48866bbe2dffe66ab8b4),
    ).to.equal('1000000000')
  })

  it('set SXT token contract address in XT contract', async () => {
    await xtToken.setSXTAddress(sxtToken.address)
    expect(await xtToken.setSXTAddress(sxtToken.address)).to.equal(
      xtToken.getSXTAddress(),
    )
  })
})
