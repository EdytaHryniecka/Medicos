import React, { useContext, useEffect, useState } from "react"
import { I18nextContext, useTranslation } from "gatsby-plugin-react-i18next"
import "../styles/qsPolicy.css"
import { graphql, useStaticQuery, withPrefix } from "gatsby"
import getCurrentTranslations from "../../../components/contentful-translator"

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
        href={withPrefix(`${val.node.file.file.url}`)}
        target="_blank"
        className="policy"
      >
        <div className="policy-up">
          <p className="h4-style">{val.node.title}</p>
        </div>
        <a>{t`qs-policy.see`}</a>
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
