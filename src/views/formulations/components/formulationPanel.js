import React, { useEffect, useRef, useState } from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import {
  ArrowIcon,
  CheckIcon,
  CloseSmallIcon,
  InfoIcon,
  TrashIcon,
} from "../icons/formulationsIcons"
import { normalizeText } from "../utils"

const ADDED_MESSAGE_MS = 8000

const FormulationPanel = ({
  id,
  formulation,
  panelRef,
  loadError = false,
  onRetry,
  onClose,
  onAddMaterials,
  onAskPdf,
  addedMaterials = [],
  onRemoveMaterial,
  addedFormulations = [],
  onRemoveFormulation,
  formId,
  onGoToForm,
}) => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState([])
  const [showSelectionError, setShowSelectionError] = useState(false)
  const [addedNames, setAddedNames] = useState([])
  const [pdfAddedMessage, setPdfAddedMessage] = useState(false)
  const messageTimerRef = useRef(null)
  const messageHeldRef = useRef(false)
  const { title, description, testingTips, ingredients } = formulation
  const addedKeys = new Set(addedMaterials.map(normalizeText))
  const isAdded = ingredient => addedKeys.has(normalizeText(ingredient.name))
  const hasAddedHere = ingredients.some(isAdded)

  const addedFormulationKeys = new Set(addedFormulations.map(normalizeText))
  const isPdfAdded = addedFormulationKeys.has(normalizeText(title))

  const clearMessageTimer = () => {
    clearTimeout(messageTimerRef.current)
    messageTimerRef.current = null
  }

  const startMessageTimer = () => {
    clearMessageTimer()
    messageTimerRef.current = setTimeout(() => {
      if (messageHeldRef.current) return
      setAddedNames([])
      setPdfAddedMessage(false)
    }, ADDED_MESSAGE_MS)
  }

  const holdMessage = () => {
    messageHeldRef.current = true
    clearMessageTimer()
  }

  const releaseMessage = () => {
    messageHeldRef.current = false
    startMessageTimer()
  }

  useEffect(() => clearMessageTimer, [])

  const toggleIngredient = ingredientId => {
    setShowSelectionError(false)
    clearMessageTimer()
    setAddedNames([])
    setPdfAddedMessage(false)
    setSelected(prev =>
      prev.includes(ingredientId)
        ? prev.filter(item => item !== ingredientId)
        : [...prev, ingredientId]
    )
  }

  const handleAdd = () => {
    const names = ingredients
      .filter(
        ingredient => selected.includes(ingredient.id) && !isAdded(ingredient)
      )
      .map(ingredient => ingredient.name)

    if (names.length === 0) {
      clearMessageTimer()
      setAddedNames([])
      setPdfAddedMessage(false)
      setShowSelectionError(true)
      return
    }

    onAddMaterials(names)
    setShowSelectionError(false)
    setPdfAddedMessage(false)
    setAddedNames(names)
    setSelected([])
    messageHeldRef.current = false
    startMessageTimer()
  }

  const handleAskPdfClick = () => {
    onAskPdf(title)
    setShowSelectionError(false)
    setAddedNames([])
    setPdfAddedMessage(true)
    messageHeldRef.current = false
    startMessageTimer()
  }

  const handleRemove = ingredient => {
    clearMessageTimer()
    setAddedNames([])
    setPdfAddedMessage(false)
    setSelected(prev => prev.filter(item => item !== ingredient.id))
    onRemoveMaterial(ingredient.name)
  }

  const handleGoToForm = event => {
    if (!onGoToForm) return
    event.preventDefault()
    onGoToForm()
  }

  const hasStatusMessage = addedNames.length > 0 || pdfAddedMessage

  return (
    <section
      id={id}
      ref={panelRef}
      className="formulations-panel"
      aria-label={title}
    >
      <div className="formulations-panel-info">
        <h2 className="h2-style formulations-panel-title">{title}</h2>
        {description && (
          <p className="p--p1 formulations-panel-description">{description}</p>
        )}
        {testingTips && (
          <div className="formulations-panel-tips">
            <div className="formulations-panel-tips-header">
              <InfoIcon className="formulations-note-icon" />
              <p className="formulations-panel-tips-title">{t`formulations.panel.tips-title`}</p>
            </div>
            <p className="formulations-panel-tips-text">{testingTips}</p>
          </div>
        )}
      </div>
      <div className="formulations-panel-materials">
        <button
          type="button"
          className="formulations-panel-close formulations-focus"
          onClick={onClose}
        >
          {t`formulations.panel.close`}
          <CloseSmallIcon />
        </button>
        {loadError && (
          <div className="formulations-panel-error" role="alert">
            <p className="p--p1">{t`formulations.panel.load-error`}</p>
            <button
              type="button"
              className="formulations-button formulations-button--light"
              onClick={onRetry}
            >
              {t`formulations.panel.retry`}
            </button>
          </div>
        )}
        {ingredients.length > 0 && (
          <div className="formulations-panel-list">
            <div className="formulations-panel-list-header">
              <p className="formulations-panel-list-title">{t`formulations.panel.materials-title`}</p>
              <p className="formulations-panel-list-hint">{t`formulations.panel.materials-hint`}</p>
            </div>
            {ingredients.map(ingredient => {
              const checkboxId = `${id}-${ingredient.id}`
              const added = isAdded(ingredient)
              const removeLabel = t("formulations.panel.remove", {
                name: ingredient.name,
              })

              return (
                <div
                  className={`formulations-ingredient${
                    added ? " formulations-ingredient--added" : ""
                  }`}
                  key={ingredient.id}
                >
                  {added ? (
                    <div className="formulations-ingredient-header">
                      <p className="formulations-ingredient-name formulations-ingredient-name--added">
                        {ingredient.name}
                      </p>
                      <span className="formulations-ingredient-status">
                        <CheckIcon />
                        {t`formulations.panel.status-added`}
                      </span>
                      {onRemoveMaterial && (
                        <button
                          type="button"
                          className="formulations-ingredient-remove formulations-focus"
                          aria-label={removeLabel}
                          title={removeLabel}
                          onClick={() => handleRemove(ingredient)}
                        >
                          <TrashIcon />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="formulations-ingredient-header">
                      <input
                        type="checkbox"
                        id={checkboxId}
                        className="formulations-checkbox formulations-ingredient-checkbox"
                        checked={selected.includes(ingredient.id)}
                        onChange={() => toggleIngredient(ingredient.id)}
                      />
                      <label
                        className="formulations-ingredient-name"
                        htmlFor={checkboxId}
                      >
                        {ingredient.name}
                      </label>
                    </div>
                  )}
                  {(ingredient.inci || ingredient.description) && (
                    <div
                      className="formulations-card-divider"
                      aria-hidden="true"
                    />
                  )}
                  {ingredient.inci && (
                    <p className="formulations-ingredient-inci">
                      <span>INCI: </span>
                      {ingredient.inci}
                    </p>
                  )}
                  {ingredient.description && (
                    <p className="p--p1">{ingredient.description}</p>
                  )}
                </div>
              )
            })}
          </div>
        )}
        <div className="formulations-panel-actions">
          {ingredients.length > 0 && (
            <button
              type="button"
              className="formulations-button formulations-button--primary"
              onClick={handleAdd}
            >
              {t`formulations.panel.add`}
              <ArrowIcon className="formulations-arrow-right" />
            </button>
          )}
          <div className="formulations-panel-pdf">
          <button
            type="button"
            className="formulations-button formulations-button--light"
            onClick={handleAskPdfClick}
          >
            {isPdfAdded
              ? t`formulations.panel.pdf-added`
              : t`formulations.panel.ask-pdf`}
            {isPdfAdded ? (
              <CheckIcon />
            ) : (
              <ArrowIcon className="formulations-arrow-right" />
            )}
          </button>
          {isPdfAdded && onRemoveFormulation && (
            <button
              type="button"
              className="formulations-ingredient-remove formulations-focus"
              aria-label={t("formulations.panel.remove-formulation", {
                name: title,
              })}
              title={t("formulations.panel.remove-formulation", {
                name: title,
              })}
              onClick={() => {
                clearMessageTimer()
                setPdfAddedMessage(false)
                onRemoveFormulation(title)
              }}
            >
              <TrashIcon />
            </button>
          )}
          </div>
        </div>
        {(ingredients.length > 0 || hasStatusMessage || isPdfAdded) && (
          <p
            className={`formulations-panel-note${
              showSelectionError ? " formulations-panel-note--error" : ""
            }${hasStatusMessage ? " formulations-panel-note--added" : ""}`}
            role="status"
            onMouseEnter={hasStatusMessage ? holdMessage : undefined}
            onMouseLeave={hasStatusMessage ? releaseMessage : undefined}
            onFocus={hasStatusMessage ? holdMessage : undefined}
            onBlur={hasStatusMessage ? releaseMessage : undefined}
          >
            {addedNames.length > 0 ? (
              <>
                <CheckIcon className="formulations-panel-note-icon" />
                <span>
                  {t`formulations.panel.added`} {addedNames.join(", ")}.{" "}
                  <a
                    className="formulations-panel-note-link formulations-focus"
                    href={`#${formId}`}
                    onClick={handleGoToForm}
                  >
                    {t`formulations.panel.go-to-form`}
                  </a>
                </span>
              </>
            ) : pdfAddedMessage ? (
              <>
                <CheckIcon className="formulations-panel-note-icon" />
                <span>
                  {t`formulations.panel.added-formulation`} {title}.{" "}
                  <a
                    className="formulations-panel-note-link formulations-focus"
                    href={`#${formId}`}
                    onClick={handleGoToForm}
                  >
                    {t`formulations.panel.go-to-form`}
                  </a>
                </span>
              </>
            ) : (
              <>
                <span className="formulations-panel-note-star">* </span>
                {hasAddedHere || isPdfAdded ? (
                  <>
                    {t`formulations.panel.note-with-link`}{" "}
                    <a
                      className="formulations-panel-note-link formulations-focus"
                      href={`#${formId}`}
                      onClick={handleGoToForm}
                    >
                      {t`formulations.panel.note-link`}
                    </a>
                    .
                  </>
                ) : (
                  t`formulations.panel.note`
                )}
              </>
            )}
          </p>
        )}
      </div>
    </section>
  )
}

export default FormulationPanel
