import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Rinkeby, DAppProvider } from '@usedapp/core'

const MainPage = lazy(() => import('../pages/main'))
const ErrorPage = lazy(() => import('../pages/error'))

const config = {
  readOnlyChainId: Rinkeby.chainId,
  readOnlyUrls: {
    [Rinkeby.chainId]: `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
  },
}

const AppRoutes = () => {
  return (
    <DAppProvider config={config}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route component={ErrorPage} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        autoDismiss={true}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        icon={true}
        theme={'colored'}
        pauseOnHover={false}
        rtl={false}
      />
    </DAppProvider>
  )
}

export default AppRoutes
