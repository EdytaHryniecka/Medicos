import React, { useState, useEffect, useContext } from "react"
import Seo from "../../components/seo"
import { useTranslation, I18nextContext } from "gatsby-plugin-react-i18next"
import Layout from "../../components/layout"
import MaterialComponent from "../../components/materialComponent/materialComponent"
import { StaticImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"
import getCurrentTranslations from "../../components/contentful-translator"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { articleTextRenderOptions } from "../../utils/articleRenderOption"

const OtherIndustries = () => {
  const { t } = useTranslation()
  const { language } = useContext(I18nextContext)
  const data = useStaticQuery(graphql`
    query {
      allContentfulMaterials(
        filter: { category: { eq: "Pozostałe branże" } }
        sort: { createdAt: ASC }
        limit: 6
      ) {
        edges {
          node {
            category
            color
            node_locale
            pH
            title
            inci
            cas
            form
            generalInformation {
              raw
            }
            application {
              raw
            }
          }
        }
      }
      allContentfulTextOnTheRawMaterialsPages {
        edges {
          node {
            node_locale
            otherIndustriesTytu1
            otherIndustriesOpis1 {
              raw
            }
            otherIndustriesTytu2
            otherIndustriesOpis2 {
              raw
            }
          }
        }
      }
    }
  `)
  const [materials, setMaterials] = useState()
  const [textData, setTextData] = useState()

  useEffect(() => {
    const getData = () => {
      const getMaterials = getCurrentTranslations(
        data.allContentfulMaterials.edges,
        language
      )

      setMaterials(getMaterials)
    }
    getData()
  }, [data.allContentfulMaterials, language])

  useEffect(() => {
    const getData = () => {
      const getTextData = getCurrentTranslations(
        data.allContentfulTextOnTheRawMaterialsPages.edges,
        language
      )
      setTextData(getTextData[0])
    }
    getData()
  }, [data.allContentfulTextOnTheRawMaterialsPages, language])

  const titleDiscover = `${t`other-industries.discover.title`}`
  const descriptionDiscover = `${t`other-industries.discover.description`}`
  const materialQuery = "other-industries"

  const backgroundHeader = "oi-background"
  const imageApplication = () => (
    <StaticImage
      className="right-image"
      src="../../images/other-industries/application/material-oi-application.webp"
      alt="Right image"
      placeholder="Right image"
      loading="lazy"
    />
  )

  return (
    <Layout>
      <Seo
        title={t`seo.other-industries.title`}
        description={t`seo.other-industries.description`}
      />
      {textData && (
        <MaterialComponent
          backgroundHeader={backgroundHeader}
          titleHeader={textData.node.otherIndustriesTytu1}
          descriptionHeader={
            <div className="render-content">
              {renderRichText(
                textData.node.otherIndustriesOpis1,
                articleTextRenderOptions
              )}
            </div>
          }
          imageApplication={imageApplication}
          titleApplication={textData.node.otherIndustriesTytu2}
          descriptionApplication={
            <div className="render-content">
              {renderRichText(
                textData.node.otherIndustriesOpis2,
                articleTextRenderOptions
              )}
            </div>
          }
          materialDiscover={materials}
          titleDiscover={titleDiscover}
          descriptionDiscover={descriptionDiscover}
          t={t}
          materialQuery={materialQuery}
        />
      )}
    </Layout>
  )
}
export default OtherIndustries
