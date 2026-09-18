import React, { useState, useEffect, useContext } from "react"
import Seo from "../../components/seo"
import { useTranslation, I18nextContext } from "gatsby-plugin-react-i18next"
import Layout from "../../components/layout"
import { graphql, useStaticQuery } from "gatsby"
import getCurrentTranslations from "../../components/contentful-translator"
import BreadcrumbSchema from "../../components/breadcrumbs/breadcrumbSchema"
import MaterialDiscover from "../../components/materialComponent/components/materialDiscover"
import CosmetologyHero from "./components/cosmetologyHero"
import CosmetologyStats from "./components/cosmetologyStats"
import CosmetologyChallenges from "./components/cosmetologyChallenges"
import CosmetologyFormulationGuide from "./components/cosmetologyFormulationGuide"
import CosmetologyProcessSteps from "./components/cosmetologyProcessSteps"
import CosmetologyWhyMedicos from "./components/cosmetologyWhyMedicos"
import CosmetologySampleForm from "./components/cosmetologySampleForm"

const SAMPLE_FORM_ID = "cosmetology-sample-form"

const Cosmetology = () => {
  const { t } = useTranslation()
  const { language } = useContext(I18nextContext)
  const [formTab, setFormTab] = useState("sample")
  const data = useStaticQuery(graphql`
    query {
      allContentfulMaterials(
        filter: { category: { eq: "Kosmetyka" } }
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
    }
  `)
  const [materials, setMaterials] = useState()

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

  const titleDiscover = `${t`cosmetology.discover.title`}`
  const descriptionDiscover = `${t`cosmetology.discover.description`}`
  const materialQuery = "cosmetology"

  const breadcrumbItems = [
    { label: t`search-content.home`, to: "/" },
    { label: t`menu.raw-material-offer`, to: "/materials" },
    { label: t`materials-filter.cosmetology` },
  ]

  const goToForm = tab => {
    setFormTab(tab)
    const el = document.getElementById(SAMPLE_FORM_ID)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <Layout>
      <Seo
        title={t`seo.cosmetology.title`}
        description={t`seo.cosmetology.description`}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <CosmetologyHero breadcrumbsItems={breadcrumbItems} onCtaClick={goToForm} />
      <CosmetologyStats />
      <CosmetologyChallenges />
      <CosmetologyFormulationGuide onCtaClick={goToForm} />
      {materials && (
        <MaterialDiscover
          materialDiscover={materials}
          titleDiscover={titleDiscover}
          descriptionDiscover={descriptionDiscover}
          materialQuery={materialQuery}
          t={t}
        />
      )}
      <CosmetologyProcessSteps />
      <CosmetologyWhyMedicos />
      <CosmetologySampleForm
        id={SAMPLE_FORM_ID}
        activeTab={formTab}
        onTabChange={setFormTab}
      />
    </Layout>
  )
}
export default Cosmetology
