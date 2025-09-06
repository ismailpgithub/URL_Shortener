import { Outlet } from "@tanstack/react-router"
import LoginForm from "./components/LoginForm"
import AuthPage from "./pages/AuthPage"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"

const RootLayout = () => {

  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default RootLayout