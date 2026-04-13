import React from "react"
import Seo from "../../components/seo"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Layout from "../../components/layout"
import BreadcrumbSchema from "../../components/breadcrumbs/breadcrumbSchema"
import ServicesHeader from "./components/servicesHeader"
import ServicesOurServices from "./components/servicesOurServices"

const Services = () => {
  const { t } = useTranslation()
  const breadcrumbItems = [
    { label: t`search-content.home`, to: "/" },
    { label: t`menu.services` },
  ]

  return (
    <Layout>
      <Seo
        title={t`seo.services.title`}
        description={t`seo.services.description`}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <ServicesHeader />
      <ServicesOurServices />
    </Layout>
  )
}
export default Services
