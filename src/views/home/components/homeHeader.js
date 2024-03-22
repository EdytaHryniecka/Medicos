import React from "react"
import { useTranslation, Link } from "gatsby-plugin-react-i18next"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/homeHeader.css"
import { StaticImage } from "gatsby-plugin-image"

const HomeHeader = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="home-h-container">
        <div className="container">
          <div className="h-con">
            <div className="left-con">
              <h1 className="h1-style">{t`home-header.title`}</h1>
              <p className="p-style">{t`home-header.description`}</p>
              <Link className="register-btn header-button">{t`home-header.ask`}</Link>
            </div>
            <StaticImage
              className="header-image"
              src="../../../images/menu/linkedIn.png"
              alt="Top image"
              placeholder="LinkedIn"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeHeader