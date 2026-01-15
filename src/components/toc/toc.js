import React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import "./styles/toc.css"
const Toc = ({ items }) => {
  const [open, setOpen] = useState(true)
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      let currentId = ""
      for (const item of items) {
        const elem = document.getElementById(item.id)
        if (elem) {
          const top = elem.getBoundingClientRect().top
          if (top <= 80) {
            // offset od topu (np. header)
            currentId = item.id
          }
        }
      }
      setActiveId(currentId)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // inicjalne ustawienie

    return () => window.removeEventListener("scroll", handleScroll)
  }, [items])
  return (
    <div className={`toc ${open ? "open" : "closed"}`}>
      <button className="toc-toggle" onClick={() => setOpen(!open)}>
        <span> {t`news.article.toc`}</span>
        <span className={`toc-icon ${open ? "open" : ""}`}>
          <svg width="32" height="32" viewBox="0 0 32 32">
            <rect
              x="0.5"
              y="0.5"
              width="31"
              height="31"
              rx="15.5"
              fill="#FBFCFE"
            />
            <rect
              x="0.5"
              y="0.5"
              width="31"
              height="31"
              rx="15.5"
              stroke="#D3E2F8"
            />
            <path
              d="M21 15L16 10M16 10L11 15M16 10V22"
              stroke="#144487"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open && (
        <ul className="toc-list">
          {items.map(item => (
            <li
              key={item.id}
              className={`toc-item level-${item.level} ${
                activeId === item.id ? "active" : ""
              }`}
            >
              <a href={`#${item.id}`}>{item.text}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Toc
