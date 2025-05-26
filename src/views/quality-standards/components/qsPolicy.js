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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <g clip-path="url(#clip0_525_3331)">
              <path
                d="M14.5 3V7C14.5 7.26522 14.6054 7.51957 14.7929 7.70711C14.9804 7.89464 15.2348 8 15.5 8H19.5"
                stroke="#4D8CE5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.5 21H7.5C6.96957 21 6.46086 20.7893 6.08579 20.4142C5.71071 20.0391 5.5 19.5304 5.5 19V5C5.5 4.46957 5.71071 3.96086 6.08579 3.58579C6.46086 3.21071 6.96957 3 7.5 3H14.5L19.5 8V19C19.5 19.5304 19.2893 20.0391 18.9142 20.4142C18.5391 20.7893 18.0304 21 17.5 21Z"
                stroke="#4D8CE5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_525_3331">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
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
          <h2 className="h2-style">{t`qs-policy.title`}</h2>
          <p className="p-style">{t`qs-policy.description`}</p>
          <div className="policy-con">{files && renderFiles(files)}</div>
        </div>
      </div>
    </>
  )
}

export default QsPolicy
