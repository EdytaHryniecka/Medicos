import React, { useCallback, useContext, useMemo, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Helmet } from "react-helmet"
import { useTranslation, I18nextContext } from "gatsby-plugin-react-i18next"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import BreadcrumbSchema from "../../components/breadcrumbs/breadcrumbSchema"
import getCurrentTranslations from "../../components/contentful-translator"
import FormulationsHero from "./components/formulationsHero"
import FormulationsSteps from "./components/formulationsSteps"
import FormulationsCatalog from "./components/formulationsCatalog"
import FormulationsForm from "./components/formulationsForm"
import { HERO_IMAGE_SIZES, HERO_IMAGE_SRCSET } from "./heroImage"
import { normalizeText } from "./utils"
import "./styles/formulationsShared.css"

const CATALOG_ID = "formulations-catalog"
const FORM_ID = "formulations-form"
const HEADER_OFFSET = 80

const scrollToId = elementId => {
  const element = document.getElementById(elementId)
  if (!element) return
  window.scrollTo({
    top: window.scrollY + element.getBoundingClientRect().top - HEADER_OFFSET,
    behavior: "smooth",
  })
}

const addUnique = (list, names) => {
  const keys = new Set(list.map(normalizeText))
  const next = [...list]
  names.forEach(name => {
    const key = normalizeText(name)
    if (key && !keys.has(key)) {
      keys.add(key)
      next.push(name.trim())
    }
  })
  return next
}

const Formulations = ({ pageContext }) => {
  const { t } = useTranslation()
  const { language } = useContext(I18nextContext)
  const formulations = useMemo(
    () => pageContext?.formulations || [],
    [pageContext]
  )
  const [materials, setMaterials] = useState([])
  const [pdfFormulations, setPdfFormulations] = useState([])
  const [pdfRequestToken, setPdfRequestToken] = useState(0)

  const materialsData = useStaticQuery(graphql`
    query {
      allContentfulMaterials(filter: { category: { eq: "Kosmetyka" } }) {
        edges {
          node {
            node_locale
            title
          }
        }
      }
    }
  `)

  const materialOptions = useMemo(() => {
    const fromFormulations = formulations.flatMap(formulation =>
      formulation.ingredients.map(ingredient => ingredient.name)
    )
    const fromOffer = getCurrentTranslations(
      materialsData?.allContentfulMaterials?.edges || [],
      language
    ).map(edge => (edge.node.title || "").trim())
    return addUnique([], [...fromFormulations, ...fromOffer]).sort((a, b) =>
      a.localeCompare(b, language)
    )
  }, [formulations, materialsData, language])

  // Opcje dostępnych receptur do wyboru z listy rozwijanej w formularzu
  const formulationOptions = useMemo(
    () => formulations.map(f => f.title).filter(Boolean),
    [formulations]
  )

  const stats = useMemo(() => {
    const uniqueMaterials = new Set(
      formulations.flatMap(formulation =>
        formulation.ingredients.map(ingredient =>
          normalizeText(ingredient.name)
        )
      )
    )
    return [
      {
        value: formulations.length,
        label: t`formulations.hero.stat-formulations`,
      },
      {
        value: uniqueMaterials.size,
        label: t`formulations.hero.stat-materials`,
      },
      {
        value: t`formulations.hero.stat-producers-value`,
        label: t`formulations.hero.stat-producers`,
      },
    ]
  }, [formulations, t])

  const hreflangOverrides = pageContext?.hasEnglishVersion
    ? { pl: "/formulations/", en: "/en/formulations/" }
    : { pl: "/formulations/" }

  const breadcrumbItems = [
    { label: t`formulations.breadcrumb-home`, to: "/" },
    { label: t`formulations.breadcrumb` },
  ]

  const handleAddMaterials = useCallback(
    names => setMaterials(prev => addUnique(prev, names)),
    []
  )

  const handleRemoveMaterial = useCallback(
    name =>
      setMaterials(prev =>
        prev.filter(item => normalizeText(item) !== normalizeText(name))
      ),
    []
  )

  const handleAddPdfFormulations = useCallback(
    names => setPdfFormulations(prev => addUnique(prev, names)),
    []
  )

  const handleRemovePdfFormulation = useCallback(
    name =>
      setPdfFormulations(prev =>
        prev.filter(item => normalizeText(item) !== normalizeText(name))
      ),
    []
  )

  const handleClearPdfFormulations = useCallback(() => {
    setPdfFormulations([])
  }, [])

  const handleAskPdf = useCallback(title => {
    setPdfFormulations(prev => addUnique(prev, [title]))
    setPdfRequestToken(prev => prev + 1)
    scrollToId(FORM_ID)
  }, [])

  const handleSent = useCallback(() => {
    setMaterials([])
    setPdfFormulations([])
  }, [])

  return (
    <Layout>
      <Seo
        title={t`seo.formulations.title`}
        description={t`seo.formulations.description`}
        hreflangOverrides={hreflangOverrides}
      />
      <Helmet>
        <link
          rel="preload"
          as="image"
          type="image/webp"
          media="(min-width: 768px)"
          imagesrcset={HERO_IMAGE_SRCSET}
          imagesizes={HERO_IMAGE_SIZES}
          fetchpriority="high"
        />
      </Helmet>
      <BreadcrumbSchema items={breadcrumbItems} />
      <div
        className={`formulations-page${
          language === "en" ? " formulations-page--en" : ""
        }`}
      >
        <FormulationsHero
          breadcrumbsItems={breadcrumbItems}
          stats={stats}
          onCtaClick={() => scrollToId(CATALOG_ID)}
        />
        <FormulationsSteps />
        <FormulationsCatalog
          id={CATALOG_ID}
          formulations={formulations}
          initialDetails={pageContext?.initialDetails}
          groups={pageContext?.groups}
          detailsUrl={pageContext?.detailsUrl}
          detailsVersion={pageContext?.detailsVersion}
          language={language}
          onAddMaterials={handleAddMaterials}
          onAskPdf={handleAskPdf}
          addedMaterials={materials}
          onRemoveMaterial={handleRemoveMaterial}
          addedFormulations={pdfFormulations}
          onRemoveFormulation={handleRemovePdfFormulation}
          formId={FORM_ID}
          onFormCtaClick={() => scrollToId(FORM_ID)}
        />
        <FormulationsForm
          id={FORM_ID}
          materialOptions={materialOptions}
          materials={materials}
          onAddMaterials={handleAddMaterials}
          onRemoveMaterial={handleRemoveMaterial}
          onClearMaterials={() => setMaterials([])}
          formulationOptions={formulationOptions}
          pdfFormulations={pdfFormulations}
          onAddPdfFormulations={handleAddPdfFormulations}
          onRemovePdfFormulation={handleRemovePdfFormulation}
          onClearPdfFormulations={handleClearPdfFormulations}
          pdfRequestToken={pdfRequestToken}
          onSent={handleSent}
        />
      </div>
    </Layout>
  )
}

export default Formulations
