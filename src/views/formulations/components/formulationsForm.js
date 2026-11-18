import React, { useEffect, useMemo, useRef, useState } from "react"
import { useTranslation, Link } from "gatsby-plugin-react-i18next"
import {
  ArrowIcon,
  ChevronIcon,
  ChipCloseIcon,
} from "../icons/formulationsIcons"
import { escapeHtml, normalizeText } from "../utils"
import "../styles/formulationsForm.css"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NEEDS = ["pdf", "samples", "availability", "documentation"]
const NEEDS_COLUMNS = [
  ["pdf", "availability"],
  ["samples", "documentation"],
]

const EMPTY_FORM = {
  company: "",
  email: "",
  needs: [],
  project: "",
  personalData: false,
  marketingConsent: false,
}

const RotatingIcon = () => (
  <svg
    className="formulations-form-spinner"
    width="16"
    height="16"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M9.05965 3.69C7.96773 4.14199 6.97552 4.8046 6.13965 5.64"
      stroke="currentColor"
      strokeWidth="2.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.19 8.56C3.73656 9.6503 3.5021 10.8192 3.5 12"
      stroke="currentColor"
      strokeWidth="2.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.19043 15.44C4.64242 16.5319 5.30502 17.5241 6.14043 18.36"
      stroke="currentColor"
      strokeWidth="2.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.05957 20.31C10.1499 20.7634 11.3187 20.9979 12.4996 21"
      stroke="currentColor"
      strokeWidth="2.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.9404 20.31C17.0323 19.858 18.0246 19.1954 18.8604 18.36"
      stroke="currentColor"
      strokeWidth="2.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.8096 15.44C21.263 14.3497 21.4975 13.1808 21.4996 12"
      stroke="currentColor"
      strokeWidth="2.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.8104 8.56002C20.3584 7.4681 19.6958 6.47588 18.8604 5.64001"
      stroke="currentColor"
      strokeWidth="2.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.94 3.69C14.8497 3.23656 13.6808 3.0021 12.5 3"
      stroke="currentColor"
      strokeWidth="2.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M5 12L10 17L20 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const MaterialsPicker = ({ options, materials, onAdd, onRemove, onClear }) => {
  const { t } = useTranslation()
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(0)
  const wrapperRef = useRef(null)
  const listId = "formulations-materials-list"

  const selectedKeys = useMemo(
    () => new Set(materials.map(name => normalizeText(name))),
    [materials]
  )

  const filteredOptions = useMemo(() => {
    const normalizedQuery = normalizeText(query)
    return options.filter(
      name =>
        !selectedKeys.has(normalizeText(name)) &&
        (!normalizedQuery || normalizeText(name).includes(normalizedQuery))
    )
  }, [options, query, selectedKeys])

  useEffect(() => {
    if (!open) return undefined
    const handleClick = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    document.addEventListener("touchstart", handleClick)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("touchstart", handleClick)
    }
  }, [open])

  useEffect(() => setHighlighted(0), [query, open])

  const add = name => {
    const trimmed = name.trim()
    if (!trimmed) return
    onAdd([trimmed])
    setQuery("")
    setOpen(false)
  }

  const handleKeyDown = event => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setOpen(true)
      setHighlighted(prev => Math.min(prev + 1, filteredOptions.length - 1))
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setHighlighted(prev => Math.max(prev - 1, 0))
    } else if (event.key === "Enter") {
      event.preventDefault()
      if (open && filteredOptions[highlighted]) {
        add(filteredOptions[highlighted])
      } else {
        add(query)
      }
    } else if (event.key === "Escape") {
      setOpen(false)
    }
  }

  return (
    <div className="formulations-form-materials">
      <div className="formulations-form-field">
        <label htmlFor="formulations-form-material">{t`formulations.form.label-materials`}</label>
        <div className="formulations-combobox" ref={wrapperRef}>
          <input
            id="formulations-form-material"
            className="formulations-combobox-input"
            type="text"
            role="combobox"
            autoComplete="off"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            placeholder={t`formulations.form.materials-placeholder`}
            value={query}
            onChange={event => {
              setQuery(event.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="formulations-combobox-toggle"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setOpen(prev => !prev)}
          >
            <ChevronIcon
              className={`formulations-combobox-chevron${
                open ? " formulations-combobox-chevron--open" : ""
              }`}
            />
          </button>
          {open && (
            <ul
              className="formulations-combobox-list"
              id={listId}
              role="listbox"
            >
              {filteredOptions.map((name, index) => (
                <li
                  key={name}
                  role="option"
                  aria-selected={index === highlighted}
                  className={`formulations-combobox-option${
                    index === highlighted
                      ? " formulations-combobox-option--active"
                      : ""
                  }`}
                  onMouseDown={event => {
                    event.preventDefault()
                    add(name)
                  }}
                  onMouseEnter={() => setHighlighted(index)}
                >
                  {name}
                </li>
              ))}
              {filteredOptions.length === 0 && (
                <li className="formulations-combobox-empty" role="presentation">
                  {query.trim()
                    ? t("formulations.form.materials-add-custom", {
                        name: query.trim(),
                      })
                    : t`formulations.form.materials-no-results`}
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
      {materials.length > 0 && (
        <>
          <div
            className="formulations-form-materials-line"
            aria-hidden="true"
          />
          <div className="formulations-form-selected">
            <div className="formulations-form-selected-header">
              <p>
                {t("formulations.form.materials-selected", {
                  count: materials.length,
                })}
              </p>
              <button
                type="button"
                className="formulations-form-clear formulations-focus"
                onClick={onClear}
              >
                {t`formulations.form.materials-clear`}
              </button>
            </div>
            <ul className="formulations-chips">
              {materials.map(name => (
                <li className="formulations-chip" key={name}>
                  {name}
                  <button
                    type="button"
                    className="formulations-chip-remove formulations-focus"
                    aria-label={t("formulations.form.materials-remove", {
                      name,
                    })}
                    onClick={() => onRemove(name)}
                  >
                    <ChipCloseIcon />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

const PdfFormulationsSummary = ({
  options = [],
  formulations = [],
  onAdd,
  onRemove,
  onClear,
}) => {
  const { t } = useTranslation()
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(0)
  const wrapperRef = useRef(null)
  const listId = "formulations-pdf-list"

  const selectedKeys = useMemo(
    () => new Set(formulations.map(name => normalizeText(name))),
    [formulations]
  )

  const filteredOptions = useMemo(() => {
    const normalizedQuery = normalizeText(query)
    return options.filter(
      name =>
        !selectedKeys.has(normalizeText(name)) &&
        (!normalizedQuery || normalizeText(name).includes(normalizedQuery))
    )
  }, [options, query, selectedKeys])

  useEffect(() => {
    if (!open) return undefined
    const handleClick = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    document.addEventListener("touchstart", handleClick)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("touchstart", handleClick)
    }
  }, [open])

  useEffect(() => setHighlighted(0), [query, open])

  const add = name => {
    const trimmed = name.trim()
    if (!trimmed || !onAdd) return
    onAdd([trimmed])
    setQuery("")
    setOpen(false)
  }

  const handleKeyDown = event => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setOpen(true)
      setHighlighted(prev => Math.min(prev + 1, filteredOptions.length - 1))
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setHighlighted(prev => Math.max(prev - 1, 0))
    } else if (event.key === "Enter") {
      event.preventDefault()
      if (open && filteredOptions[highlighted]) {
        add(filteredOptions[highlighted])
      } else {
        add(query)
      }
    } else if (event.key === "Escape") {
      setOpen(false)
    }
  }

  return (
    <div className="formulations-form-materials formulations-form-pdf-formulations">
      {options.length > 0 && onAdd && (
        <div className="formulations-form-field">
          <label htmlFor="formulations-form-pdf-select">
            {t`formulations.form.label-formulations`}
          </label>
          <div className="formulations-combobox" ref={wrapperRef}>
            <input
              id="formulations-form-pdf-select"
              className="formulations-combobox-input"
              type="text"
              role="combobox"
              autoComplete="off"
              aria-expanded={open}
              aria-controls={listId}
              aria-autocomplete="list"
              placeholder={t`formulations.form.formulations-placeholder`}
              value={query}
              onChange={event => {
                setQuery(event.target.value)
                setOpen(true)
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              className="formulations-combobox-toggle"
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => setOpen(prev => !prev)}
            >
              <ChevronIcon
                className={`formulations-combobox-chevron${
                  open ? " formulations-combobox-chevron--open" : ""
                }`}
              />
            </button>
            {open && (
              <ul
                className="formulations-combobox-list"
                id={listId}
                role="listbox"
              >
                {filteredOptions.map((name, index) => (
                  <li
                    key={name}
                    role="option"
                    aria-selected={index === highlighted}
                    className={`formulations-combobox-option${
                      index === highlighted
                        ? " formulations-combobox-option--active"
                        : ""
                    }`}
                    onMouseDown={event => {
                      event.preventDefault()
                      add(name)
                    }}
                    onMouseEnter={() => setHighlighted(index)}
                  >
                    {name}
                  </li>
                ))}
                {filteredOptions.length === 0 && (
                  <li
                    className="formulations-combobox-empty"
                    role="presentation"
                  >
                    {query.trim()
                      ? t("formulations.form.formulations-add-custom", {
                          name: query.trim(),
                        })
                      : t`formulations.form.formulations-no-results`}
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      )}
      {formulations.length > 0 && (
        <>
          {options.length > 0 && onAdd && (
            <div
              className="formulations-form-materials-line"
              aria-hidden="true"
            />
          )}
          <div className="formulations-form-selected">
            <div className="formulations-form-selected-header">
              <p>
                {t("formulations.form.formulations-selected", {
                  count: formulations.length,
                })}
              </p>
              {onClear && (
                <button
                  type="button"
                  className="formulations-form-clear formulations-focus"
                  onClick={onClear}
                >
                  {t`formulations.form.formulations-clear`}
                </button>
              )}
            </div>
            <ul className="formulations-chips">
              {formulations.map(name => (
                <li className="formulations-chip" key={name}>
                  {name}
                  {onRemove && (
                    <button
                      type="button"
                      className="formulations-chip-remove formulations-focus"
                      aria-label={t("formulations.form.formulations-remove", {
                        name,
                      })}
                      onClick={() => onRemove(name)}
                    >
                      <ChipCloseIcon />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

const FormulationsForm = ({
  id,
  materialOptions,
  materials,
  onAddMaterials,
  onRemoveMaterial,
  onClearMaterials,
  formulationOptions = [],
  pdfFormulations = [],
  onAddPdfFormulations,
  onRemovePdfFormulation,
  onClearPdfFormulations,
  pdfRequestToken,
  onSent,
}) => {
  const { t } = useTranslation()
  const [form, setForm] = useState(EMPTY_FORM)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [isRequiredFields, setIsRequiredFieldsError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [someError, setSomeError] = useState(false)

  useEffect(() => {
    if (!pdfRequestToken) return
    setSent(false)
    setForm(prev =>
      prev.needs.includes("pdf")
        ? prev
        : { ...prev, needs: [...prev.needs, "pdf"] }
    )
  }, [pdfRequestToken])

  const handleChange = event => {
    const { name, value } = event.target
    setSent(false)
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const toggleNeed = need => {
    setForm(prev => {
      const isCurrentlySelected = prev.needs.includes(need)
      const nextNeeds = isCurrentlySelected
        ? prev.needs.filter(item => item !== need)
        : [...prev.needs, need]

      if (need === "pdf" && isCurrentlySelected && onClearPdfFormulations) {
        onClearPdfFormulations()
      }

      return {
        ...prev,
        needs: nextNeeds,
      }
    })
  }

  const handleRemoveFormulation = name => {
    if (onRemovePdfFormulation) {
      onRemovePdfFormulation(name)
    }
    if (pdfFormulations.length === 1 && pdfFormulations[0] === name) {
      setForm(prev => ({
        ...prev,
        needs: prev.needs.filter(item => item !== "pdf"),
      }))
    }

    console.log("handleRemoveFormulation", name, pdfFormulations)
  }

  const handleClearFormulations = () => {
    if (onClearPdfFormulations) {
      onClearPdfFormulations()
    }
    setForm(prev => ({
      ...prev,
      needs: prev.needs.filter(item => item !== "pdf"),
    }))
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (sending) return

    setSent(false)
    setIsRequiredFieldsError(false)
    setEmailError(false)
    setSomeError(false)

    if (
      form.company.trim() === "" ||
      form.email.trim() === "" ||
      form.needs.length === 0 ||
      form.personalData === false
    ) {
      setIsRequiredFieldsError(true)
      return
    }

    if (!emailRegex.test(form.email.trim())) {
      setEmailError(true)
      return
    }

    setSending(true)

    const none = t`formulations.form.mail-none`
    const needsLabels = NEEDS.filter(need => form.needs.includes(need)).map(
      need => t(`formulations.form.need-${need}`)
    )
    const pdfLine =
      form.needs.includes("pdf") && pdfFormulations.length > 0
        ? `<br/>${t`formulations.form.mail-formulations`}: ${escapeHtml(
            pdfFormulations.join(", ")
          )}`
        : ""
    const message =
      `${t`formulations.form.label-materials`}: ${escapeHtml(
        materials.join(", ") || none
      )}` +
      `<br/>${t`formulations.form.label-needs`} ${escapeHtml(
        needsLabels.join(", ")
      )}` +
      pdfLine +
      `<br/>${t`formulations.form.label-project`}: ${escapeHtml(
        form.project.trim() || none
      )}`

    const toSend = {
      name: escapeHtml(form.company.trim()),
      firmName: escapeHtml(form.company.trim()),
      phoneNumber: "",
      email: escapeHtml(form.email.trim()),
      subject: t`formulations.form.subject`,
      message,
      marketingConsent: form.marketingConsent,
    }

    try {
      const response = await fetch(
        "https://medicos.com.pl/.netlify/functions/sendmail",
        {
          method: "POST",
          body: JSON.stringify(toSend),
        }
      )

      if (response.ok) {
        setSending(false)
        setSent(true)
        setForm(EMPTY_FORM)
        onSent()
        return
      }

      console.error(
        "[formulations form] sendmail failed",
        response.status,
        await response.text().catch(() => "")
      )
      setSending(false)
      setSomeError(true)
    } catch (error) {
      console.error("[formulations form] sendmail request error", error)
      setSending(false)
      setSomeError(true)
    }
  }

  const errorBorder = isError => (isError ? "1px solid #B21A1A" : "")
  const showPdfFormulationsSection =
    form.needs.includes("pdf") || pdfFormulations.length > 0

  return (
    <div className="formulations-form-container">
      <div className="container formulations-form-inner">
        <div className="formulations-form-intro">
          <h2 className="h2-style formulations-form-title">{t`formulations.form.title`}</h2>
          <p className="p--p1">{t`formulations.form.description`}</p>
          <div className="formulations-form-next">
            <p className="title">{t`formulations.form.next-title`}</p>
            <ul>
              <li>{t`formulations.form.next1`}</li>
              <li>{t`formulations.form.next2`}</li>
              <li>{t`formulations.form.next3`}</li>
            </ul>
          </div>
        </div>
        <div className="formulations-form-panel" id={id}>
          <form
            className="formulations-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <MaterialsPicker
              options={materialOptions}
              materials={materials}
              onAdd={onAddMaterials}
              onRemove={onRemoveMaterial}
              onClear={onClearMaterials}
            />
            <div className="formulations-form-fields-group">
              <div className="formulations-form-fields">
                <div className="formulations-form-field">
                  <label htmlFor="formulations-form-company">{t`formulations.form.label-company`}</label>
                  <input
                    id="formulations-form-company"
                    className="formulations-form-input"
                    name="company"
                    autoComplete="organization"
                    value={form.company}
                    onChange={handleChange}
                    style={{
                      border: errorBorder(
                        form.company.trim() === "" && isRequiredFields
                      ),
                    }}
                  />
                </div>
                <div className="formulations-form-field">
                  <label htmlFor="formulations-form-email">{t`formulations.form.label-email`}</label>
                  <input
                    id="formulations-form-email"
                    className="formulations-form-input"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    style={{
                      border: errorBorder(
                        (form.email.trim() === "" && isRequiredFields) ||
                          emailError
                      ),
                    }}
                  />
                  {emailError && (
                    <p className="p-style p-error">{t`error.contact.email-error`}</p>
                  )}
                </div>
                <fieldset className="formulations-form-field formulations-form-needs">
                  <legend>{t`formulations.form.label-needs`}</legend>
                  <div className="formulations-form-needs-grid">
                    {NEEDS_COLUMNS.map(column => (
                      <div
                        className="formulations-form-needs-column"
                        key={column[0]}
                      >
                        {column.map(need => (
                          <div className="formulations-form-check" key={need}>
                            <input
                              type="checkbox"
                              id={`formulations-form-need-${need}`}
                              className={`formulations-checkbox${
                                form.needs.length === 0 && isRequiredFields
                                  ? " formulations-checkbox--error"
                                  : ""
                              }`}
                              checked={form.needs.includes(need)}
                              onChange={() => toggleNeed(need)}
                            />
                            <label htmlFor={`formulations-form-need-${need}`}>
                              {t(`formulations.form.need-${need}`)}
                            </label>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </fieldset>
                {showPdfFormulationsSection && (
                  <PdfFormulationsSummary
                    options={formulationOptions}
                    formulations={pdfFormulations}
                    onAdd={onAddPdfFormulations}
                    onRemove={handleRemoveFormulation}
                    onClear={handleClearFormulations}
                  />
                )}
                <div className="formulations-form-field">
                  <label htmlFor="formulations-form-project">{t`formulations.form.label-project`}</label>
                  <textarea
                    id="formulations-form-project"
                    className="formulations-form-input formulations-form-textarea"
                    name="project"
                    placeholder={t`formulations.form.project-placeholder`}
                    value={form.project}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="formulations-form-consent">
                <input
                  type="checkbox"
                  id="formulations-form-personal-data"
                  className={`formulations-checkbox${
                    form.personalData === false && isRequiredFields
                      ? " formulations-checkbox--error"
                      : ""
                  }`}
                  checked={form.personalData}
                  onChange={event =>
                    setForm(prev => ({
                      ...prev,
                      personalData: event.target.checked,
                    }))
                  }
                />
                <label
                  htmlFor="formulations-form-personal-data"
                  style={{
                    color:
                      form.personalData === false && isRequiredFields
                        ? "#B21A1A"
                        : "",
                  }}
                >
                  {t`contact-component.personalData-a`} 5214064141
                  {", "}
                  {t`contact-component.personalData-b`}
                  <Link to="/privacy-policy">{t`contact-component.personalData-c`}</Link>{" "}
                  <Link to="/website-regulations">{t`contact-component.personalData-d`}</Link>{" "}
                  {t`contact-component.personalData-e`}
                </label>
              </div>
              <div className="formulations-form-consent">
                <input
                  type="checkbox"
                  id="formulations-form-marketing-consent"
                  className="formulations-checkbox"
                  checked={form.marketingConsent}
                  onChange={event =>
                    setForm(prev => ({
                      ...prev,
                      marketingConsent: event.target.checked,
                    }))
                  }
                />
                <label htmlFor="formulations-form-marketing-consent">
                  {t`contact-component.marketingConsent`}
                </label>
              </div>
            </div>
            {!sending && !sent && (
              <button
                type="submit"
                className="formulations-button formulations-button--primary formulations-form-submit"
              >
                {t`formulations.form.submit`}
                <ArrowIcon className="formulations-arrow-right" />
              </button>
            )}
            {sending && (
              <button
                type="button"
                className="formulations-button formulations-button--primary formulations-form-submit formulations-form-submit--sent"
                aria-disabled="true"
              >
                {t`contact-component.sending-message`}
                <RotatingIcon />
              </button>
            )}
            {!sending && sent && (
              <button
                type="button"
                className="formulations-button formulations-button--primary formulations-form-submit formulations-form-submit--sent"
                aria-disabled="true"
              >
                {t`contact-component.sent-message`}
                <CheckIcon />
              </button>
            )}
            {isRequiredFields && (
              <p
                className="p-style p-error"
                role="alert"
              >{t`error.contact.required-fields`}</p>
            )}
            {someError && (
              <p
                className="p-style p-error"
                role="alert"
              >{t`error.contact.someError`}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormulationsForm
