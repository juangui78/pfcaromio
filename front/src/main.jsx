import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { ClerkProvider } from '@clerk/clerk-react'
import { Provider } from 'react-redux'
import store from "./redux/store"
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <ClerkProvider publishableKey='pk_test_Y2FyZWZ1bC1wYW5nb2xpbi0xMy5jbGVyay5hY2NvdW50cy5kZXYk'>
          <Auth0Provider
            domain='dev-v20zgz4whvsospn4.us.auth0.com'
            clientId='Ro5uKa0Q6PCtvNH1A9ll21G2qI45ZPE0'
            redirectUri={window.location.origin}>
            <App />
          </Auth0Provider>
        </ClerkProvider>
      </React.StrictMode>,
    </BrowserRouter>
  </Provider>
)