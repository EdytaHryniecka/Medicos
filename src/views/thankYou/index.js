import React from "react"
import Seo from "../../components/seo"
import { useTranslation, Link } from "gatsby-plugin-react-i18next"
import Layout from "../../components/layout"
import ThankYouHeader from "./components/thankYouHeader"
import { Helmet } from "react-helmet"
import BreadcrumbSchema from "../../components/breadcrumbs/breadcrumbSchema"
const ThankYou = () => {
  const { t } = useTranslation()
  const breadcrumbItems = [
    { label: t`search-content.home`, to: "/" },
    { label: t`typ-header.title-a` },
  ]

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Layout>
        <BreadcrumbSchema items={breadcrumbItems} />
        <ThankYouHeader />
      </Layout>
    </>
  )
}
export default ThankYou
