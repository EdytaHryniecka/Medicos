import React, { useContext, useEffect, useMemo, useRef, useState } from "react"
import { graphql, navigate } from "gatsby"
import {
  I18nextContext,
  useI18next,
  useTranslation,
} from "gatsby-plugin-react-i18next"
import { Helmet } from "react-helmet"
import "bootstrap/dist/css/bootstrap.min.css"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import getCurrentTranslations from "../../components/contentful-translator"
import QueryNavigate from "../../hooks/queryNavigate"
import { articleTextRenderOptions } from "../../utils/articleRenderOption"
import { slugify } from "../../utils/slugify"
import "../../components/materialModal/styles/materialModal.css"
import "./styles/materialPage.css"
import "./styles/materialParametersTable.css"
import "./styles/materialAccordion.css"
import "./styles/materialFaqSection.css"
import MaterialsDontFind from "../../views/materials/components/materialsDontFind"
import MaterialDiscover from "../../components/materialComponent/components/materialDiscover"
import { getImage } from "gatsby-plugin-image"
import MaterialHeader from "./components/materialHeader"
import MaterialSticky from "./components/materialSticky"
import MaterialParametersSection from "./components/materialParametersSection"
import MaterialCertificatesSection from "./components/materialCertificatesSection"
import MaterialGeneralInformationSection from "./components/materialGeneralInformationSection"
import MaterialApplicationSection from "./components/materialApplicationSection"
import MaterialAvailablePackagingSection from "./components/materialAvailablePackagingSection"
import MaterialDownloadableMaterialsSection from "./components/materialDownloadableMaterialsSection"
import MaterialTechnicalSupportSection from "./components/materialTechnicalSupportSection"
import MaterialAdditionalInformationSection from "./components/materialAdditionalInformationSection"
import MaterialMoreInfoSection from "./components/materialMoreInfoSection"
import MaterialFaqSection from "./components/materialFaqSection"
const MaterialPage = ({ data, pageContext }) => {
  const { t } = useTranslation()
  const { language } = useContext(I18nextContext)
  const { languages, defaultLanguage } = useI18next()
  const pageWrapperRef = useRef(null)
  const materialRichTextRef = useRef([])
  materialRichTextRef.current = []

  const initialMaterial = useMemo(() => {
    const translatedMaterials = getCurrentTranslations(
      data.allContentfulMaterials.edges,
      language
    )

    return (
      translatedMaterials.find(
        current => current.node.contentful_id === pageContext.materialId
      ) ||
      translatedMaterials.find(
        current => slugify(current.node.title) === pageContext.slug
      ) ||
      null
    )
  }, [
    data.allContentfulMaterials.edges,
    language,
    pageContext.materialId,
    pageContext.slug,
  ])

  const [material, setMaterial] = useState(initialMaterial)

  useEffect(() => {
    setMaterial(initialMaterial)
  }, [initialMaterial])

  const materialPathsByLanguage = useMemo(() => {
    const materialId = material?.node?.contentful_id || pageContext.materialId
    if (!materialId) {
      return null
    }

    const edges = data?.allContentfulMaterials?.edges || []
    if (!edges.length) {
      return null
    }

    const localeFromLang = lang => (lang === "pl" ? "pl-PL" : lang)

    const paths = {}
    languages.forEach(lang => {
      const targetLocale = localeFromLang(lang)
      const targetEntry = edges.find(
        edge =>
          edge.node.contentful_id === materialId &&
          edge.node.node_locale === targetLocale
      )

      if (!targetEntry) {
        return
      }

      const targetSlug = slugify(targetEntry.node.title)
      if (!targetSlug) {
        return
      }

      paths[lang] = `/materials/${targetSlug}`
    })

    return Object.keys(paths).length ? paths : null
  }, [data?.allContentfulMaterials?.edges, languages, material, pageContext])

  const hreflangOverrides = useMemo(() => {
    if (!materialPathsByLanguage) {
      return null
    }

    const overrides = {}
    languages.forEach(lang => {
      const path = materialPathsByLanguage[lang]
      if (!path) {
        return
      }

      const prefix =
        defaultLanguage && lang === defaultLanguage ? "" : `/${lang}`
      overrides[lang] = `${prefix}${path}`
    })

    if (defaultLanguage && overrides[defaultLanguage]) {
      overrides["x-default"] = overrides[defaultLanguage]
    }

    return overrides
  }, [defaultLanguage, languages, materialPathsByLanguage])

  const assetEdges = Array.isArray(data?.allContentfulAsset?.edges)
    ? data.allContentfulAsset.edges
    : []
  const assetsById = useMemo(
    () =>
      assetEdges.reduce((acc, edge) => {
        const node = edge?.node
        const contentfulId = node?.contentful_id
        const id = node?.id
        if (contentfulId) {
          acc[contentfulId] = node
        }
        if (id) {
          acc[id] = node
        }
        return acc
      }, {}),
    [assetEdges]
  )

  const renderOptions = useMemo(
    () => articleTextRenderOptions(materialRichTextRef, assetsById),
    [assetsById]
  )

  useEffect(() => {
    if (!material || !pageWrapperRef.current) {
      return
    }

    const wrapper = pageWrapperRef.current
    const headers = Array.from(wrapper.querySelectorAll(".js-acc-header"))
    const pairs = headers
      .map((header, index) => {
        const body = header.nextElementSibling

        if (!body || !body.classList.contains("js-acc-body")) {
          return null
        }

        const bodyId = `material-acc-body-${index}`
        header.setAttribute("role", "button")
        header.setAttribute("tabindex", "0")
        header.setAttribute("aria-controls", bodyId)
        header.setAttribute("aria-expanded", "false")
        body.setAttribute("id", bodyId)

        return { header, body }
      })
      .filter(Boolean)

    if (!pairs.length) {
      return
    }

    const isMobile = () => window.innerWidth <= 768
    const setOpenState = (header, body, isOpen) => {
      header.classList.toggle("is-open", isOpen)
      body.classList.toggle("is-open", isOpen)
      header.setAttribute("aria-expanded", isOpen ? "true" : "false")
      body.style.maxHeight = isOpen ? `${body.scrollHeight}px` : "0px"
    }

    let wasMobile = isMobile()

    const applyMode = () => {
      const mobile = isMobile()

      if (!mobile) {
        pairs.forEach(({ header, body }) => {
          header.classList.remove("is-open")
          body.classList.remove("is-open")
          header.setAttribute("aria-expanded", "true")
          body.style.maxHeight = ""
        })
        wasMobile = false
        return
      }

      if (!wasMobile) {
        pairs.forEach(({ header, body }) => {
          setOpenState(header, body, false)
        })
        wasMobile = true
        return
      }

      pairs.forEach(({ header, body }) => {
        const isOpen = header.getAttribute("aria-expanded") !== "false"
        setOpenState(header, body, isOpen)
      })

      wasMobile = true
    }

    const listeners = pairs.map(({ header, body }) => {
      const toggle = () => {
        if (!isMobile()) {
          return
        }

        const isOpen = header.getAttribute("aria-expanded") === "true"
        setOpenState(header, body, !isOpen)
      }

      const onKeyDown = event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          toggle()
        }
      }

      header.addEventListener("click", toggle)
      header.addEventListener("keydown", onKeyDown)

      return { header, toggle, onKeyDown }
    })

    const onResize = () => applyMode()

    applyMode()
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      listeners.forEach(({ header, toggle, onKeyDown }) => {
        header.removeEventListener("click", toggle)
        header.removeEventListener("keydown", onKeyDown)
      })
    }
  }, [material])

  useEffect(() => {
    if (!material) {
      return
    }

    const desiredSlug = slugify(material.node.title)

    if (!desiredSlug || desiredSlug === pageContext.slug) {
      return
    }

    const targetPath =
      language === "pl"
        ? `/materials/${desiredSlug}`
        : `/${language}/materials/${desiredSlug}`

    navigate(targetPath, { replace: true })
  }, [material, language, pageContext.slug])

  const goToContact = () => {
    if (!material) {
      return
    }

    const contactMessage = t("materials.post.contact-message", {
      name: material.node.title,
      cas: material.node.cas,
    })

    QueryNavigate("Chcę zapytać o dostępność surowca", "contact", language, {
      message: contactMessage,
    })
  }

  const handleRegisterMaterialClick = event => {
    if (!event.target.closest(".register-material")) {
      return
    }

    event.preventDefault()
    goToContact()
  }

  const renderCategory = (category, index) => {
    const normalizedCategory = category.toLowerCase()

    if (normalizedCategory.includes("chemia")) {
      return (
        <div key={index} className="category hc-background">
          <p className="p-style ">{t`materials-filter.household-chemicals`}</p>
        </div>
      )
    }

    if (normalizedCategory.includes("kosmet")) {
      return (
        <div key={index} className="category cos-background">
          <p className="p-style ">{t`materials-filter.cosmetology`}</p>
        </div>
      )
    }

    if (normalizedCategory.includes("farm")) {
      return (
        <div key={index} className="category far-background">
          <p className="p-style ">{t`materials-filter.pharmacy`}</p>
        </div>
      )
    }

    if (normalizedCategory.includes("produkty")) {
      return (
        <div key={index} className="category der-background">
          <p className="p-style ">{t`materials-filter.dermatological`}</p>
        </div>
      )
    }

    if (normalizedCategory.includes("podologia")) {
      return (
        <div key={index} className="category podiatry-background">
          <p className="p-style ">{t`materials-filter.podiatry`}</p>
        </div>
      )
    }

    if (
      normalizedCategory.includes("suplement") ||
      normalizedCategory.includes("ywno")
    ) {
      return (
        <div key={index} className="category food-background">
          <p className="p-style ">{t`materials-filter.food`}</p>
        </div>
      )
    }

    if (normalizedCategory.includes("pozosta")) {
      return (
        <div key={index} className="category oi-background">
          <p className="p-style ">{t`materials-filter.other-industries`}</p>
        </div>
      )
    }

    return null
  }

  const heroImageFileUrl =
    typeof material?.node?.heroImage?.file?.url === "string"
      ? material.node.heroImage.file.url.trim()
      : ""
  const heroImageUrl = heroImageFileUrl
    ? heroImageFileUrl.startsWith("//")
      ? `https:${heroImageFileUrl}`
      : heroImageFileUrl
    : ""
  const faqItemsSource = Array.isArray(material?.node?.faq)
    ? material.node.faq
    : []
  const faqSchema = useMemo(() => {
    if (!faqItemsSource.length) {
      return null
    }

    const items = faqItemsSource
      .map(item => {
        const question =
          typeof item?.question === "string"
            ? item.question.trim()
            : typeof item?.key === "string"
            ? item.key.trim()
            : ""
        const rawAnswer =
          typeof item?.answer === "string"
            ? item.answer
            : typeof item?.value === "string"
            ? item.value
            : ""
        const answerText = rawAnswer.replace(/<br\s*\/?>/gi, "\n").trim()

        if (!question || !answerText) {
          return null
        }

        return {
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answerText,
          },
        }
      })
      .filter(Boolean)

    if (!items.length) {
      return null
    }

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items,
    }
  }, [faqItemsSource])
  if (!material) {
    return null
  }

  const heroImageData = getImage(material?.node?.heroImage?.gatsbyImageData)
  const defaultParameterRows = [
    { key: t`material-modal.inci`, value: material?.node?.inci },
    { key: t`material-modal.cas`, value: material?.node?.cas },
    { key: t`material-modal.form2`, value: material?.node?.form },
    { key: t`material-modal.color`, value: material?.node?.color },
    { key: t`material-modal.ph`, value: material?.node?.pH },
  ]
  const basicParameters = Array.isArray(material?.node?.basicParameters)
    ? material.node.basicParameters.filter(
        parameter => parameter?.key || parameter?.value
      )
    : []
  const parameterRows =
    basicParameters.length > 0 ? basicParameters : defaultParameterRows
  const certificateItems = Array.isArray(material?.node?.certificateGraphics)
    ? material.node.certificateGraphics
        .map(item => {
          const value = typeof item?.value === "string" ? item.value.trim() : ""
          const key = typeof item?.key === "string" ? item.key.trim() : ""

          if (!value) {
            return null
          }

          const linkedAsset = assetsById[value]
          const linkedImageData = getImage(linkedAsset?.gatsbyImageData)
          const rawLinkedImageSrc =
            typeof linkedAsset?.file?.url === "string"
              ? linkedAsset.file.url.trim()
              : ""
          const linkedImageSrc = rawLinkedImageSrc
            ? rawLinkedImageSrc.startsWith("//")
              ? `https:${rawLinkedImageSrc}`
              : rawLinkedImageSrc
            : ""
          const directValueSrc =
            value.startsWith("http://") ||
            value.startsWith("https://") ||
            value.startsWith("//")
              ? value.startsWith("//")
                ? `https:${value}`
                : value
              : ""
          const imageSrc = linkedImageSrc || directValueSrc

          if (!linkedImageData && !imageSrc) {
            return null
          }

          return {
            alt: key || linkedAsset?.title || "certificate",
            imageData: linkedImageData || null,
            imageSrc,
          }
        })
        .filter(Boolean)
    : []
  const certificatesDescriptionNode =
    material?.node?.descriptionOfTheCertificatesSection
  const certificatesDescription = (
    typeof certificatesDescriptionNode === "string"
      ? certificatesDescriptionNode
      : typeof certificatesDescriptionNode?.descriptionOfTheCertificatesSection ===
        "string"
      ? certificatesDescriptionNode.descriptionOfTheCertificatesSection
      : ""
  ).trim()
  const shouldShowCertificatesSection =
    certificateItems.length > 0 || Boolean(certificatesDescription)
  const applicationTableRows = Array.isArray(material?.node?.applicationTable)
    ? material.node.applicationTable.filter(row => row?.key || row?.value)
    : []
  const hasRichTextContent = rawValue => {
    if (typeof rawValue !== "string" || !rawValue.trim()) {
      return false
    }

    try {
      const parsed = JSON.parse(rawValue)
      const nodes = Array.isArray(parsed?.content) ? parsed.content : []

      const extractText = list =>
        list
          .map(node => {
            if (!node) {
              return ""
            }
            if (node.nodeType === "text") {
              return typeof node.value === "string" ? node.value : ""
            }
            if (Array.isArray(node.content)) {
              return extractText(node.content)
            }
            return ""
          })
          .join(" ")

      return extractText(nodes).trim().length > 0
    } catch (error) {
      return false
    }
  }
  const hasApplicationDescription = hasRichTextContent(
    material?.node?.application?.raw
  )
  const shouldShowApplicationSection =
    hasApplicationDescription || applicationTableRows.length > 0
  const packagingRows = Array.isArray(material?.node?.availablePackaging)
    ? material.node.availablePackaging
        .map(row => {
          const leftValue = typeof row?.key === "string" ? row.key.trim() : ""
          const rightValue =
            typeof row?.value === "string" ? row.value.trim() : ""

          if (!leftValue && !rightValue) {
            return null
          }

          return { leftValue, rightValue }
        })
        .filter(Boolean)
    : []
  const hasTechnicalSpecifications = hasRichTextContent(
    material?.node?.technicalSpecifications?.raw
  )
  const hasAvailablePackagingDescription = hasRichTextContent(
    material?.node?.availablePackagingDescription?.raw
  )
  const hasTechnicalSupportDescription = hasRichTextContent(
    material?.node?.technicalSupport?.raw
  )
  const hasAdditionalInformationDescription = hasRichTextContent(
    material?.node?.additionalInformation?.raw
  )
  const relatedMaterialsSource = material?.node?.relatedMaterials
  const relatedMaterialsList = Array.isArray(relatedMaterialsSource)
    ? relatedMaterialsSource
    : relatedMaterialsSource
    ? [relatedMaterialsSource]
    : []
  const relatedMaterialsRows = relatedMaterialsList
    .filter(related => related?.title || related?.inci || related?.cas)
    .map(related => ({ node: related }))
  const shouldShowMoreInfoSection = !material?.node?.hideSectionMoreInformation
  const useSecondLayout = Boolean(material?.node?.useSecondLayout)

  return (
    <Layout>
      <Seo
        title={material.node.metaTitle || t`seo.materials.title`}
        description={
          material.node.metaDescription || t`seo.materials.description`
        }
        canonical={material.node.canonical}
        hreflangOverrides={hreflangOverrides}
      />
      {faqSchema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        </Helmet>
      )}
      <div
        ref={pageWrapperRef}
        className="material-page-wrapper"
        onClick={handleRegisterMaterialClick}
      >
        <MaterialHeader
          material={material}
          heroImageData={heroImageData}
          renderCategory={renderCategory}
          t={t}
        />
        <div className="container material-container">
          <div className="material-column">
            {useSecondLayout ? (
              <>
                <MaterialParametersSection
                  t={t}
                  parameterRows={parameterRows}
                  technicalSpecifications={
                    material?.node?.technicalSpecifications
                  }
                  renderOptions={renderOptions}
                  hasTechnicalSpecifications={hasTechnicalSpecifications}
                />
                {packagingRows.length > 0 && (
                  <MaterialAvailablePackagingSection
                    t={t}
                    packagingRows={packagingRows}
                    availablePackagingDescription={
                      material?.node?.availablePackagingDescription
                    }
                    renderOptions={renderOptions}
                    hasAvailablePackagingDescription={
                      hasAvailablePackagingDescription
                    }
                  />
                )}
                {shouldShowCertificatesSection && (
                  <MaterialCertificatesSection
                    t={t}
                    certificateItems={certificateItems}
                    certificatesDescription={certificatesDescription}
                  />
                )}
                <MaterialGeneralInformationSection
                  t={t}
                  material={material}
                  renderOptions={renderOptions}
                />
                {shouldShowApplicationSection && (
                  <MaterialApplicationSection
                    t={t}
                    material={material}
                    renderOptions={renderOptions}
                    hasApplicationDescription={hasApplicationDescription}
                    applicationTableRows={applicationTableRows}
                  />
                )}
                <MaterialDownloadableMaterialsSection t={t} />
                {hasTechnicalSupportDescription && (
                  <MaterialTechnicalSupportSection
                    t={t}
                    material={material}
                    renderOptions={renderOptions}
                  />
                )}
                {hasAdditionalInformationDescription && (
                  <MaterialAdditionalInformationSection
                    t={t}
                    material={material}
                    renderOptions={renderOptions}
                  />
                )}
                {shouldShowMoreInfoSection && <MaterialMoreInfoSection t={t} />}
              </>
            ) : (
              <>
                <MaterialParametersSection
                  t={t}
                  parameterRows={parameterRows}
                  technicalSpecifications={
                    material?.node?.technicalSpecifications
                  }
                  renderOptions={renderOptions}
                  hasTechnicalSpecifications={hasTechnicalSpecifications}
                />
                {shouldShowCertificatesSection && (
                  <MaterialCertificatesSection
                    t={t}
                    certificateItems={certificateItems}
                    certificatesDescription={certificatesDescription}
                  />
                )}
                <MaterialGeneralInformationSection
                  t={t}
                  material={material}
                  renderOptions={renderOptions}
                />
                {shouldShowApplicationSection && (
                  <MaterialApplicationSection
                    t={t}
                    material={material}
                    renderOptions={renderOptions}
                    hasApplicationDescription={hasApplicationDescription}
                    applicationTableRows={applicationTableRows}
                  />
                )}
                {packagingRows.length > 0 && (
                  <MaterialAvailablePackagingSection
                    t={t}
                    packagingRows={packagingRows}
                    availablePackagingDescription={
                      material?.node?.availablePackagingDescription
                    }
                    renderOptions={renderOptions}
                    hasAvailablePackagingDescription={
                      hasAvailablePackagingDescription
                    }
                  />
                )}
                <MaterialDownloadableMaterialsSection t={t} />
                {hasTechnicalSupportDescription && (
                  <MaterialTechnicalSupportSection
                    t={t}
                    material={material}
                    renderOptions={renderOptions}
                  />
                )}
                {hasAdditionalInformationDescription && (
                  <MaterialAdditionalInformationSection
                    t={t}
                    material={material}
                    renderOptions={renderOptions}
                  />
                )}
                {shouldShowMoreInfoSection && <MaterialMoreInfoSection t={t} />}
              </>
            )}
          </div>
          <MaterialSticky
            material={material}
            renderCategory={renderCategory}
            t={t}
          />
        </div>
      </div>
      {relatedMaterialsRows.length > 0 && (
        <MaterialDiscover
          materialDiscover={relatedMaterialsRows}
          titleDiscover={t`materials.post.discover-title`}
          descriptionDiscover={t`materials.post.discover-description`}
          materialQuery="cosmetology"
          t={t}
        />
      )}
      <MaterialsDontFind />
      <MaterialFaqSection
        faqItems={faqItemsSource}
        faqDescription={material?.node?.faqDescription}
        renderOptions={renderOptions}
      />
    </Layout>
  )
}

export default MaterialPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allContentfulMaterials {
      edges {
        node {
          category
          color
          node_locale
          pH
          title
          contentful_id
          metaTitle
          metaDescription
          canonical
          inci
          cas
          form
          basicParameters {
            key
            value
          }
          certificateGraphics {
            key
            value
          }
          descriptionOfTheCertificatesSection {
            descriptionOfTheCertificatesSection
          }
          heroImage {
            gatsbyImageData(quality: 100)
            file {
              url
            }
          }
          generalInformation {
            raw
          }
          application {
            raw
          }
          technicalSpecifications {
            raw
          }
          applicationTable {
            key
            value
          }
          availablePackaging {
            key
            value
          }
          availablePackagingDescription {
            raw
          }
          technicalSupport {
            raw
          }
          additionalInformation {
            raw
          }
          faqDescription {
            raw
          }
          faq {
            key
            value
          }
          useSecondLayout
          hideSectionMoreInformation
          relatedMaterials {
            node_locale
            title
            inci
            cas
            category
          }
        }
      }
    }
    allContentfulAsset {
      edges {
        node {
          id
          contentful_id
          title
          description
          file {
            url
          }
          gatsbyImageData(quality: 100)
        }
      }
    }
  }
`
