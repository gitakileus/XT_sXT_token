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
import usdtToken from '../abi/TetherToken.json'

const XTtokenAddress = '0xF5046f94684e87C69eB4b1eF8699352DD9441183'
const SXTtokenAddress = '0x2E38a245C8CcbC8cF4e2810f28d0c65A193557D1'
const usdtTokenAddress = '0xf3Faedc6319C8bd7fA2C1688e72c9EABb6ba5a57'

const XTtokenInterface = new ethers.utils.Interface(XTtoken.abi)
const XTtokenContract = new Contract(XTtokenAddress, XTtokenInterface)

const SXTtokenInterface = new ethers.utils.Interface(SXTtoken.abi)
const SXTtokenContract = new Contract(SXTtokenAddress, SXTtokenInterface)

const usdtTokenInterface = new ethers.utils.Interface(usdtToken.abi)
const usdtTokenContract = new Contract(usdtTokenInterface, usdtToken)

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

export const useBuy = (XTtokenAmount) => {
  const { state, send } = useContractFunction(XTtokenContract, 'buy', {
    transactionName: 'buy',
  })
  return [state, send]
}

export const useSale = (XTtokenAmount) => {
  const { state, send } = useContractFunction(XTtokenAmount, 'sale', {
    transactionName: 'sale',
  })
  return [state, send]
}

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

export const useGetusdtTokenAddress = () => {
  const { value, error } =
    useCall({
      contract: XTtokenContract, // instance of called contract
      method: 'getTestUSDTAddress', // Method to be called in contract
      args: [],
    }) ?? {}

  if (error) {
    console.log(error)
    return undefined
  }

  return value?.[0]
}
