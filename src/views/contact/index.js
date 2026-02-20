import React from "react"
import Seo from "../../components/seo"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Layout from "../../components/layout"
import ContactComponent from "./components/contactComponent"
import { useLocation } from "@reach/router"

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

  return (
    <Layout>
      <Seo
        title={t`seo.contact.title`}
        description={t`seo.contact.description`}
      />
      <ContactComponent searchQuery={searchQuery} searchMessage={searchMessage} />
    </Layout>
  )
}
export default Contact
