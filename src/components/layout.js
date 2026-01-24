import React from "react"
import Menu from "./menu/menu"
import Footer from "./footer/footer"
import { useLayoutEffect } from "react"
import { useLocation } from "@reach/router"

const Layout = ({ children }) => {
  const location = useLocation()

  useLayoutEffect(() => {
    const timeoutId = setTimeout(() => {
      if (window.scrollY > 0) {
        window.scrollTo(0, 0)
      }
    }, 100)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [location.pathname])

  return (
    <>
      <Menu />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
