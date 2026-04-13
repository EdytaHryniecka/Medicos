import React from "react"
import { Link } from "gatsby-plugin-react-i18next"
import "./breadcrumbs.css"

const SeparatorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M5.58181 2.982C5.38181 3.182 5.26981 3.452 5.26981 3.734C5.26981 4.016 5.38181 4.286 5.58181 4.486L9.08781 7.992L5.58181 11.498C5.47981 11.596 5.39981 11.714 5.34381 11.844C5.28781 11.974 5.25781 12.114 5.25781 12.254C5.25781 12.396 5.28381 12.536 5.33781 12.666C5.39181 12.796 5.46981 12.916 5.56981 13.016C5.66981 13.116 5.78781 13.196 5.91981 13.248C6.04981 13.302 6.19181 13.328 6.33181 13.328C6.47381 13.328 6.61381 13.298 6.74181 13.242C6.86981 13.186 6.98981 13.106 7.08781 13.004L11.3458 8.746C11.5458 8.546 11.6578 8.276 11.6578 7.994C11.6578 7.712 11.5458 7.442 11.3458 7.242L7.08781 2.984C6.88781 2.784 6.61781 2.672 6.33581 2.672C6.05381 2.672 5.78381 2.784 5.58381 2.984L5.58181 2.982Z"
      fill="currentColor"
    />
  </svg>
)

const Breadcrumbs = ({ items = [], className = "" }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return null
  }

  return (
    <nav
      className={`breadcrumbs${className ? ` ${className}` : ""}`}
      aria-label="Breadcrumbs"
    >
      <ol className="breadcrumbs-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const label = item?.label || ""
          const to = item?.to

          return (
            <React.Fragment key={`${label}-${index}`}>
              <li className="breadcrumbs-item">
                {to && !isLast ? (
                  <Link className="breadcrumbs-link" to={to}>
                    {label}
                  </Link>
                ) : (
                  <span className="breadcrumbs-current" aria-current="page">
                    {label}
                  </span>
                )}
              </li>
              {!isLast && (
                <li className="breadcrumbs-separator" aria-hidden="true">
                  <SeparatorIcon />
                </li>
              )}
            </React.Fragment>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
