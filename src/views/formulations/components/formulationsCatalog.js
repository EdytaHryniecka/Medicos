import React, { useEffect, useMemo, useRef, useState } from "react"
import { withPrefix } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import CustomPagination from "../../../components/pagination/pagination"
import FormulationCard from "./formulationCard"
import FormulationPanel from "./formulationPanel"
import FormulationsCtaTile from "./formulationsCtaTile"
import FormulationsSelect from "./formulationsSelect"
import { SearchIcon } from "../icons/formulationsIcons"
import { SCROLL_RESET_DELAY } from "../../../components/layout"
import { normalizeText } from "../utils"
import "../styles/formulationsCatalog.css"

const ITEMS_PER_PAGE = 11
const CTA_SLOT_INDEX = 5
const HEADER_OFFSET = 80
const PANEL_ID = "formulation-details"
const PANEL_TRANSITION_MS = 450
const FADE_MS = 300

const panelTransitionMs = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? 0
    : PANEL_TRANSITION_MS

const CATEGORY_ORDER = {
  pl: [
    "Twarz",
    "Ciało",
    "Włosy i skalp",
    "Oczyszczanie",
    "Ochrona UV",
    "Usta i kolor",
  ],
  en: [
    "Face",
    "Body",
    "Hair & Scalp",
    "Cleansing",
    "Sun Care",
    "Lips & Colour Cosmetics",
  ],
}

const getColumns = () => {
  if (typeof window === "undefined" || !window.matchMedia) return 3
  if (window.matchMedia("(min-width: 1324px)").matches) return 3
  if (window.matchMedia("(min-width: 650px)").matches) return 2
  return 1
}

const useColumns = () => {
  const [columns, setColumns] = useState(3)

  useEffect(() => {
    const update = () => setColumns(getColumns())
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return columns
}

const scrollToElement = element => {
  if (!element) return
  window.scrollTo({
    top: window.scrollY + element.getBoundingClientRect().top - HEADER_OFFSET,
    behavior: "smooth",
  })
}

const detailsRequests = new Map()

const fetchDetails = url => {
  if (!detailsRequests.has(url)) {
    const request = fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
      })
      .catch(error => {
        detailsRequests.delete(url)
        throw error
      })
    detailsRequests.set(url, request)
  }
  return detailsRequests.get(url)
}

