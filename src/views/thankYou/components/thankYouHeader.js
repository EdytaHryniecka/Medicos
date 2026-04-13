import React, { useContext } from "react"
import { useTranslation, I18nextContext } from "gatsby-plugin-react-i18next"
import "bootstrap/dist/css/bootstrap.min.css"
import "../../home/styles/homeHeader.css"
import { navigate } from "gatsby"
import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs"

const ThankYouHeader = () => {
  const { t } = useTranslation()
  const { language } = useContext(I18nextContext)

  const goToHome = () => {
    if (language === "en") {
      navigate("/en/")
    } else {
      navigate("/")
    }
  }

  return (
    <>
      <div className="home-h-container">
        <div className="container">
          <div className="h-con">
            <div className="left-con">
              <Breadcrumbs
                className="breadcrumbs--hero"
                items={[
                  { label: t`search-content.home`, to: "/" },
                  { label: t`typ-header.title-a` },
                ]}
              />
              <h1 className="h1-style">{t`typ-header.title-a`}</h1>
              <p className="p-style">{t`typ-header.description`}</p>
              <button
                onClick={() => goToHome()}
                className="register-btn header-button"
              >{t`typ-header.ask`}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ThankYouHeader
