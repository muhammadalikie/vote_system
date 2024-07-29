import {createBrowserRouter, defer, Navigate} from "react-router-dom";
import App from "./App.tsx";
import {Error, UserDashboard, Login, AdminDashboard} from "./pages";
import AuthGuard from "./components/auth/AuthGuard.tsx";
import {verifyTokenService} from "./services/auth.ts";
import UserLayout from "./components/user/UserLayout.tsx";

const userLoader = () => defer({tokenPromise: verifyTokenService()})

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/dashboard/*',
        loader: userLoader,
        element: <AuthGuard><UserLayout><UserDashboard/></UserLayout></AuthGuard>
      },
      {
        path: '/admin/*',
        loader: userLoader,
        element: <AuthGuard><UserLayout><AdminDashboard/></UserLayout></AuthGuard>
      },
    ]
  }
])