import React from "react"
import "../styles/aboutFirm.css"
import { StaticImage } from "gatsby-plugin-image"
import { articleTextRenderOptions } from "../../../utils/articleRenderOption"
import { renderRichText } from "gatsby-source-contentful/rich-text"

const AboutFirm = ({ textData }) => {
  return (
    <>
      <div className="about-f-container">
        <div className="container">
          <div className="about-grid">
            <div className="text-con">
              <h2 className="h2-style">{textData.node.oNasTytu}</h2>
              <div className="render-content">
                {renderRichText(
                  textData.node.oNasOpis,
                  articleTextRenderOptions
                )}
              </div>
              <div className="images">
                <StaticImage
                  className="image"
                  src="../../../images/about/firm/pspkd.webp"
                  alt="PSPKD"
                  placeholder="PSPKD"
                  loading="lazy"
                />
                <StaticImage
                  className="image"
                  src="../../../images/about/firm/ptck.webp"
                  alt="PTCK"
                  placeholder="PTCK"
                  loading="lazy"
                />
                <StaticImage
                  className="image"
                  src="../../../images/about/firm/ifscc.webp"
                  alt="IFSCC"
                  placeholder="IFSCC"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="image-con">
              <StaticImage
                className="right-image"
                src="../../../images/about/firm/right-image.webp"
                alt="Right image"
                placeholder="Right image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutFirm
