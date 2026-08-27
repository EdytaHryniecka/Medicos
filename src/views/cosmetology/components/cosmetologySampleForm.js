import React, { useState } from "react"
import { useTranslation, Link } from "gatsby-plugin-react-i18next"
import "../styles/cosmetologySampleForm.css"

const ArrowIcon = () => (
  <svg
    className="cosmetology-form-btn-arrow"
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

const RotatingIcon = () => (
  <svg
    className="cosmetology-form-btn-spinner"
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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const CosmetologySampleForm = ({ id, activeTab, onTabChange }) => {
  const { t } = useTranslation()

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    position: "",
    material: "",
    application: "",
    personalData: false,
  })

  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [isRequiredFields, setIsRequiredFieldsError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [someError, setSomeError] = useState(false)

  const handleChange = event => {
    const { name, value } = event.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handlePersonalDataChange = event => {
    const value = event.target.checked
    setForm(prev => ({ ...prev, personalData: value }))
  }

  const handleTabChange = tab => {
    onTabChange(tab)
    setIsRequiredFieldsError(false)
    setEmailError(false)
    setSomeError(false)
  }

  const materialLabel =
    activeTab === "sample"
      ? t`cosmetology.sampleForm.label-material`
      : t`cosmetology.sampleForm.label-material-question`

  const applicationLabel =
    activeTab === "sample"
      ? t`cosmetology.sampleForm.label-application`
      : t`cosmetology.sampleForm.label-question-content`

  const handleSubmit = async event => {
    event.preventDefault()

    setSending(false)
    setSent(false)
    setIsRequiredFieldsError(false)
    setEmailError(false)
    setSomeError(false)

    if (form.name === "" || form.email === "" || form.personalData === false) {
      setIsRequiredFieldsError(true)
      return
    }

    if (!emailRegex.test(form.email)) {
      setEmailError(true)
      return
    }

    setSending(true)

    const subject =
      activeTab === "sample"
        ? t`cosmetology.sampleForm.tab-sample`
        : t`cosmetology.sampleForm.tab-question`

    const message = `${materialLabel}: ${form.material}\n${applicationLabel}: ${form.application}\n${t`cosmetology.sampleForm.label-position`} ${form.position}`

    const to_send = {
      name: form.name,
      firmName: form.company,
      phoneNumber: "",
      email: form.email,
      subject,
      message,
    }

    try {
      const response = await fetch(
        "https://medicos.com.pl/.netlify/functions/sendmail",
        {
          method: "POST",
          body: JSON.stringify(to_send),
        }
      )

      if (response.ok) {
        setSending(false)
        setSent(true)
        setForm({
          name: "",
          email: "",
          company: "",
          position: "",
          material: "",
          application: "",
          personalData: false,
        })
        return
      }

      setSending(false)
      setSomeError(true)
    } catch (e) {
      setSending(false)
      setSomeError(true)
    }
  }

  return (
    <div className="cosmetology-form-container" id={id}>
      <div className="container cosmetology-form-inner">
      <div className="cosmetology-form-intro">
        <div className="cosmetology-form-intro-inner">
          <h2 className="h2-style cosmetology-form-title">{t`cosmetology.sampleForm.title`}</h2>
          <p className="p--p1">{t`cosmetology.sampleForm.description`}</p>
        </div>
      </div>
      <div className="cosmetology-form-panel">
        <div className="cosmetology-form-tabs">
          <button
            type="button"
            className={`cosmetology-form-tab${
              activeTab === "sample" ? " cosmetology-form-tab--active" : ""
            }`}
            onClick={() => handleTabChange("sample")}
          >
            {t`cosmetology.sampleForm.tab-sample`}
          </button>
          <button
            type="button"
            className={`cosmetology-form-tab${
              activeTab === "question" ? " cosmetology-form-tab--active" : ""
            }`}
            onClick={() => handleTabChange("question")}
          >
            {t`cosmetology.sampleForm.tab-question`}
          </button>
        </div>
        <form className="cosmetology-form" onSubmit={handleSubmit}>
          <div className="cosmetology-form-fields-group">
          <div className="cosmetology-form-fields">
            <div className="cosmetology-form-field">
              <label htmlFor="cosmetology-form-name">{t`cosmetology.sampleForm.label-name`}</label>
              <input
                id="cosmetology-form-name"
                className="cosmetology-form-input"
                name="name"
                value={form.name}
                onChange={handleChange}
                style={{
                  border:
                    form.name === "" && isRequiredFields
                      ? "1px solid #B21A1A"
                      : "",
                }}
              />
            </div>
            <div className="cosmetology-form-field">
              <label htmlFor="cosmetology-form-email">{t`cosmetology.sampleForm.label-email`}</label>
              <input
                id="cosmetology-form-email"
                className="cosmetology-form-input"
                name="email"
                value={form.email}
                onChange={handleChange}
                style={{
                  border:
                    (form.email === "" && isRequiredFields) || emailError
                      ? "1px solid #B21A1A"
                      : "",
                }}
              />
              {emailError && (
                <p className="p-style p-error">{t`error.contact.email-error`}</p>
              )}
            </div>
            <div className="cosmetology-form-field">
              <label htmlFor="cosmetology-form-company">{t`cosmetology.sampleForm.label-company`}</label>
              <input
                id="cosmetology-form-company"
                className="cosmetology-form-input"
                name="company"
                value={form.company}
                onChange={handleChange}
              />
            </div>
            <div className="cosmetology-form-field">
              <label htmlFor="cosmetology-form-position">{t`cosmetology.sampleForm.label-position`}</label>
              <input
                id="cosmetology-form-position"
                className="cosmetology-form-input"
                name="position"
                value={form.position}
                onChange={handleChange}
              />
            </div>
            <div className="cosmetology-form-field">
              <label htmlFor="cosmetology-form-material">{materialLabel}</label>
              <input
                id="cosmetology-form-material"
                className="cosmetology-form-input"
                name="material"
                value={form.material}
                onChange={handleChange}
              />
            </div>
            <div className="cosmetology-form-field">
              <label htmlFor="cosmetology-form-application">
                {applicationLabel}
              </label>
              <input
                id="cosmetology-form-application"
                className="cosmetology-form-input"
                name="application"
                value={form.application}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="cosmetology-form-consent">
            <input
              type="checkbox"
              id="cosmetology-form-personal-data"
              name="personalData"
              checked={form.personalData === true}
              onChange={handlePersonalDataChange}
              style={{
                outline:
                  form.personalData === false && isRequiredFields
                    ? "1px solid #B21A1A"
                    : "",
              }}
            />
            <label
              htmlFor="cosmetology-form-personal-data"
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
          </div>
          {!sending && !sent && (
            <button type="submit" className="cosmetology-form-submit">
              {activeTab === "sample"
                ? t`cosmetology.sampleForm.submit-sample`
                : t`cosmetology.sampleForm.submit-question`}
              <ArrowIcon />
            </button>
          )}
          {sending && !sent && (
            <button
              type="button"
              className="cosmetology-form-submit cosmetology-form-submit--sent"
            >
              {t`contact-component.sending-message`}
              <RotatingIcon />
            </button>
          )}
          {!sending && sent && (
            <button
              type="button"
              className="cosmetology-form-submit cosmetology-form-submit--sent"
            >
              {t`contact-component.sent-message`}
              <CheckIcon />
            </button>
          )}
          {isRequiredFields && (
            <p className="p-style p-error">{t`error.contact.required-fields`}</p>
          )}
          {someError && (
            <p className="p-style p-error">{t`error.contact.someError`}</p>
          )}
        </form>
      </div>
      </div>
    </div>
  )
}

export default CosmetologySampleForm
