import React, { useState, useContext, useRef, useMemo } from "react"
import { useTranslation, I18nextContext } from "gatsby-plugin-react-i18next"
import { useStaticQuery, graphql } from "gatsby"
import getCurrentTranslations from "../../../components/contentful-translator"
import { slugify } from "../../../utils/slugify"
import formulationGuidePl from "../data/formulationGuide.pl"
import formulationGuideEn from "../data/formulationGuide.en"
import "../styles/cosmetologyFormulationGuide.css"

// strips "(INCI: ...)" suffixes and trademark marks so display names like
// "Sorbitol LGK (INCI: Hydrogenated Starch Hydrolysate)" or "TuriKer®" can
// still be matched against the plain Contentful material title
const normalizeMaterialName = name =>
  name
    .replace(/\([^)]*\)/g, "")
    .replace(/[®™]/g, "")
    .trim()
    .toLowerCase()

// A few Contentful titles insert descriptive words *between* parts of the
// display name (e.g. "Mocznik Ph. Eur./USP" vs Contentful's "Mocznik
// farmaceutyczny Ph. Eur. (Urea)"), which breaks substring matching. Word-
// overlap heuristics were considered but rejected: this catalog relies on
// short numeric variant codes (NEOWAX B1 vs B200, NEOQUAT CTA 25 vs CTA 30,
// PANGUAR AF-3 vs AF-303) to distinguish otherwise-identical product names,
// and any fuzzy scoring loose enough to bridge "farmaceutyczny" would also
// risk linking one variant's page under another variant's name. So these
// go in a small, manually-verified list instead of being guessed.
// Contentful titles are per-language, so an override target can differ by
// locale even when the display name (a trade name/code) is identical in
// both languages' content files.
const MATERIAL_NAME_OVERRIDES = {
  pl: {
    "mocznik ph. eur./usp": "Mocznik farmaceutyczny Ph. Eur. (Urea)",
    "cestopal 25 m ins": "CESTOPAL 25 INS",
  },
  en: {
    "mocznik ph. eur./usp": "Pharmaceutical-grade Urea (Ph. Eur.)",
    "cestopal 25 m ins": "CESTOPAL 25 INS",
  },
}

// Contentful titles often differ from the display name only by whitespace
// (e.g. "NEOPAL  APG200" vs "NEOPAL APG 200"), or embed the product code
// inside a longer descriptive title (e.g. "Lanolina bezwodna klasy
// farmaceutycznej EWALAN 30-PA"), so a plain equality check misses most of
// them — try exact match, then match ignoring all whitespace, then fall
// back to the code appearing as a substring of the Contentful title.
const buildMaterialsIndex = translations => {
  const exact = new Map()
  const noSpace = new Map()
  const entries = []

  translations.forEach(edge => {
    const norm = normalizeMaterialName(edge.node.title)
    const stripped = norm.replace(/\s+/g, "")
    if (!exact.has(norm)) exact.set(norm, edge.node)
    if (!noSpace.has(stripped)) noSpace.set(stripped, edge.node)
    entries.push({ stripped, node: edge.node })
  })

  return { exact, noSpace, entries }
}

const findMaterial = (name, language, index) => {
  const norm = normalizeMaterialName(name)

  const override = MATERIAL_NAME_OVERRIDES[language]?.[norm]
  if (override) {
    const overrideMatch = index.exact.get(normalizeMaterialName(override))
    if (overrideMatch) return overrideMatch
  }

  const stripped = norm.replace(/\s+/g, "")

  if (index.exact.has(norm)) return index.exact.get(norm)
  if (index.noSpace.has(stripped)) return index.noSpace.get(stripped)
  if (stripped.length <= 3) return null

  const contained = index.entries.find(entry =>
    entry.stripped.includes(stripped)
  )
  return contained ? contained.node : null
}

