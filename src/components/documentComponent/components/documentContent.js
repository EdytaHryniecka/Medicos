import React from "react"
import "../styles/documentContent.css"
import { articleTextRenderOptions } from "../../../utils/articleRenderOption"
import moment from "moment"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import Breadcrumbs from "../../breadcrumbs/breadcrumbs"
import { useTranslation } from "gatsby-plugin-react-i18next"

const DocumentContent = ({
  documentDate,
  documentTitle,
  documentDescription,
  textLastUpdate,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="document-c-container">
        <div className="container">
          <div className="breadcrumbs-inline">
            <Breadcrumbs
              items={[
                { label: t`search-content.home`, to: "/" },
                { label: documentTitle },
              ]}
            />
          </div>
          <div className="title-con">
            <p className="p-style">
              {textLastUpdate} {moment(documentDate).format("DD/MM/YYYY HH:MM")}
            </p>
            <h2 className="h2-style">{documentTitle}</h2>
          </div>
          <div className="description-con">
            {renderRichText(documentDescription, articleTextRenderOptions)}
          </div>
        </div>
      </div>
    </>
  )
}

export default DocumentContent
