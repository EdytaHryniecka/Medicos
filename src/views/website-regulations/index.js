import React, { useState, useEffect, useContext } from "react"
import Seo from "../../components/seo"
import { useTranslation, I18nextContext } from "gatsby-plugin-react-i18next"
import Layout from "../../components/layout"
import { graphql, useStaticQuery } from "gatsby"
import getCurrentTranslations from "../../components/contentful-translator"
import DocumentComponent from "../../components/documentComponent/documentComponent"
import BreadcrumbSchema from "../../components/breadcrumbs/breadcrumbSchema"

const WebsiteRegulations = () => {
  const { t } = useTranslation()

  const { language } = useContext(I18nextContext)
  const data = useStaticQuery(graphql`
    query {
      allContentfulWebsiteRegulations {
        edges {
          node {
            title
            node_locale
            description {
              raw
            }
            updatedAt
          }
        }
      }
    }
  `)
  const [websiteRegulations, setWebsiteRegulations] = useState()

  useEffect(() => {
    const getData = () => {
      const getWebsiteRegulations = getCurrentTranslations(
        data.allContentfulWebsiteRegulations.edges,
        language
      )

      setWebsiteRegulations(getWebsiteRegulations[0])
    }
    getData()
  }, [data.allContentfulWebsiteRegulations, language])

  const textLastUpdate = `${t`website-regulations.last-update`}`
  const texttitle = `${t`website-regulations.title`}`
  const textSee = `${t`website-regulations.see`}`
  const breadcrumbItems = websiteRegulations
    ? [
        { label: t`search-content.home`, to: "/" },
        { label: websiteRegulations.node.title },
      ]
    : null

  return (
    <Layout>
      <Seo
        title={t`seo.website-regulations.title`}
        description={t`seo.website-regulations.description`}
      />
      {breadcrumbItems && <BreadcrumbSchema items={breadcrumbItems} />}
      {websiteRegulations && (
        <DocumentComponent
          documentDate={websiteRegulations.node.updatedAt}
          documentTitle={websiteRegulations.node.title}
          documentDescription={websiteRegulations.node.description}
          textLastUpdate={textLastUpdate}
          texttitle={texttitle}
          textSee={textSee}
        />
      )}
    </Layout>
  )
}
export default WebsiteRegulations