const ToggleIcon = ({ open }) => (
  <svg
    className="cosmetology-guide-toggle-icon"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ transform: open ? "rotate(0deg)" : "rotate(180deg)" }}
  >
    <path
      d="M3 7L8 2L13 7M8 2V14"
      stroke="#144487"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ArrowConnector = ({ isFirst }) =>
  isFirst ? (
    <svg
      className="cosmetology-guide-connector"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12.295 11.41L16.875 16L12.295 20.59L13.705 22L19.705 16L13.705 10L12.295 11.41Z"
        fill="#393939"
      />
    </svg>
  ) : (
    <svg
      className="cosmetology-guide-connector"
      width="27.41"
      height="32"
      viewBox="0 0 27.41 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10 11.41L14.58 16L10 20.59L11.41 22L17.41 16L11.41 10L10 11.41Z"
        fill="#393939"
      />
    </svg>
  )

const HeroArrowIcon = () => (
  <svg
    className="cosmetology-guide-cta-arrow"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M2.982 5.58C3.182 5.38 3.452 5.268 3.734 5.268C4.016 5.268 4.286 5.38 4.486 5.58L7.992 9.086L11.498 5.58C11.596 5.478 11.714 5.398 11.844 5.342C11.974 5.286 12.114 5.256 12.254 5.256C12.396 5.256 12.536 5.282 12.666 5.336C12.796 5.39 12.916 5.468 13.016 5.568C13.116 5.668 13.196 5.786 13.248 5.918C13.302 6.048 13.328 6.19 13.328 6.33C13.328 6.472 13.298 6.612 13.242 6.74C13.186 6.868 13.106 6.988 13.004 7.086L8.746 11.344C8.546 11.544 8.276 11.656 7.994 11.656C7.712 11.656 7.442 11.544 7.242 11.344L2.984 7.086C2.784 6.886 2.672 6.616 2.672 6.334C2.672 6.052 2.784 5.782 2.984 5.582L2.982 5.58Z"
      fill="currentColor"
    />
  </svg>
)

const MaterialLink = ({ name, language, materialsIndex }) => {
  const match = findMaterial(name, language, materialsIndex)

  if (!match) return <>{name}</>

  const href =
    language === "pl"
      ? `/materials/${slugify(match.title)}`
      : `/${language}/materials/${slugify(match.title)}`

  return (
    <a
      className="cosmetology-guide-material-link"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {name}
    </a>
  )
}

const HEADER_SCROLL_OFFSET = 80 // matches the fixed nav height / scroll-margin-top

