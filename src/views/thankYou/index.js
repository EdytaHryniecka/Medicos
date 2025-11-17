import React from "react"
import Seo from "../../components/seo"
import { useTranslation, Link } from "gatsby-plugin-react-i18next"
import Layout from "../../components/layout"
import ThankYouHeader from "./components/thankYouHeader"
import { Helmet } from "react-helmet"
const ThankYou = () => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Layout>
        <ThankYouHeader />
      </Layout>
    </>
  )
}
export default ThankYou
