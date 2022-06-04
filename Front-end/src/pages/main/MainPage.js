import { useEthers } from '@usedapp/core'
import { parseEther, parseUnits } from 'ethers/lib/utils'
import AppLayout from 'pages/AppLayout'
import { useState } from 'react'
import {
  XTtokenAddress,
  sxtTokenAddress,
  usdtTokenAddress,
} from '../../contracts'
import {
  useGetSXTAddress,
  useGetUSDTAddress,
  useBuyUsdtToken,
  useBuyXTtoken,
  useUsdtApprove,
  useSellXTToken,
  useSwapFromUSDT,
  useSwapFromSXT,
} from '../../hooks'

const MainPage = () => {
  // XT token control state variable
  const [SXTtokenAddress, setSXTtokenAddress] = useState('')
  const [USDTtokenAddress, setUSDTtokenAddress] = useState('')
  const [USDTtokenAmount, setUSDTtokenAmount] = useState(0)
  const [purchaseXTTokenAmount, setPurchaseXTTokenAmount] = useState(0)
  const [saleXTTokenAmount, setSaleXTTokenAmount] = useState(0)
  const [swapFromUSDT, setSwapFromUSDT] = useState(0)
  const [swapFromSXT, setSwapFromSXT] = useState(0)

  // declare hook
  const { account } = useEthers()
  const sXTtokenAddress = useGetSXTAddress()
  const usdtTokenAddress = useGetUSDTAddress()
  const [buyUsdtTokenState, buyUsdtTokenSend] = useBuyUsdtToken()
  const [approveUSDState, approveUSDSend] = useUsdtApprove()
  const [buyXTtokenState, buyXTtokenSend] = useBuyXTtoken()
  const [sellXTtokenState, sellXTtokenSend] = useSellXTToken()
  const [swapFromUSDTState, swapFromUSDTSend] = useSwapFromUSDT()
  const [swapFromSXTState, swapFromSXTSend] = useSwapFromSXT()

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

  // function to buy sXT token
  const SwapFromUSDT = async () => {
    const valueOne = parseUnits((10000 * swapFromUSDT).toString(), 6)
    await approveUSDSend(sxtTokenAddress, valueOne)
    const value = parseUnits(swapFromUSDT.toString(), 6)
    await swapFromUSDTSend(value)
  }

  const SwapFromSXT = async () => {
    const value = parseEther(swapFromSXT.toString())
    await swapFromSXTSend(value)
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
                    width="32px"
                    height="32px"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#fff"
                    className="mr-1"
                  >
                    <path d="M 2 7 L 2 24 L 30 24 L 30 7 L 2 7 z M 6 9 L 26 9 C 26 10.105 26.895 11 28 11 L 28 20 C 26.895 20 26 20.895 26 22 L 6 22 C 6 20.895 5.105 20 4 20 L 4 11 C 5.105 11 6 10.105 6 9 z M 15 11 C 15 12.439 14.439 13 13 13 L 13 15 C 13.775751 15 14.436786 14.848831 15 14.587891 L 15 20 L 17 20 L 17 11 L 15 11 z M 8.5 14 C 7.672 14 7 14.672 7 15.5 C 7 16.328 7.672 17 8.5 17 C 9.328 17 10 16.328 10 15.5 C 10 14.672 9.328 14 8.5 14 z M 23.5 14 C 22.672 14 22 14.672 22 15.5 C 22 16.328 22.672 17 23.5 17 C 24.328 17 25 16.328 25 15.5 C 25 14.672 24.328 14 23.5 14 z" />
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
                  USDT token amount to swap
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
                  value={swapFromUSDT}
                  onChange={(event) => {
                    let temp = event.target.value
                    setSwapFromUSDT(temp < 0 ? 0 : temp)
                  }}
                />
              </div>
              <div className="flex justify-center ml-4 mt-4 items-center">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-[40px] w-[200px] mb-2"
                  onClick={SwapFromUSDT}
                >
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#fff"
                    className="mr-2"
                  >
                    <g>
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M19.375 15.103A8.001 8.001 0 0 0 8.03 5.053l-.992-1.737A9.996 9.996 0 0 1 17 3.34c4.49 2.592 6.21 8.142 4.117 12.77l1.342.774-4.165 2.214-.165-4.714 1.246.719zM4.625 8.897a8.001 8.001 0 0 0 11.345 10.05l.992 1.737A9.996 9.996 0 0 1 7 20.66C2.51 18.068.79 12.518 2.883 7.89L1.54 7.117l4.165-2.214.165 4.714-1.246-.719zM8.5 14H14a.5.5 0 1 0 0-1h-4a2.5 2.5 0 1 1 0-5h1V7h2v1h2.5v2H10a.5.5 0 1 0 0 1h4a2.5 2.5 0 1 1 0 5h-1v1h-2v-1H8.5v-2z" />
                    </g>
                  </svg>
                  Swap
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
                  sXT token amount to swap
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
                  step={1000}
                  value={swapFromSXT}
                  onChange={(event) => {
                    let temp = event.target.value
                    setSwapFromSXT(temp < 0 ? 0 : temp)
                  }}
                />
              </div>
              <div className="flex justify-center ml-4 mt-4 items-center">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-[40px] w-[200px]"
                  onClick={SwapFromSXT}
                >
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#fff"
                    className="mr-2"
                  >
                    <g>
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M19.375 15.103A8.001 8.001 0 0 0 8.03 5.053l-.992-1.737A9.996 9.996 0 0 1 17 3.34c4.49 2.592 6.21 8.142 4.117 12.77l1.342.774-4.165 2.214-.165-4.714 1.246.719zM4.625 8.897a8.001 8.001 0 0 0 11.345 10.05l.992 1.737A9.996 9.996 0 0 1 7 20.66C2.51 18.068.79 12.518 2.883 7.89L1.54 7.117l4.165-2.214.165 4.714-1.246-.719zM8.5 14H14a.5.5 0 1 0 0-1h-4a2.5 2.5 0 1 1 0-5h1V7h2v1h2.5v2H10a.5.5 0 1 0 0 1h4a2.5 2.5 0 1 1 0 5h-1v1h-2v-1H8.5v-2z" />
                    </g>
                  </svg>
                  Swap
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
