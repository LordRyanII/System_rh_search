import { Navigate, Outlet } from "react-router-dom"

import NavBar from "../components/NavBar/NavBar"
import SideMenu from "../components/SideMenu/SideMenu"
import Header from "../components/header/Header"
import Container from "../components/container/Container"

export function ProtectedRoutes() {
  const auth = false

  return (!auth && <Navigate to="/login" />) || (
    <>
      <NavBar />
      <SideMenu />
      <Container>
        <Header />
        <br />
        <br />
        <Outlet />
      </Container>
    </>
  )
}