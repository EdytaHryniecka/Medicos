import React, { useContext, useEffect, useState } from "react"
import { I18nextContext, useTranslation } from "gatsby-plugin-react-i18next"
import "../styles/qsPolicy.css"
import { graphql, useStaticQuery, withPrefix } from "gatsby"
import getCurrentTranslations from "../../../components/contentful-translator"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { articleTextRenderOptions } from "../../../utils/articleRenderOption"

const QsPolicy = () => {
  const { t } = useTranslation()
  const { language } = useContext(I18nextContext)
  const data = useStaticQuery(graphql`
    query {
      allContentfulQualityPolicyFiles(sort: { createdAt: ASC }) {
        edges {
          node {
            node_locale
            title
            file {
              file {
                url
              }
            }
            showLink
            pageLink
            buttonText
            description {
              raw
            }
          }
        }
      }
    }
  `)

  const [files, setFiles] = useState()

  useEffect(() => {
    const getData = () => {
      const getFiles = getCurrentTranslations(
        data.allContentfulQualityPolicyFiles.edges,
        language
      )
      setFiles(getFiles)
    }
    getData()
  }, [data.allContentfulQualityPolicyFiles, language])

  const renderFiles = value => {
    return value.map((val, index) => (
      <a
        key={index}
        href={
          val.node.file
            ? withPrefix(`${val.node.file.file.url}`)
            : val.node.pageLink
        }
        target="_blank"
        className={val.node.showLink ? "policy" : "policy policy-disable"}
      >
        <div className="policy-up">
          <p className="h4-style">{val.node.title}</p>
          {val.node.description && (
            <div className="policy-desc">
              {renderRichText(val.node.description, articleTextRenderOptions)}
            </div>
          )}
        </div>
        {val.node.showLink && <a>{val.node.buttonText}</a>}
      </a>
    ))
  }

  return (
    <>
      <div className="qs-p-container">
        <div className="container">
          <h2 className="h2-style">{t`quality-standards-policy.title`}</h2>
          <div className="policy-con">{files && renderFiles(files)}</div>
        </div>
      </div>
    </>
  )
}

export default QsPolicy
