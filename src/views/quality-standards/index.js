import React from "react"
import Seo from "../../components/seo"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Layout from "../../components/layout"
import QsHeader from "./components/qsHeader"
import Description from "./components/description"
import QsPolicy from "./components/qsPolicy"
import Certificate from "./components/certificate"

const QualityStandards = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <Seo
        title={t`seo.quality-standards.title`}
        description={t`seo.quality-standards.description`}
      />
      <QsHeader />
      <Description />
      <QsPolicy />
      <Certificate />
    </Layout>
  )
}
export default QualityStandards
