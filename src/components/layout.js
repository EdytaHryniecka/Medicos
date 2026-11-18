import React, { useEffect } from "react"
import Menu from "./menu/menu"
import Footer from "./footer/footer"
import { useLayoutEffect } from "react"
import { useLocation } from "@reach/router"

export const SCROLL_RESET_DELAY = 100

const Layout = ({ children }) => {
  const location = useLocation()

  // Albacross
  useEffect(() => {
    if (typeof window !== "undefined") {
      const script1 = document.createElement("script")
      script1.innerHTML = 'window._nQc="89610872";'
      document.head.appendChild(script1)

      const script2 = document.createElement("script")
      script2.async = true
      script2.src = "https://serve.albacross.com/track.js"
      document.head.appendChild(script2)
    }
  }, [])

  useLayoutEffect(() => {
    const timeoutId = setTimeout(() => {
      if (window.scrollY > 0) {
        window.scrollTo(0, 0)
      }
    }, SCROLL_RESET_DELAY)

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
