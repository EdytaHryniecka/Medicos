import React from "react"
import Seo from "../../components/seo"
import { useTranslation } from "gatsby-plugin-react-i18next"
import HomeHeader from "./components/homeHeader"
import HomeIndustries from "./components/homeIndustries"
import Layout from "../../components/layout"
import HomeAbout from "./components/homeAbout"
import HomeServices from "./components/homeServices"
import HomeNeeds from "./components/homeNeeds"
import HomeBlog from "./components/homeBlog"

const Home = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <Seo title={t`seo.home.title`} description={t`seo.home.description`} />
      <HomeHeader />
      <HomeIndustries />
      <HomeAbout />
      <HomeServices />
      <HomeNeeds />
      {/* comment blog */}
      <HomeBlog />
    </Layout>
  )
}
export default Home
