import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import App from './App.jsx'
// some bootstrap required css and custom css file
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/custom.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* required provider wraper for redux */}
    <Provider store={store}>
      <App />
      {/* this is a holder for the toast notification */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <ToastContainer />
    </Provider>
  </StrictMode>,
)
