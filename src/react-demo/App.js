import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConfigureStore } from './redux/configureStore'
import { MsalProvider } from '@azure/msal-react'

import './App.css'
import CaseList from './components/Case/CaseList'
import UploadDocuments from './components/Case/UploadDocuments'

import { ErrorBoundary } from 'react-error-boundary'

const store = ConfigureStore()

function App({ msalInstance }) {
  return (
    <Provider store={store}>
      <MsalProvider instance={msalInstance}>
        <Pages />
      </MsalProvider>
    </Provider>
  )
}

const Pages = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <Routes>
        <Route path='/' element={<CaseList />} />
        <Route exact path='/caseList' element={<CaseList />} />
        <Route exact path='/uploadDocuments' element={<UploadDocuments />} />
      </Routes>
    </ErrorBoundary>
  )
}

const ErrorHandler = ({ error }) => {
  return (
    <div>
      <h3>Some thing wents wrong, Please Try Again</h3>
    </div>
  )
}
export default App
