import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
// require('dotenv').config();
import { PublicClientApplication, EventType } from '@azure/msal-browser'

import { BrowserRouter } from 'react-router-dom'
import { msalConfig } from './authConfig'

// TODO: adding token for auth the Azure AD.
export const msalInstance = new PublicClientApplication(msalConfig)

if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0])
}

msalInstance.addEventCallback(
  (event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
      msalInstance.setActiveAccount(event.payload.account)
    }
  },
  (error) => {
    console.log(error)
  }
)

// handle auth redired/do all initial setup for msal
msalInstance
  .handleRedirectPromise()
  .then((authResult) => {
    // Check if user signed in
    const account = msalInstance.getActiveAccount()
    // console.log('The user is here', account)
    if (!account) {
      // redirect anonymous user to login page
      msalInstance.loginRedirect()
    }
  })
  .catch((err) => {
    // TODO: Handle errors
    console.log(err)
  })

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App msalInstance={msalInstance} />
    </BrowserRouter>
  </React.StrictMode>
)

reportWebVitals()
