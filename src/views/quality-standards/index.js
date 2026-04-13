import React from "react"
import Seo from "../../components/seo"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Layout from "../../components/layout"
import BreadcrumbSchema from "../../components/breadcrumbs/breadcrumbSchema"
import QsHeader from "./components/qsHeader"
import Description from "./components/description"
import QsPolicy from "./components/qsPolicy"
import Certificate from "./components/certificate"

const QualityStandards = () => {
  const { t } = useTranslation()
  const breadcrumbItems = [
    { label: t`search-content.home`, to: "/" },
    { label: t`menu.quality-standards` },
  ]

  return (
    <Layout>
      <Seo
        title={t`seo.quality-standards.title`}
        description={t`seo.quality-standards.description`}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <QsHeader />
      <Description />
      <QsPolicy />
      <Certificate />
    </Layout>
  )
}
export default QualityStandards
