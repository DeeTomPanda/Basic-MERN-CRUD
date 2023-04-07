import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './../store/store'
import { 
	createBrowserRouter,
	RouterProvider
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import Register from './../components/Register'
import Home from './../components/Home'
import axios from 'axios'
import './index.css'

const router=createBrowserRouter([
	{
	 path:'/home',
	 element:<Home/>},
	{
	 path:'/',
	 element:<App/>},
	{
	 path:'/register',
	 element:<Register/>
	}
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
       <Provider store={store}>
          <RouterProvider router={router} />
       </Provider>
    </ChakraProvider>
  </React.StrictMode>,
)

axios.interceptors.request.use(
	req=>{
		if( req.url.includes('add') || req.url.includes('edit') || req.url.includes('delete')  ){
			const token=store.getState().token
			req.headers.Authorization=token
			return req}
		else
			return req
	})

