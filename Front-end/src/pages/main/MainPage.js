import { useEthers } from '@usedapp/core'
import { parseEther } from 'ethers/lib/utils'
import AppLayout from 'pages/AppLayout'
import { useState } from 'react'
import {
  XTtokenAddress,
  SXTtokenAddress,
  usdtTokenAddress,
} from '../../contracts'
import {
  useGetSXTAddress,
  useGetUSDTAddress,
  useBuyUsdtToken,
  useBuyXTtoken,
  useUsdtApprove,
  useSellXTToken,
} from '../../hooks'

const MainPage = () => {
  // XT token control state variable
  const [SXTtokenAddress, setSXTtokenAddress] = useState('')
  const [USDTtokenAddress, setUSDTtokenAddress] = useState('')
  const [USDTtokenAmount, setUSDTtokenAmount] = useState(0)
  const [purchaseXTTokenAmount, setPurchaseXTTokenAmount] = useState(0)
  const [saleXTTokenAmount, setSaleXTTokenAmount] = useState(0)
  const [buySXTTokenAmount, setBuySXTTokenAmount] = useState(0)
  const [saleSXTTokenAmount, setSaleSXTTokenAmount] = useState(0)

  // declare hook
  const { account } = useEthers()
  const sXTtokenAddress = useGetSXTAddress()
  const usdtTokenAddress = useGetUSDTAddress()
  const [buyUsdtTokenState, buyUsdtTokenSend] = useBuyUsdtToken()
  const [approveState, approveUSDSend] = useUsdtApprove()
  const [buyXTtokenState, buyXTtokenSend] = useBuyXTtoken()
  const [sellXTtokenState, sellXTtokenSend] = useSellXTToken()

  // function to get sxt token address
  const getSXTtokenAddress = () => {
    setSXTtokenAddress(sXTtokenAddress)
  }

  // function to get usdt token address
  const getUSDTtokenAddress = () => {
    setUSDTtokenAddress(usdtTokenAddress)
  }

  // function to get usdt token to buy XT token
  const BuyUsdtToken = async () => {
    await buyUsdtTokenSend(
      '0xd4BE38B30FD6B336E4aC48866bbE2DFFe66ab8B4',
      account,
      USDTtokenAmount,
    )
  }

  // function to but XT token
  const BuyXTToken = async () => {
    await approveUSDSend(
      XTtokenAddress,
      parseEther((10 * purchaseXTTokenAmount).toString()),
    )

    const value = parseEther(purchaseXTTokenAmount.toString())

    await buyXTtokenSend(value)
  }

  // function to sell XT token
  const SellXTToken = async () => {
    const value = parseEther(saleXTTokenAmount.toString())
    await sellXTtokenSend(value)
  }

  return (
    <AppLayout>
      <div className="container mx-auto">
        <div className="flex items-center gap-8">
          {!SXTtokenAddress ? (
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={getSXTtokenAddress}
            >
              Get SXT Token Address
            </button>
          ) : (
            <a
              href={`https://rinkeby.etherscan.io/address/${SXTtokenAddress}`}
              target="_blank"
            >
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                SXT Token Address : {SXTtokenAddress}
              </button>
            </a>
          )}
          {!USDTtokenAddress ? (
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={getUSDTtokenAddress}
            >
              Get USDT Token Address
            </button>
          ) : (
            <a
              href={`https://rinkeby.etherscan.io/address/${USDTtokenAddress}`}
              target="_blank"
            >
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                USDT Token Address : {USDTtokenAddress}
              </button>
            </a>
          )}
        </div>
        <div className="mt-4">
          <div className="flex justify-center">
            <div className="mb-3 xl:w-96">
              <label
                for="exampleFormControlInput1"
                className="form-label inline-block mb-2 text-gray-700"
              >
                First, please input usdt token to buy XT token
              </label>
              <input
                type="number"
                className="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                placeholder="please input usdt token amount to buy XT token"
                value={USDTtokenAmount}
                onChange={(event) => {
                  let temp = event.target.value
                  setUSDTtokenAmount(temp < 0 ? 0 : temp)
                  setUSDTtokenAmount(temp > 1000 ? 1000 : temp)
                }}
              />
            </div>
            <div className="flex justify-center ml-4 mt-4 items-center">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-[40px] w-[200px] mt-2 mb-2"
                onClick={BuyUsdtToken}
              >
                <svg
                  className="w-5 h-5 mr-2 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                </svg>
                Buy USDT token.
              </button>
            </div>
          </div>
        </div>
        {/* XT token part */}
        <div className="mt-4 border border-sky-500 rounded-[10px]">
          <div className="flex justify-center mt-4">
            {/* XT token buy part */}
            <div>
              <div className="mb-3 xl:w-96">
                <label
                  for="exampleFormControlInput1"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  XT token amount to buy
                </label>
                <input
                  type="number"
                  className="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                  placeholder="please input xt token amount to buy"
                  value={purchaseXTTokenAmount}
                  onChange={(event) => {
                    let temp = event.target.value
                    setPurchaseXTTokenAmount(temp < 0 ? 0 : temp)
                  }}
                />
              </div>
              <div className="flex justify-center ml-4 mt-4 items-center">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-[40px] w-[200px] mb-2"
                  onClick={BuyXTToken}
                >
                  <svg
                    className="w-5 h-5 mr-2 -ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                  </svg>
                  Buy XT token.
                </button>
              </div>
            </div>

            {/* XT token sell part */}
            <div>
              <div className="mb-3 ml-3 xl:w-96">
                <label
                  for="exampleFormControlInput1"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  XT token amount to sell
                </label>
                <input
                  type="number"
                  className="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                  placeholder="please input xt token amount to sell"
                  value={saleXTTokenAmount}
                  onChange={(event) => {
                    let temp = event.target.value
                    setSaleXTTokenAmount(temp < 0 ? 0 : temp)
                  }}
                />
              </div>
              <div className="flex justify-center ml-4 mt-4 items-center">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-[40px] w-[200px]"
                  onClick={SellXTToken}
                >
                  <svg
                    className="w-5 h-5 mr-2 -ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                  </svg>
                  Sell XT token.
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* sXT token part */}
        <div className="mt-4 border border-sky-500 rounded-[10px]">
          {/* XT token buy part */}
          <div className="flex justify-center mt-4">
            <div>
              <div className="mb-3 xl:w-96">
                <label
                  for="exampleFormControlInput1"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  sXT token amount to buy
                </label>
                <input
                  type="number"
                  className="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                  placeholder="please input sxt token amount to buy"
                  value={buySXTTokenAmount}
                  onChange={(event) => {
                    let temp = event.target.value
                    setBuySXTTokenAmount(temp < 0 ? 0 : temp)
                  }}
                />
              </div>
              <div className="flex justify-center ml-4 mt-4 items-center">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-[40px] w-[200px] mb-2"
                >
                  <svg
                    className="w-5 h-5 mr-2 -ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                  </svg>
                  Buy sXT token.
                </button>
              </div>
            </div>

            {/* XT token sell part */}
            <div>
              <div className="mb-3 ml-3 xl:w-96">
                <label
                  for="exampleFormControlInput1"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  sXT token amount to sell
                </label>
                <input
                  type="number"
                  className="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                  placeholder="please input sxt token amount to buy"
                  value={saleSXTTokenAmount}
                  onChange={(event) => {
                    let temp = event.target.value
                    setSaleSXTTokenAmount(temp < 0 ? 0 : temp)
                  }}
                />
              </div>
              <div className="flex justify-center ml-4 mt-4 items-center">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-[40px] w-[200px]"
                >
                  <svg
                    className="w-5 h-5 mr-2 -ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                  </svg>
                  Sell sXT token.
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default MainPage
