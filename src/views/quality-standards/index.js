import React from "react"
import Seo from "../../components/seo"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Layout from "../../components/layout"

const QualityStandards = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <Seo
        title={t`seo.quality-standards.title`}
        description={t`seo.quality-standards.description`}
      />
    </Layout>
  )
}
export default QualityStandards
