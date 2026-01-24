import React from "react"
import { useTranslation, Link } from "gatsby-plugin-react-i18next"
import "../styles/aboutMission.css"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { articleTextRenderOptions } from "../../../utils/articleRenderOption"

const AboutMission = ({ textData }) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="about-m-container">
        <div className="container">
          <div className="missions-con">
            <div className="mission">
              <div className="mission-up">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <g clip-path="url(#clip0_487_5292)">
                    <path
                      d="M16.6666 20C16.6666 20.8841 17.0178 21.7319 17.6429 22.357C18.2681 22.9822 19.1159 23.3334 20 23.3334C20.884 23.3334 21.7319 22.9822 22.357 22.357C22.9821 21.7319 23.3333 20.8841 23.3333 20C23.3333 19.116 22.9821 18.2681 22.357 17.643C21.7319 17.0179 20.884 16.6667 20 16.6667C19.1159 16.6667 18.2681 17.0179 17.6429 17.643C17.0178 18.2681 16.6666 19.116 16.6666 20Z"
                      stroke="#4D8CE5"
                      stroke-width="2.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M35 20C31 26.6667 26 30 20 30C14 30 9 26.6667 5 20C9 13.3333 14 10 20 10C26 10 31 13.3333 35 20Z"
                      stroke="#4D8CE5"
                      stroke-width="2.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_487_5292">
                      <rect width="40" height="40" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <h4 className="h4-style">{textData.node.oNasNaszaWizjaTytu}</h4>
              </div>
              <div className="render-content">
                {renderRichText(
                  textData.node.oNasNaszaWizjaOpis,
                  articleTextRenderOptions
                )}
              </div>
            </div>
            <div className="mission">
              <div className="mission-up">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <g clip-path="url(#clip0_487_5429)">
                    <path
                      d="M18.3334 20C18.3334 20.442 18.509 20.8659 18.8215 21.1785C19.1341 21.4911 19.558 21.6666 20 21.6666C20.4421 21.6666 20.866 21.4911 21.1786 21.1785C21.4911 20.8659 21.6667 20.442 21.6667 20C21.6667 19.558 21.4911 19.134 21.1786 18.8215C20.866 18.5089 20.4421 18.3333 20 18.3333C19.558 18.3333 19.1341 18.5089 18.8215 18.8215C18.509 19.134 18.3334 19.558 18.3334 20Z"
                      stroke="#4D8CE5"
                      stroke-width="2.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.6666 20C11.6666 22.2102 12.5446 24.3298 14.1074 25.8926C15.6702 27.4554 17.7898 28.3334 20 28.3334C22.2101 28.3334 24.3297 27.4554 25.8925 25.8926C27.4553 24.3298 28.3333 22.2102 28.3333 20C28.3333 17.7899 27.4553 15.6703 25.8925 14.1075C24.3297 12.5447 22.2101 11.6667 20 11.6667C17.7898 11.6667 15.6702 12.5447 14.1074 14.1075C12.5446 15.6703 11.6666 17.7899 11.6666 20Z"
                      stroke="#4D8CE5"
                      stroke-width="2.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 20C5 21.9698 5.38799 23.9204 6.14181 25.7403C6.89563 27.5601 8.00052 29.2137 9.3934 30.6066C10.7863 31.9995 12.4399 33.1044 14.2597 33.8582C16.0796 34.612 18.0302 35 20 35C21.9698 35 23.9204 34.612 25.7403 33.8582C27.5601 33.1044 29.2137 31.9995 30.6066 30.6066C31.9995 29.2137 33.1044 27.5601 33.8582 25.7403C34.612 23.9204 35 21.9698 35 20C35 18.0302 34.612 16.0796 33.8582 14.2597C33.1044 12.4399 31.9995 10.7863 30.6066 9.3934C29.2137 8.00052 27.5601 6.89563 25.7403 6.14181C23.9204 5.38799 21.9698 5 20 5C18.0302 5 16.0796 5.38799 14.2597 6.14181C12.4399 6.89563 10.7863 8.00052 9.3934 9.3934C8.00052 10.7863 6.89563 12.4399 6.14181 14.2597C5.38799 16.0796 5 18.0302 5 20Z"
                      stroke="#4D8CE5"
                      stroke-width="2.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_487_5429">
                      <rect width="40" height="40" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <h4 className="h4-style">{textData.node.oNasNaszaMisjaTytu}</h4>
              </div>
              <div className="render-content">
                {renderRichText(
                  textData.node.oNasNaszaMisjaOpis,
                  articleTextRenderOptions
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutMission
