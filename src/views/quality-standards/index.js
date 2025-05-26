import React from "react"
import Seo from "../../components/seo"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Layout from "../../components/layout"
import QsHeader from "./components/qsHeader"

const QualityStandards = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <Seo
        title={t`seo.quality-standards.title`}
        description={t`seo.quality-standards.description`}
      />
      <QsHeader />
    </Layout>
  )
}
export default QualityStandards
