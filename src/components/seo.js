import * as React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"
import { useLocation } from "@reach/router"
import defaultOgImage from "../images/seo/medicos-seo.png"

function Seo({
  description,
  meta = [],
  title,
  ogImage,
  canonical,
  canonicalTranslationKey,
  hreflangOverrides,
}) {
  const location = useLocation()
  const currentPath =
    location?.pathname ||
    (typeof window !== "undefined" ? window.location.pathname : "") ||
    ""
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `
  )

  const { language, languages, defaultLanguage, originalPath } = useI18next()
  const { t } = useTranslation()
  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const metaOgImage = ogImage === undefined ? defaultOgImage : ogImage
  const baseUrl =
    site.siteMetadata?.siteUrl?.replace(/\/+$/, "") || "https://medicos.com.pl"

  const normalizePathname = pathValue => {
    if (!pathValue) {
      return "/"
    }

    let normalized = pathValue
    if (!normalized.startsWith("/")) {
      normalized = `/${normalized}`
    }

    normalized = normalized.replace(/\/{2,}/g, "/")
    normalized = normalized.replace(/\/index\.html?$/i, "/")

    if (normalized !== "/") {
      normalized = normalized.replace(/\/+$/, "")
      normalized = `${normalized}/`
    }

    return normalized || "/"
  }

  const normalizedCurrentPath = normalizePathname(currentPath)

  const getCanonicalTranslationKeyFromPath = path => {
    const pathWithoutLang = path.replace(/^\/(pl|en)(?=\/|$)/, "")
    const normalizedPath = pathWithoutLang.replace(/\/+$/, "")
    const pageKey =
      normalizedPath === ""
        ? "home"
        : normalizedPath.replace(/^\//, "").split("/")[0]
    return `seo.${pageKey}.canonical`
  }

  const translationKey =
    canonicalTranslationKey ||
    getCanonicalTranslationKeyFromPath(normalizedCurrentPath)
  const translatedCanonical = translationKey
    ? t(translationKey, { defaultValue: "" })
    : ""
  const canonicalValue =
    canonical || translatedCanonical || `${baseUrl}${normalizedCurrentPath}`

  const normalizedOriginalPath = (() => {
    if (typeof originalPath === "string" && originalPath.length) {
      return normalizePathname(originalPath)
    }
    if (currentPath && typeof currentPath === "string") {
      return normalizePathname(currentPath)
    }
    return "/"
  })()

  const normalizeHref = hrefValue => {
    if (!hrefValue) {
      return ""
    }

    if (/^https?:\/\//i.test(hrefValue)) {
      return hrefValue
    }

    if (hrefValue.startsWith("//")) {
      return `https:${hrefValue}`
    }

    if (hrefValue.startsWith("/")) {
      return `${baseUrl}${hrefValue}`
    }

    return `${baseUrl}/${hrefValue}`
  }

  const buildHref = lang => {
    if (hreflangOverrides && hreflangOverrides[lang]) {
      return normalizeHref(hreflangOverrides[lang])
    }

    const prefix =
      defaultLanguage && lang === defaultLanguage ? "" : `/${lang}`
    const path =
      normalizedOriginalPath === "/" ? "" : normalizedOriginalPath
    return `${baseUrl}${prefix}${path}`
  }

  const hreflangLanguages =
    hreflangOverrides && Array.isArray(languages)
      ? languages.filter(lang => Boolean(hreflangOverrides[lang]))
      : languages

  const hreflangLinks =
    Array.isArray(hreflangLanguages) && hreflangLanguages.length
      ? hreflangLanguages.map(lang => ({
          rel: "alternate",
          hrefLang: lang,
          href: buildHref(lang),
        }))
      : []

  const xDefaultHref =
    (hreflangOverrides && hreflangOverrides["x-default"]
      ? normalizeHref(hreflangOverrides["x-default"])
      : null) ||
    (defaultLanguage
      ? buildHref(defaultLanguage)
      : languages?.[0]
        ? buildHref(languages[0])
        : canonicalValue)

  return (
    <Helmet
      htmlAttributes={{
        lang: language,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s` : null}
      link={[
        {
          rel: `canonical`,
          href: canonicalValue,
        },
        ...hreflangLinks,
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: xDefaultHref,
        },
      ]}
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
        {
          property: `og:url`,
          content: canonicalValue,
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