const CosmetologyFormulationGuide = ({ onCtaClick }) => {
  const { t } = useTranslation()
  const { language } = useContext(I18nextContext)
  const [openIndex, setOpenIndex] = useState(0)
  const headerRefs = useRef([])
  const panelRefs = useRef([])

  const materialsData = useStaticQuery(graphql`
    query {
      allContentfulMaterials {
        edges {
          node {
            node_locale
            title
          }
        }
      }
    }
  `)

  const materialsIndex = useMemo(() => {
    const translations = getCurrentTranslations(
      materialsData?.allContentfulMaterials?.edges || [],
      language
    )
    return buildMaterialsIndex(translations)
  }, [materialsData, language])

  const tabs = language === "pl" ? formulationGuidePl : formulationGuideEn

  const toggleTab = index => {
    const wasOpen = openIndex === index
    const prevOpenIndex = openIndex
    setOpenIndex(prev => (prev === index ? null : index))

    if (wasOpen) return

    const headerEl = headerRefs.current[index]
    if (!headerEl) return

    let headerTop = headerEl.getBoundingClientRect().top

    // the previously open item's panel is about to collapse to ~0 height;
    // if it sits above this header, that shift moves the header upward, so
    // account for it now instead of measuring after an animation that may
    // not even run (e.g. while the collapsing panel is scrolled off-screen)
    if (prevOpenIndex !== null && prevOpenIndex !== index) {
      const closingPanel = panelRefs.current[prevOpenIndex]
      if (closingPanel) {
        const closingRect = closingPanel.getBoundingClientRect()
        if (closingRect.top < headerTop) {
          headerTop -= closingRect.height
        }
      }
    }

    window.scrollTo({
      top: window.scrollY + headerTop - HEADER_SCROLL_OFFSET,
      behavior: "smooth",
    })
  }

  const goAskAboutMaterial = () => {
    if (onCtaClick) onCtaClick("question")
  }

  return (
    <div className="cosmetology-guide-container">
      <div className="container cosmetology-guide-inner">
        <div className="cosmetology-guide-header">
          <h2 className="h2-style cosmetology-guide-title">
            <span>{t`cosmetology.guide.title1`}</span>
            <span>{t`cosmetology.guide.title2`}</span>
          </h2>
          <p className="p--p1 cosmetology-guide-description">{t`cosmetology.guide.description`}</p>
        </div>
        <div className="cosmetology-guide-accordion">
          {tabs.map((tab, index) => {
            const isOpen = index === openIndex

            return (
              <div className="cosmetology-guide-card" key={tab.label}>
                <button
                  type="button"
                  ref={el => (headerRefs.current[index] = el)}
                  className={`cosmetology-guide-tab-header${
                    isOpen ? " cosmetology-guide-tab-header--open" : ""
                  }`}
                  onClick={() => toggleTab(index)}
                  aria-expanded={isOpen}
                >
                  <ol
                    className="cosmetology-guide-tab-label"
                    start={index + 1}
                  >
                    <li>{tab.label}</li>
                  </ol>
                  <span className="cosmetology-guide-toggle">
                    <ToggleIcon open={isOpen} />
                  </span>
                </button>
                <div
                  ref={el => (panelRefs.current[index] = el)}
                  className={`cosmetology-guide-panel${
                    isOpen ? " cosmetology-guide-panel--open" : ""
                  }`}
                  aria-hidden={!isOpen}
                >
                  <div className="cosmetology-guide-panel-inner">
                    <div className="cosmetology-guide-tab-content">
                      <div className="cosmetology-guide-question-row">
                        <p className="cosmetology-guide-question">
                          {tab.question}
                        </p>
                        <p className="p--p1 cosmetology-guide-question-description">
                          {tab.description}
                        </p>
                      </div>
                      <div className="cosmetology-guide-table">
                        <div className="cosmetology-guide-table-head">
                          <p>{t`cosmetology.guide.column-need`}</p>
                          <p>{t`cosmetology.guide.column-material`}</p>
                        </div>
                        {tab.rows.map((row, rowIndex) => {
                          const isFirst = rowIndex === 0

                          return (
                            <div
                              className={`cosmetology-guide-table-row${
                                isFirst
                                  ? " cosmetology-guide-table-row--first"
                                  : ""
                              }`}
                              key={row.need}
                            >
                              <p className="p--p1 cosmetology-guide-need">
                                {row.need}
                              </p>
                              <div className="cosmetology-guide-connector-wrap">
                                <ArrowConnector isFirst={isFirst} />
                              </div>
                              <p className="p--p1 cosmetology-guide-answer">
                                {row.materials.map((name, materialIndex) => (
                                  <React.Fragment key={name}>
                                    {materialIndex > 0 && " / "}
                                    <MaterialLink
                                      name={name}
                                      language={language}
                                      materialsIndex={materialsIndex}
                                    />
                                  </React.Fragment>
                                ))}
                                {row.text}
                              </p>
                            </div>
                          )
                        })}
                        <p className="cosmetology-guide-tip">{t`cosmetology.guide.tip`}</p>
                        <div className="cosmetology-guide-cta">
                          <div className="cosmetology-guide-cta-text">
                            <p className="title">{tab.cta.title}</p>
                            <p className="p--p1">{tab.cta.description}</p>
                          </div>
                          <button
                            type="button"
                            className="cosmetology-guide-cta-btn"
                            onClick={goAskAboutMaterial}
                          >
                            {t`cosmetology.guide.cta-button`}
                            <HeroArrowIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CosmetologyFormulationGuide
