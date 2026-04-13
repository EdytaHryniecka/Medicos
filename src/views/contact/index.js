import React from "react"
import Seo from "../../components/seo"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Layout from "../../components/layout"
import ContactComponent from "./components/contactComponent"
import { useLocation } from "@reach/router"
import BreadcrumbSchema from "../../components/breadcrumbs/breadcrumbSchema"

const Contact = () => {
  const { t } = useTranslation()

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchQuery = searchParams.get("query")
    ? decodeURIComponent(searchParams.get("query"))
    : ""
  const searchMessage = searchParams.get("message")
    ? decodeURIComponent(searchParams.get("message"))
    : ""

  const breadcrumbItems = [
    { label: t`search-content.home`, to: "/" },
    { label: t`menu.contact` },
  ]

  return (
    <Layout>
      <Seo
        title={t`seo.contact.title`}
        description={t`seo.contact.description`}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <ContactComponent searchQuery={searchQuery} searchMessage={searchMessage} />
    </Layout>
  )
}
export default Contact
