import * as React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import defaultOgImage from "../images/seo/medicos-seo.png"

function Seo({ description, meta = [], title, ogImage }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )

  const { language } = useI18next()
  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  const metaOgImage = ogImage === undefined ? defaultOgImage : ogImage

  return (
    <Helmet
      htmlAttributes={{
        lang: language,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `author`,
          content: site.siteMetadata.author,
        },
        {
          property: `og:image`,
          content: metaOgImage,
        },
      ].concat(meta)}
    >
      <script type="application/ld+json">
        {`
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "url": "https://medicos.com.pl/",
        "name": "Medicos Sp. z o.o.",
        "isAccessibleForFree": true,
        "description": "Nasza firma oferuje surowce chemiczne i składniki aktywne z doradztwem i zabezpieczoną dostawą dla innowacyjnych rozwiązań.",
        "email": "kontakt@medicos.com.pl",
        "contactPoint": {
          "@type": "ContactPoint",
          "name": "Informacja",
          "telephone": "+48 601 939 903",
          "availableLanguage": "English, Polish",
        }
        "address": {
          "@type": "PostalAddress",
          "name": "ul. Ukryty Raj 4 lok. 1 02-757 Warszawa",
          "addressCountry": "Polska",
          "addressLocality": "Warszawa",
          "addressRegion": "Mazowieckie",
          "postalCode": "02-757",
          "streetAddress": "ul. Ukryty Raj 4",
          "@id": "https://maps.app.goo.gl/5YL6MD26Gk3tBaiA7"
        },
      }
    `}
      </script>
    </Helmet>
  )
}

export default Seo
