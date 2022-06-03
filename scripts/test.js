const main = async () => {
  const xtContractFactory = await hre.ethers.getContractFactory('XTtoken')
  const xtContract = await xtContractFactory.deploy(1000)
  await xtContract.deployed()
  console.log('XT Contract deployed to:', xtContract.address)

  const sxtContractFactory = await hre.ethers.getContractFactory('sXTtoken')
  const sxtContract = await sxtContractFactory.deploy(1000000)
  await sxtContract.deployed()
  console.log('sXT Contract deployed to :', sxtContract.address)

  await xtContract.setSXTAddress(sxtContract.address)

  let buytokenAmount = 10 ** 18
  xtContract.buy(buytokenAmount)
}

const runMain = async () => {
  try {
    await main()
    process.exit(0) // exit Node process without error
  } catch (error) {
    console.log(error)
    process.exit(1) // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
  // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
}

runMain()
