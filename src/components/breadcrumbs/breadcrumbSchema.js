import React, { useMemo } from "react"
import { Helmet } from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import { useLocation } from "@reach/router"

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

const resolveAbsoluteUrl = (baseUrl, pathValue, language, defaultLanguage) => {
  if (!pathValue) {
    return ""
  }

  if (/^https?:\/\//i.test(pathValue)) {
    return pathValue
  }

  if (pathValue.startsWith("//")) {
    return `https:${pathValue}`
  }

  if (!pathValue.startsWith("/")) {
    return `${baseUrl}/${pathValue}`
  }

  const prefix =
    defaultLanguage && language === defaultLanguage ? "" : `/${language}`
  const normalizedPath =
    prefix && (pathValue === "/" || pathValue === "")
      ? `${prefix}/`
      : prefix && !pathValue.startsWith(`${prefix}/`)
        ? `${prefix}${pathValue}`
        : pathValue

  return `${baseUrl}${normalizePathname(normalizedPath)}`
}

const BreadcrumbSchema = ({ items = [] }) => {
  const location = useLocation()
  const { language, defaultLanguage } = useI18next()
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `)

  const baseUrl =
    site?.siteMetadata?.siteUrl?.replace(/\/+$/, "") || "https://medicos.com.pl"

  const breadcrumbSchema = useMemo(() => {
    if (!Array.isArray(items) || items.length === 0) {
      return null
    }

    const currentUrl = resolveAbsoluteUrl(
      baseUrl,
      location?.pathname || "/",
      language,
      defaultLanguage
    )

    const itemListElement = items
      .filter(item => item?.label)
      .map((item, index) => {
        const resolvedItemUrl = item?.to
          ? resolveAbsoluteUrl(baseUrl, item.to, language, defaultLanguage)
          : currentUrl

        return {
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: resolvedItemUrl || undefined,
        }
      })

    if (!itemListElement.length) {
      return null
    }

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement,
    }
  }, [baseUrl, defaultLanguage, items, language, location?.pathname])

  if (!breadcrumbSchema) {
    return null
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  )
}

export default BreadcrumbSchema
