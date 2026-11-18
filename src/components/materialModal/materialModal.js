import React, { useContext } from "react"
import "./styles/materialModal.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Modal from "react-bootstrap/Modal"
import { I18nextContext } from "gatsby-plugin-react-i18next"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import QueryNavigate from "../../hooks/queryNavigate"
import { articleTextRenderOptions } from "../../utils/articleRenderOption"

const MaterialModal = ({ currentMaterial, showModal, closeModal, t }) => {
  const { language } = useContext(I18nextContext)

  const goToContact = () => {
    QueryNavigate("Chcę zapytać o dostępność surowca", "contact", language)
  }
  return (
    <Modal
      show={showModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="modal-xl material-modal"
      scrollable
    >
      <Modal.Header>
        <div className="left-header">
          <h3 className="h3-style">{currentMaterial.node.title}</h3>
          <div className="categories">
            {currentMaterial.node.category.map((cat, index) => (
              <div key={index}>
                {cat === "Chemia gospodarcza" && (
                  <div className="category hc-background">
                    <p className="p-style ">{t`materials-filter.household-chemicals`}</p>
                  </div>
                )}
                {cat === "Kosmetyka" && (
                  <div className="category cos-background">
                    <p className="p-style ">{t`materials-filter.cosmetology`}</p>
                  </div>
                )}
                {cat === "Farmacja" && (
                  <div className="category far-background">
                    <p className="p-style ">{t`materials-filter.pharmacy`}</p>
                  </div>
                )}
                {cat === "Żywność i suplementy diety" && (
                  <div className="category food-background">
                    <p className="p-style ">{t`materials-filter.food`}</p>
                  </div>
                )}
                {cat === "Pozostałe branże" && (
                  <div className="category oi-background">
                    <p className="p-style ">{t`materials-filter.other-industries`}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <svg
          onClick={closeModal}
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
        >
          <g clipPath="url(#clip0_594_2629)">
            <path
              d="M18.5 6.5L6.5 18.5"
              stroke="#144487"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.5 6.5L18.5 18.5"
              stroke="#144487"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_594_2629">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(0.5 0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      </Modal.Header>
      <Modal.Body>
        <div className="left-body">
          <div className="left-body-up">
            <p className="p-style">{t`material-modal.form`}</p>
            <button
              onClick={goToContact}
              className="register-btn"
              to="/contact"
            >{t`material-modal.ask`}</button>
          </div>
          <div className="left-body-down">
            <div>
              <p className="p-style p-name">{t`material-modal.inci`}</p>
              <p className="p-style p-description">
                {currentMaterial.node.inci}
              </p>
            </div>
            <div>
              <p className="p-style p-name">{t`material-modal.cas`}</p>
              <p className="p-style p-description">
                {currentMaterial.node.cas}
              </p>
            </div>
            <div>
              <p className="p-style p-name">{t`material-modal.form2`}</p>
              <p className="p-style p-description">
                {currentMaterial.node.form}
              </p>
            </div>
            <div>
              <p className="p-style p-name">{t`material-modal.color`}</p>
              <p className="p-style p-description">
                {currentMaterial.node.color}
              </p>
            </div>
            <div>
              <p className="p-style p-name">{t`material-modal.ph`}</p>
              <p className="p-style p-description">{currentMaterial.node.pH}</p>
            </div>
          </div>
        </div>
        <div className="right-body">
          <div className="title-right-body">
            <p className="p-style p-name">{t`material-modal.name`}</p>
            <h4 className="h4-style">{currentMaterial.node.title}</h4>
          </div>
          <div className="con-right-body">
            <h4 className="h4-style">{t`material-modal.info`}</h4>
            <div>
              {renderRichText(
                currentMaterial.node.generalInformation,
                articleTextRenderOptions
              )}
            </div>
          </div>
          <div className="con-right-body">
            <h4 className="h4-style">{t`material-modal.application`}</h4>
            <div>
              {renderRichText(
                currentMaterial.node.application,
                articleTextRenderOptions
              )}
            </div>
          </div>
          <div className="con-right-body">
            <h4 className="h4-style">{t`material-modal.more-info`}</h4>
            <p>
              {t`material-modal.more-info-description`}{" "}
              <a>{t`material-modal.more-info-email`}</a>
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default MaterialModal
