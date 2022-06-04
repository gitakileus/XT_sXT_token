import {
  ERC20Interface,
  useCall,
  useContractCalls,
  useContractFunction,
  useEthers,
  useTokenList,
} from '@usedapp/core'
import { Contract, ethers } from 'ethers'

import XTtoken from '../abi/XTtoken.json'
import SXTtoken from '../abi/sXTtoken.json'
import UsdtToken from '../abi/TetherToken.json'

import { XTtokenAddress, sxtTokenAddress, usdtTokenAddress } from '../contracts'

const XTtokenInterface = new ethers.utils.Interface(XTtoken.abi)
const XTtokenContract = new Contract(XTtokenAddress, XTtokenInterface)

const SXTtokenInterface = new ethers.utils.Interface(SXTtoken.abi)
const SXTtokenContract = new Contract(sxtTokenAddress, SXTtokenInterface)

const UsdtTokenInterface = new ethers.utils.Interface(UsdtToken.abi)
const UsdtTokenContract = new Contract(usdtTokenAddress, UsdtTokenInterface)

export const useTokensBalance = (tokenList, account) => {
  return useContractCalls(
    tokenList && account
      ? tokenList.map((token) => ({
          abi: ERC20Interface,
          address: token.address,
          method: 'balanceOf',
          args: [account],
        }))
      : [],
  )
}

// First Function to get USDT token to buy XT token
export const useBuyUsdtToken = () => {
  const { state, send } = useContractFunction(
    UsdtTokenContract,
    'transferFrom',
    {
      transactionName: 'Buy Usdt Token',
    },
  )

  return [state, send]
}

// Second Function to Approve to buy XT token
export const useUsdtApprove = () => {
  const { state, send } = useContractFunction(UsdtTokenContract, 'approve')
  return [state, send]
}

// Third Function to buy XT token
export const useBuyXTtoken = () => {
  const { state, send } = useContractFunction(XTtokenContract, 'buy')
  return [state, send]
}

// Function to sell XT token
export const useSellXTToken = () => {
  const { state, send } = useContractFunction(XTtokenContract, 'sale')
  return [state, send]
}

// Function to swap from usdt to sXT token
export const useSwapFromUSDT = () => {
  const { state, send } = useContractFunction(SXTtokenContract, 'swapFromUSDT')
  return [state, send]
}

// Function to swap from sXT to usdt
export const useSwapFromSXT = () => {
  const { state, send } = useContractFunction(SXTtokenContract, 'swapFromSXT')
  return [state, send]
}

// Function to get amount of XT Token in XT Token Contract
export const useGetTokenAmount = (address) => {
  const { value, error } =
    useCall(
      address && {
        contract: XTtokenContract, // instance of called contract
        method: 'balanceOf', // Method to be called in conctract
        args: [address], // Method arguments - XT token amount to change
      },
    ) ?? {}

  if (error) {
    console.log(error)
    return undefined
  }

  return value?.[0]
}

// Funtion to get amount of SXT token in XT Token Contract
export const useGetSXTAddress = () => {
  const { value, error } =
    useCall({
      contract: XTtokenContract, // instance of callled contract
      method: 'getSXTAddress', // Method to be called in contract
      args: [],
    }) ?? {}

  if (error) {
    console.log(error)
    return undefined
  }

  return value?.[0]
}

// Function to get amount of USDT token in XT Token Contract
export const useGetUSDTAddress = () => {
  const { value, error } =
    useCall({
      contract: XTtokenContract, // instance of callled contract
      method: 'getTestUSDTAddress', // Method to be called in contract
      args: [],
    }) ?? {}

  if (error) {
    console.log(error)
    return undefined
  }

  return value?.[0]
}
