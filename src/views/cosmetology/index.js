import React, { useState } from "react"
import Seo from "../../components/seo"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Layout from "../../components/layout"
import BreadcrumbSchema from "../../components/breadcrumbs/breadcrumbSchema"
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
  const [formTab, setFormTab] = useState("sample")

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
