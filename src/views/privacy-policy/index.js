import React, { useState, useEffect, useContext } from "react"
import Seo from "../../components/seo"
import { useTranslation, I18nextContext } from "gatsby-plugin-react-i18next"
import Layout from "../../components/layout"
import { graphql, useStaticQuery } from "gatsby"
import getCurrentTranslations from "../../components/contentful-translator"
import DocumentComponent from "../../components/documentComponent/documentComponent"
import BreadcrumbSchema from "../../components/breadcrumbs/breadcrumbSchema"

const PrivacyPolicy = () => {
  const { t } = useTranslation()

  const { language } = useContext(I18nextContext)
  const data = useStaticQuery(graphql`
    query {
      allContentfulPrivacyPolicy {
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
  const [privacyPolicy, setPrivacyPolicy] = useState()

  useEffect(() => {
    const getData = () => {
      const getPrivacyPolicy = getCurrentTranslations(
        data.allContentfulPrivacyPolicy.edges,
        language
      )

      setPrivacyPolicy(getPrivacyPolicy[0])
    }
    getData()
  }, [data.allContentfulPrivacyPolicy, language])

  const textLastUpdate = `${t`privacy-policy.last-update`}`
  const texttitle = `${t`privacy-policy.title`}`
  // const textCertificate1 = `${t`privacy-policy.certificate-1`}`
  // const textCertificate2 = `${t`privacy-policy.certificate-2`}`
  // const textCertificate3 = `${t`privacy-policy.certificate-3`}`
  const textSee = `${t`privacy-policy.see`}`
  const breadcrumbItems = privacyPolicy
    ? [
        { label: t`search-content.home`, to: "/" },
        { label: privacyPolicy.node.title },
      ]
    : null

  return (
    <Layout>
      <Seo
        title={t`seo.privacy-policy.title`}
        description={t`seo.privacy-policy.description`}
      />
      {breadcrumbItems && <BreadcrumbSchema items={breadcrumbItems} />}
      {privacyPolicy && (
        <DocumentComponent
          documentDate={privacyPolicy.node.updatedAt}
          documentTitle={privacyPolicy.node.title}
          documentDescription={privacyPolicy.node.description}
          textLastUpdate={textLastUpdate}
          texttitle={texttitle}
          textSee={textSee}
        />
      )}
    </Layout>
  )
}
export default PrivacyPolicy
