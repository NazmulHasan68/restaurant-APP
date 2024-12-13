import './App.css'
import Login from './auth/Login'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import MainLayout from './MainLayout'
import Signup from './auth/Signup'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'

const appRouter = createBrowserRouter([
  {
    path : '/',
    element : <MainLayout/>,
    children:[
      // {
      //   path 
      // }
    ]
  },
  {
    path : '/login',
    element : <Login/>
  },
  {
    path : '/signup',
    element : <Signup/>
  },
  {
    path : '/forgot-password',
    element : <ForgotPassword/>
  },
  {
    path : '/reset-password',
    element : <ResetPassword/>
  }
])
function App() {

  return (
    <main className=''>
      <RouterProvider router={appRouter}>

      </RouterProvider>
    </main>
  )
}

export default App
