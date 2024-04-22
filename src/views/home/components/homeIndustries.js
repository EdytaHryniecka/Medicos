import React, { useContext } from "react"
import {
  useTranslation,
  Link,
  I18nextContext,
} from "gatsby-plugin-react-i18next"
import "../styles/homeIndustries.css"
import Navigate from "../../../hooks/navigate"

const HomeIndustries = () => {
  const { t } = useTranslation()
  const { language } = useContext(I18nextContext)

  return (
    <>
      <div className="home-i-container">
        <div className="container">
          <div className="i-con">
            <div className="up-con">
              <h2 className="h2-style">{t`home-industries.title`}</h2>
              <p className="p-style">{t`home-industries.description`}</p>
              <Link
                to="/materials"
                className="register-btn industry-button"
              >{t`home-industries.all-materials`}</Link>
            </div>
            <div className="down-con">
              <div
                onClick={() => Navigate("household-chemicals", language)}
                className="industry household-chemicals"
              >
                <div className="industry-con">
                  <div className="h4-con">
                    <h4>{t`home-industries.household-chemicals`}</h4>
                  </div>
                  <p className="p-style">{t`home-industries.hc-description`}</p>
                </div>
                <Link
                  to="/household-chemicals"
                  className="register-btn industry-button"
                >{t`home-industries.material`}</Link>
              </div>
              <div
                onClick={() => Navigate("cosmetology", language)}
                className="industry cosmetology"
              >
                <div className="industry-con">
                  <div className="h4-con">
                    <h4>{t`home-industries.cosmetology`}</h4>
                  </div>
                  <p className="p-style">{t`home-industries.c-description`}</p>
                </div>
                <Link
                  to="/cosmetology"
                  className="register-btn industry-button"
                >{t`home-industries.material`}</Link>
              </div>
              <div
                onClick={() => Navigate("pharmacy", language)}
                className="industry pharmacy"
              >
                <div className="industry-con">
                  <div className="h4-con">
                    <h4>{t`home-industries.pharmacy`}</h4>
                  </div>
                  <p className="p-style">{t`home-industries.p-description`}</p>
                </div>
                <Link
                  to="/pharmacy"
                  className="register-btn industry-button"
                >{t`home-industries.material`}</Link>
              </div>
              <div
                onClick={() => Navigate("food-and-supplements", language)}
                className="industry food"
              >
                <div className="industry-con">
                  <div className="h4-con">
                    <h4>{t`home-industries.food`}</h4>
                  </div>
                  <p className="p-style">{t`home-industries.f-description`}</p>
                </div>
                <Link
                  to="/food"
                  className="register-btn industry-button"
                >{t`home-industries.material`}</Link>
              </div>
              <div
                onClick={() => Navigate("other-industries", language)}
                className="industry other-industries"
              >
                <div className="industry-con">
                  <div className="h4-con">
                    <h4>{t`home-industries.other-industries`}</h4>
                  </div>
                  <p className="p-style">{t`home-industries.oi-description`}</p>
                </div>
                <Link
                  to="/other-industries"
                  className="register-btn industry-button"
                >{t`home-industries.material`}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeIndustries
