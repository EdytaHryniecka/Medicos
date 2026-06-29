import React from "react"
import { useTranslation, Link, useI18next } from "gatsby-plugin-react-i18next"
import "../styles/homeAbout.css"
import { StaticImage } from "gatsby-plugin-image"

const HomeAbout = () => {
  const { t } = useTranslation()
  const { language } = useI18next()
  let alt =
    language === "pl"
      ? "Szklana aparatura laboratoryjna z kolorowymi odczynnikami chemicznymi"
      : "Glass laboratory apparatus with coloured chemical reagents"

  return (
    <>
      <div className="home-a-container">
        <div className="container">
          <div className="a-con">
            <div className="left-con">
              <h2 className="h1-style">{t`home-about.title`}</h2>
              <p className="p-style">{t`home-about.description`}</p>
              <Link
                to="/about"
                className="register-btn about-button"
              >{t`home-about.more`}</Link>
            </div>
            <StaticImage
              className="about-image"
              src="../../../images/home/about/home-about-image.webp"
              alt={alt}
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
