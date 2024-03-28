import React from "react"
import { useTranslation, Link } from "gatsby-plugin-react-i18next"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/homeAbout.css"
import { StaticImage } from "gatsby-plugin-image"

const HomeAbout = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="home-a-container">
        <div className="container">
          <div className="a-con">
            <div className="left-con">
              <h1 className="h1-style">{t`home-about.title`}</h1>
              <p className="p-style">{t`home-about.description`}</p>
              <Link
                to="/about"
                className="register-btn about-button"
              >{t`home-about.more`}</Link>
            </div>
            <StaticImage
              className="about-image"
              src="../../../images/home/about/home-about-image.png"
              alt="About image"
              placeholder="About image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeAbout
