import React, { useEffect, useState, useContext } from "react"
import { useTranslation, I18nextContext } from "gatsby-plugin-react-i18next"
import "../styles/aboutPeople.css"
import { graphql, useStaticQuery } from "gatsby"
import getCurrentTranslations from "../../../components/contentful-translator"
import { articleTextRenderOptions } from "../../../utils/articleRenderOption"
import { renderRichText } from "gatsby-source-contentful/rich-text"

const AboutPeople = ({ textData }) => {
  const { t } = useTranslation()
  const { language } = useContext(I18nextContext)
  const data = useStaticQuery(graphql`
    query {
      allContentfulTeam(sort: { createdAt: ASC }) {
        edges {
          node {
            node_locale
            name
            education
            role
            description {
              description
            }
          }
        }
      }
    }
  `)

  const [team, setTeam] = useState()

  useEffect(() => {
    const getData = () => {
      const getTeam = getCurrentTranslations(
        data.allContentfulTeam.edges,
        language
      )

      setTeam(getTeam)
    }
    getData()
  }, [data.allContentfulTeam, language])

  const renderTeam = value => {
    return value.map((val, index) => (
      <div className="team" key={index}>
        <div className="text-up">
          <h4 className="h4-style">{val.node.name}</h4>
          <p className="p-style p-500">{val.node.education}</p>
          <p className="p-style">{val.node.role}</p>
        </div>
        <p className="p-style p-down">{val.node.description.description}</p>
      </div>
    ))
  }

  const title = textData.node.oNasZespTytu
  const parts = title.split(/(MEDICOS)/g)
  return (
    <>
      <div className="about-pe-container">
        <div className="container">
          <div className="con-up">
            <h2 className="h2-style">
              {parts.map((part, i) =>
                part === "MEDICOS" ? (
                  <span key={i} className="h2-medicos">
                    {part}
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </h2>
            <div className="render-content">
              {renderRichText(
                textData.node.oNasZespOpis,
                articleTextRenderOptions
              )}
            </div>
          </div>
          <div className="team-con">{team && renderTeam(team)}</div>
        </div>
      </div>
    </>
  )
}

export default AboutPeople
