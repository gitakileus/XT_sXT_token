const { parseEther } = require('ethers/lib/utils')

async function main() {
  // const XT = await hre.ethers.getContractFactory('XTtoken')
  // const xt = await XT.deploy(parseEther('1000'))

  // await xt.deployed()

  // console.log('XT token deployed to:', xt.address)

  const sXT = await hre.ethers.getContractFactory('sXTtoken')
  const sxt = await sXT.deploy(parseEther('100000000'))

  await sxt.deployed()
  console.log('sXT token deployed to:', sxt.address)

  // const USDT = await hre.ethers.getContractFactory('TetherToken')
  // const usdt = await USDT.deploy(parseEther('10000'))

  // await usdt.deployed()
  // console.log('usdt token deployed to:', usdt.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
