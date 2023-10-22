import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { Provider } from 'react-redux'
import store from "./redux/store"
import FontStyles from "./fontStyles";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <ClerkProvider publishableKey='pk_test_Y2FyZWZ1bC1wYW5nb2xpbi0xMy5jbGVyay5hY2NvdW50cy5kZXYk'>
          <FontStyles />
          <App />
        </ClerkProvider>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
)