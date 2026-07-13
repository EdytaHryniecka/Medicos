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
import BreadcrumbSchema from "../../components/breadcrumbs/breadcrumbSchema"

const Food = () => {
  const { t } = useTranslation()
  const { language } = useContext(I18nextContext)
  const data = useStaticQuery(graphql`
    query {
      allContentfulMaterials(
        filter: { category: { eq: "Żywność i suplementy diety" } }
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
            foodAndSupplementsTytu1
            foodAndSupplementsOpis1 {
              raw
            }
            foodAndSupplementsTytu2
            foodAndSupplementsOpis2 {
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

  const titleDiscover = `${t`food-and-supplements.discover.title`}`
  const descriptionDiscover = `${t`food-and-supplements.discover.description`}`
  const materialQuery = "food-and-supplements"

  const backgroundHeader = "f-background"
  const breadcrumbItems = [
    { label: t`search-content.home`, to: "/" },
    { label: t`menu.raw-material-offer`, to: "/materials" },
    { label: t`materials-filter.food` },
  ]
  let alt =
    language === "pl"
      ? "Szklane kolby z kolorowymi płynami, miseczki z ziołami i proszkiem, kapsułki na białym blacie"
      : "Glass flasks containing coloured liquids, bowls with herbs and powder, and capsules on a white laboratory bench"

  const imageApplication = () => (
    <StaticImage
      className="right-image"
      src="../../images/food/application/material-f-application.webp"
      alt={alt}
      placeholder="Right image"
      loading="lazy"
    />
  )

  return (
    <Layout>
      <Seo
        title={t`seo.food-and-supplements.title`}
        description={t`seo.food-and-supplements.description`}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      {textData && (
        <MaterialComponent
          backgroundHeader={backgroundHeader}
          breadcrumbsItems={breadcrumbItems}
          titleHeader={textData.node.foodAndSupplementsTytu1}
          descriptionHeader={
            <div className="render-content">
              {renderRichText(
                textData.node.foodAndSupplementsOpis1,
                articleTextRenderOptions
              )}
            </div>
          }
          imageApplication={imageApplication}
          titleApplication={textData.node.foodAndSupplementsTytu2}
          descriptionApplication={
            <div className="render-content">
              {renderRichText(
                textData.node.foodAndSupplementsOpis2,
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
export default Food
