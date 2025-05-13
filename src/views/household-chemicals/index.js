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

const HouseholdChemicals = () => {
  const { t } = useTranslation()
  const { language } = useContext(I18nextContext)
  const data = useStaticQuery(graphql`
    query {
      allContentfulMaterials(
        filter: { category: { eq: "Chemia gospodarcza" } }
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
            householdChemicalsTytu1
            householdChemicalsOpis1 {
              raw
            }
            householdChemicalsTytu2
            householdChemicalsOpis2 {
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

  const titleDiscover = `${t`household-chemicals.discover.title`}`
  const descriptionDiscover = `${t`household-chemicals.discover.description`}`
  const materialQuery = "household-chemicals"

  const backgroundHeader = "hc-background"
  const imageApplication = () => (
    <StaticImage
      className="right-image"
      src="../../images/household-chemicals/application/material-hc-application.webp"
      alt="Right image"
      placeholder="Right image"
      loading="lazy"
    />
  )

  return (
    <Layout>
      <Seo
        title={t`seo.household-chemicals.title`}
        description={t`seo.household-chemicals.description`}
      />
      {textData && (
        <MaterialComponent
          backgroundHeader={backgroundHeader}
          titleHeader={textData.node.householdChemicalsTytu1}
          descriptionHeader={
            <div className="render-content">
              {renderRichText(
                textData.node.householdChemicalsOpis1,
                articleTextRenderOptions
              )}
            </div>
          }
          imageApplication={imageApplication}
          titleApplication={textData.node.householdChemicalsTytu2}
          descriptionApplication={
            <div className="render-content">
              {renderRichText(
                textData.node.householdChemicalsOpis2,
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
export default HouseholdChemicals
