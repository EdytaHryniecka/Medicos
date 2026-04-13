// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.css"

// Highlighting for code blocks
import "prismjs/themes/prism.css"

import "@fontsource/rem/300.css"
import "@fontsource/rem/400.css"
import "@fontsource/rem/500.css"
import "@fontsource/rem/600.css"
import "@fontsource/rem/700.css"
import "@fontsource/rem/800.css"

export const shouldUpdateScroll = ({ prevRouterProps, routerProps }) => {
  if (!prevRouterProps) {
    return true
  }

  const prev = prevRouterProps.location
  const next = routerProps.location

  if (!prev || !next) {
    return true
  }

  if (prev.pathname === next.pathname && prev.search !== next.search) {
    return false
  }

  return true
}