const FormulationsCatalog = ({
  id,
  formulations,
  initialDetails,
  groups = [],
  detailsUrl,
  detailsVersion,
  language,
  onAddMaterials,
  onAskPdf,
  addedMaterials,
  onRemoveMaterial,
  addedFormulations,
  onRemoveFormulation,
  formId,
  onFormCtaClick,
}) => {
  const { t } = useTranslation()
  const columns = useColumns()
  const initialId =
    initialDetails && formulations[0]?.id === initialDetails.id
      ? initialDetails.id
      : null
  const [category, setCategory] = useState(null)
  const [group, setGroup] = useState("")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeId, setActiveId] = useState(initialId)
  const [panel, setPanel] = useState({
    id: initialId,
    expanded: Boolean(initialId),
  })
  const [details, setDetails] = useState(() =>
    initialId ? { [initialId]: { data: initialDetails } } : {}
  )
  const skipPanelScrollRef = useRef(Boolean(initialId))
  const requestedIdRef = useRef(null)
  const panelStateRef = useRef(panel)
  panelStateRef.current = panel
  const sectionRef = useRef(null)
  const panelRef = useRef(null)
  const collapseRef = useRef(null)
  const panelTimerRef = useRef(null)
  const isFirstPageRender = useRef(true)
  const gridRef = useRef(null)
  const emptyRef = useRef(null)
  const fadePendingRef = useRef(false)

  const indexed = useMemo(
    () =>
      formulations.map(formulation => {
        const ingredientsText = (formulation.ingredients || [])
          .map(ing => `${ing.name || ""} ${ing.inci || ""}`)
          .join(" ")
        return {
          formulation,
          searchText: normalizeText(`${formulation.title} ${ingredientsText}`),
        }
      }),
    [formulations]
  )

  const categories = useMemo(() => {
    const counts = new Map()
    formulations.forEach(({ category: name }) => {
      if (name) counts.set(name, (counts.get(name) || 0) + 1)
    })
    const order = CATEGORY_ORDER[language] || CATEGORY_ORDER.pl
    const rank = name => {
      const position = order.findIndex(
        item => normalizeText(item) === normalizeText(name)
      )
      return position === -1 ? order.length : position
    }
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort(
        (a, b) =>
          rank(a.name) - rank(b.name) || a.name.localeCompare(b.name, language)
      )
  }, [formulations, language])

  const groupOptions = useMemo(
    () => [
      { value: "", label: t`formulations.catalog.groups-all` },
      ...groups.map(name => ({
        value: name,
        label: t(`formulations.group.${name}`, { defaultValue: name }),
      })),
    ],
    [groups, t]
  )

  const hasActiveFilters = Boolean(category || group || search.trim())

  const filtered = useMemo(() => {
    const query = normalizeText(search)

    return indexed
      .filter(
        ({ formulation, searchText }) =>
          (!category || formulation.category === category) &&
          (!group ||
            formulation.ingredients.some(ingredient =>
              (ingredient.groups || []).includes(group)
            )) &&
          (!query || searchText.includes(query))
      )
      .map(({ formulation }) => formulation)
  }, [indexed, category, group, search])

  const pagesCount = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const safePage = Math.min(currentPage, pagesCount)
  const pageItems = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  )

  const slots = pageItems.map(formulation => ({
    type: "formulation",
    key: formulation.id,
    formulation,
  }))
  slots.splice(Math.min(CTA_SLOT_INDEX, slots.length), 0, {
    type: "cta",
    key: "cta",
  })

  const slotIndexOf = formulationId =>
    slots.findIndex(
      slot =>
        slot.type === "formulation" && slot.formulation.id === formulationId
    )
  const panelSlotIndex = panel.id ? slotIndexOf(panel.id) : -1
  const openDetails = panel.id ? details[panel.id] : null
  const openSlotIndex = openDetails ? panelSlotIndex : -1
  const openFormulation =
    openSlotIndex === -1 ? null : slots[openSlotIndex].formulation
  const layoutRef = useRef(null)
  layoutRef.current = { slots, columns }
  const splitIndex =
    openSlotIndex === -1
      ? slots.length
      : (Math.floor(openSlotIndex / columns) + 1) * columns
  const slotsBefore = slots.slice(0, splitIndex)
  const slotsAfter = slots.slice(splitIndex)

  const clearPanelTimer = () => {
    clearTimeout(panelTimerRef.current)
    panelTimerRef.current = null
  }

  const collapsePanel = nextId => {
    clearPanelTimer()
    setPanel(prev => ({ ...prev, expanded: false }))
    panelTimerRef.current = setTimeout(
      () => setPanel({ id: nextId, expanded: false }),
      panelTransitionMs()
    )
  }

  const closePanelNow = () => {
    clearPanelTimer()
    requestedIdRef.current = null
    setActiveId(null)
    setPanel({ id: null, expanded: false })
  }

  useEffect(() => clearPanelTimer, [])

  useEffect(() => {
    if (!panel.id || panel.expanded || panel.id !== activeId) return
    if (collapseRef.current) collapseRef.current.getBoundingClientRect()
    setPanel(prev =>
      prev.id === activeId ? { ...prev, expanded: true } : prev
    )
  }, [panel, activeId])

  useEffect(() => {
    if (panel.id && panelSlotIndex === -1) closePanelNow()
  }, [panel.id, panelSlotIndex])

  useEffect(() => {
    if (skipPanelScrollRef.current) {
      skipPanelScrollRef.current = false
      return
    }
    if (!panel.expanded || !panelRef.current) return
    const { top } = panelRef.current.getBoundingClientRect()
    if (top > window.innerHeight * 0.6 || top < HEADER_OFFSET) {
      scrollToElement(panelRef.current)
    }
  }, [panel.id, panel.expanded])

  useEffect(() => {
    if (isFirstPageRender.current) {
      isFirstPageRender.current = false
      return
    }
    scrollToElement(sectionRef.current)
  }, [safePage])

  const filteredKey = filtered.map(formulation => formulation.id).join("|")

  useEffect(() => {
    if (!fadePendingRef.current) return
    fadePendingRef.current = false
    if (panelTransitionMs() === 0) return
    for (const element of [gridRef.current, emptyRef.current]) {
      if (element && element.animate) {
        element.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: FADE_MS,
          easing: "ease-out",
        })
      }
    }
  }, [filteredKey])

  const changeFilter = setter => value => {
    fadePendingRef.current = true
    setter(value)
    setCurrentPage(1)
    closePanelNow()
  }

  const resetAllFilters = () => {
    if (!hasActiveFilters) return
    fadePendingRef.current = true
    setCategory(null)
    setGroup("")
    setSearch("")
    setCurrentPage(1)
    closePanelNow()
  }

  const handlePageChange = page => {
    const next = typeof page === "function" ? page(safePage) : page
    closePanelNow()
    setCurrentPage(Math.min(Math.max(next, 1), pagesCount))
  }

  const detailsUrlFor = formulationId =>
    withPrefix(`${detailsUrl}${formulationId}.json?v=${detailsVersion}`)

  const loadDetails = formulationId => {
    if (details[formulationId]?.data) return Promise.resolve()
    if (!detailsUrl) {
      console.error("[formulations] detailsUrl missing in pageContext")
      setDetails(prev => ({ ...prev, [formulationId]: { error: true } }))
      return Promise.resolve()
    }
    return fetchDetails(detailsUrlFor(formulationId)).then(
      data => setDetails(prev => ({ ...prev, [formulationId]: { data } })),
      error => {
        console.error(
          `[formulations] details of ${formulationId} could not be loaded`,
          error
        )
        setDetails(prev => ({ ...prev, [formulationId]: { error: true } }))
      }
    )
  }

  const prefetchDetails = formulationId => {
    if (!detailsUrl || details[formulationId]?.data) return
    fetchDetails(detailsUrlFor(formulationId)).catch(() => {})
  }

  const showPanel = formulationId => {
    const current = panelStateRef.current
    const { slots: currentSlots, columns: currentColumns } = layoutRef.current
    const rowOf = itemId =>
      Math.floor(
        currentSlots.findIndex(
          slot => slot.type === "formulation" && slot.formulation.id === itemId
        ) / currentColumns
      )

    if (!current.id) {
      clearPanelTimer()
      setPanel({ id: formulationId, expanded: false })
    } else if (rowOf(current.id) === rowOf(formulationId)) {
      clearPanelTimer()
      setPanel({ id: formulationId, expanded: true })
    } else {
      collapsePanel(formulationId)
    }
  }

  const closePanel = () => {
    requestedIdRef.current = null
    setActiveId(null)
    collapsePanel(null)
  }

  const toggleFormulation = formulationId => {
    if (activeId === formulationId) {
      closePanel()
      return
    }

    setActiveId(formulationId)
    requestedIdRef.current = formulationId
    loadDetails(formulationId).then(() => {
      if (requestedIdRef.current === formulationId) showPanel(formulationId)
    })
  }

  useEffect(() => {
    const requestedId = new URLSearchParams(window.location.search).get("f")
    if (!requestedId) return
    const index = formulations.findIndex(item => item.id === requestedId)
    if (index === -1) {
      console.warn(`[formulations] formulation "${requestedId}" not found`)
      return
    }
    let scrollTimer = null
    const scrollToPanelLater = () => {
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        if (requestedIdRef.current === requestedId) {
          scrollToElement(panelRef.current)
        }
      }, SCROLL_RESET_DELAY + 50)
    }
    requestedIdRef.current = requestedId
    if (requestedId === initialId) {
      scrollToPanelLater()
      return () => clearTimeout(scrollTimer)
    }
    clearPanelTimer()
    setPanel({ id: null, expanded: false })
    setCurrentPage(Math.floor(index / ITEMS_PER_PAGE) + 1)
    setActiveId(requestedId)
    loadDetails(requestedId).then(() => {
      if (requestedIdRef.current === requestedId) {
        setPanel({ id: requestedId, expanded: false })
        scrollToPanelLater()
      }
    })
    return () => clearTimeout(scrollTimer)
  }, [])

  const renderSlot = slot =>
    slot.type === "cta" ? (
      <FormulationsCtaTile
        key={slot.key}
        formId={formId}
        onClick={onFormCtaClick}
      />
    ) : (
      <FormulationCard
        key={slot.key}
        formulation={slot.formulation}
        isOpen={slot.formulation.id === activeId}
        panelId={PANEL_ID}
        onToggle={() => toggleFormulation(slot.formulation.id)}
        onPrefetch={() => prefetchDetails(slot.formulation.id)}
      />
    )

  return (
    <div className="formulations-catalog-container" id={id} ref={sectionRef}>
      <div className="container">
        <div className="formulations-catalog-top">
          <aside className="formulations-catalog-sidebar">
            <div className="formulations-catalog-categories-block">
              <h2 className="formulations-catalog-title">{t`formulations.catalog.title`}</h2>
              <div className="formulations-catalog-categories">
                <button
                  type="button"
                  className={`formulations-category${
                    category === null ? " formulations-category--active" : ""
                  }`}
                  aria-pressed={category === null}
                  onClick={() => changeFilter(setCategory)(null)}
                >
                  {t`formulations.catalog.all`} ({formulations.length})
                </button>
                {categories.map(item => (
                  <button
                    type="button"
                    key={item.name}
                    className={`formulations-category${
                      category === item.name
                        ? " formulations-category--active"
                        : ""
                    }`}
                    aria-pressed={category === item.name}
                    onClick={() => changeFilter(setCategory)(item.name)}
                  >
                    {item.name} ({item.count})
                  </button>
                ))}
              </div>
            </div>
            <div className="formulations-catalog-groups">
              <label
                className="formulations-catalog-groups-label"
                id="formulations-group-label"
                htmlFor="formulations-group"
              >
                {t`formulations.catalog.groups`}
              </label>
              <FormulationsSelect
                id="formulations-group"
                labelId="formulations-group-label"
                value={group}
                options={groupOptions}
                onChange={changeFilter(setGroup)}
              />
            </div>
          </aside>
          <div className="formulations-catalog-main">
            <div class="formulations-catalog-search">
              <div>
                {hasActiveFilters && (
                  <button
                    type="button"
                    className="formulations-form-clear formulations-focus"
                    onClick={resetAllFilters}
                  >
                    {t("formulations.catalog.reset-filters", {
                      defaultValue: "Wyczyść filtry",
                    })}
                  </button>
                )}
              </div>
              <div
                className="formulations-search"
                style={{
                  flexGrow: 1,
                  // marginLeft: hasActiveFilters ? "16px" : "0",
                }}
              >
                <input
                  type="search"
                  className="formulations-search-input"
                  placeholder={t("formulations.catalog.search", {
                    defaultValue: "Wpisz nazwę kosmetyku, surowca lub INCI",
                  })}
                  aria-label={t("formulations.catalog.search", {
                    defaultValue: "Wpisz nazwę kosmetyku, surowca lub INCI",
                  })}
                  value={search}
                  onChange={event =>
                    changeFilter(setSearch)(event.target.value)
                  }
                />
                <SearchIcon className="formulations-search-icon" />
              </div>
            </div>
            {filtered.length === 0 && (
              <div
                ref={emptyRef}
                className="formulations-catalog-empty"
                role="status"
              >
                <p className="p--p1">{t`formulations.catalog.empty`}</p>
                {hasActiveFilters && (
                  <button
                    type="button"
                    className="formulations-button formulations-button--light"
                    onClick={resetAllFilters}
                  >
                    {t("formulations.catalog.reset-filters", {
                      defaultValue: "Wyczyść filtry",
                    })}
                  </button>
                )}
              </div>
            )}
            <div className="formulations-grid" ref={gridRef}>
              {slotsBefore.map(renderSlot)}
            </div>
          </div>
        </div>
        {openFormulation && (
          <div
            ref={collapseRef}
            className={`formulations-panel-collapse${
              panel.expanded ? " formulations-panel-collapse--expanded" : ""
            }${
              slotsAfter.length > 0
                ? " formulations-panel-collapse--before-grid"
                : ""
            }`}
            aria-hidden={openFormulation.id !== activeId || undefined}
          >
            <div className="formulations-panel-collapse-inner">
              <FormulationPanel
                key={openFormulation.id}
                id={PANEL_ID}
                panelRef={panelRef}
                formulation={{
                  ...openFormulation,
                  description: "",
                  testingTips: "",
                  ingredients: [],
                  ...openDetails.data,
                }}
                loadError={Boolean(openDetails.error)}
                onRetry={() => loadDetails(openFormulation.id)}
                onClose={closePanel}
                onAddMaterials={onAddMaterials}
                onAskPdf={onAskPdf}
                addedMaterials={addedMaterials}
                onRemoveMaterial={onRemoveMaterial}
                addedFormulations={addedFormulations}
                onRemoveFormulation={onRemoveFormulation}
                formId={formId}
                onGoToForm={onFormCtaClick}
              />
            </div>
          </div>
        )}
        {slotsAfter.length > 0 && (
          <div className="formulations-catalog-offset">
            <div className="formulations-grid formulations-grid--after">
              {slotsAfter.map(renderSlot)}
            </div>
          </div>
        )}
        {pagesCount > 1 && (
          <div className="formulations-catalog-offset formulations-pagination">
            <CustomPagination
              itemsCount={filtered.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={safePage}
              setCurrentPage={handlePageChange}
              alwaysShown={false}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default FormulationsCatalog
