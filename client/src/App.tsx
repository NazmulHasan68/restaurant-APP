import "./App.css";
import Login from "./auth/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import HeroSection from "./components/HeroSection";
import MainLayout from "./Layout/MainLayout";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";
import Restaurant from "./components/Restaurant";
import Cart from "./components/Cart";
import RestaurantAdmin from "./admin/Restaurant";
import AddMenu from "./admin/AddMenu";
import Orders from "./admin/Orders";
import Success from "./components/Success";
import { useUserStore } from "./store/useUserStore";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Loading from "./components/ui/Loading";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
console.log(user);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};


const AdminRoute = ({children}:{children:React.ReactNode})=>{
  const {user, isAuthenticated} = useUserStore()
  if(!isAuthenticated){
    return <Navigate to='/login' replace/>
  }
  if(!user?.admin){
    return <Navigate to='/' replace/>
  }
  return children
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <HeroSection />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search/:text",
        element: <SearchPage />,
      },
      {
        path: "/restaurant/:id",
        element: <Restaurant />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/status",
        element: <Success />,
      },
      //admin services start from here
      {
        path: "/admin/restaurant",
        element: <AdminRoute><RestaurantAdmin /></AdminRoute>,
      },
      {
        path: "/admin/menu",
        element: <AdminRoute><AddMenu /></AdminRoute>,
      },
      {
        path: "/admin/orders",
        element:<AdminRoute><Orders /></AdminRoute>,
      },
    ],
  },

  {
    path: "/login",
    element: (
      <AuthenticatedUser>
        <Login />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthenticatedUser>
        <Signup />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthenticatedUser>
        <ForgotPassword />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);

function App() {

  const {checkAuthentication, isCheckingAuth} = useUserStore()
  console.log(isCheckingAuth);

  useEffect(()=>{
    checkAuthentication()
  },[])

  if(isCheckingAuth){
    return <Loading/>
  }
  return (
    <main className="">

      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  );
}

export default App;
