import React, { useEffect, useMemo, useRef, useState } from "react"
import { renderRichText } from "gatsby-source-contentful/rich-text"

const splitByBr = value => {
  if (typeof value !== "string") {
    return []
  }

  return value.split(/<br\s*\/?>/i)
}

const renderFaqAnswer = value => {
  const parts = splitByBr(value).map(part => part.trim())
  const hasContent = parts.some(part => part.length > 0)

  if (!hasContent) {
    return null
  }

  return parts.map((part, index) => (
    <React.Fragment key={`faq-answer-${index}`}>
      {part}
      {index < parts.length - 1 && <br />}
    </React.Fragment>
  ))
}

const MaterialFaqSection = ({ faqItems, faqDescription, renderOptions }) => {
  const normalizedItems = useMemo(
    () =>
      Array.isArray(faqItems)
        ? faqItems
            .map(item => {
              const question =
                typeof item?.question === "string"
                  ? item.question.trim()
                  : typeof item?.key === "string"
                  ? item.key.trim()
                  : ""
              const answer =
                typeof item?.answer === "string"
                  ? item.answer.trim()
                  : typeof item?.value === "string"
                  ? item.value.trim()
                  : ""

              if (!question && !answer) {
                return null
              }

              return { question, answer }
            })
            .filter(Boolean)
        : [],
    [faqItems]
  )

  const [activeIndex, setActiveIndex] = useState(0)
  const answerRefs = useRef([])
  const rafIdRef = useRef(null)
  answerRefs.current = []

  useEffect(() => {
    setActiveIndex(normalizedItems.length > 0 ? 0 : -1)
  }, [normalizedItems.length])

  const updateAnswerHeights = () => {
    answerRefs.current.forEach((node, index) => {
      if (!node) {
        return
      }

      const isOpen = index === activeIndex
      node.style.maxHeight = isOpen ? `${node.scrollHeight}px` : "0px"
    })
  }

  useEffect(() => {
    updateAnswerHeights()

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current)
    }

    rafIdRef.current = requestAnimationFrame(() => {
      updateAnswerHeights()
      rafIdRef.current = null
    })

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
    }
  }, [activeIndex, normalizedItems.length])

  useEffect(() => {
    const handleResize = () => updateAnswerHeights()
    window.addEventListener("resize", handleResize)

    let resizeObserver = null
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => updateAnswerHeights())
      answerRefs.current.forEach(node => {
        if (node) {
          resizeObserver.observe(node)
        }
      })
    }

    return () => {
      window.removeEventListener("resize", handleResize)
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [activeIndex, normalizedItems.length])

  const shouldRender =
    normalizedItems.length > 0 ||
    (faqDescription &&
      typeof faqDescription === "object" &&
      faqDescription.raw)

  if (!shouldRender) {
    return null
  }

  return (
    <section className="material-faq-section">
      <div className="container material-faq-container">
        <div className="material-faq-content article">
          <div className="article-content">
            {faqDescription && renderRichText(faqDescription, renderOptions)}
          </div>
        </div>
        {normalizedItems.length > 0 && (
          <div className="material-faq-accordion">
            <ul className="material-faq-list">
              {normalizedItems.map((item, index) => {
                const isOpen = index === activeIndex
                const answerId = `material-faq-answer-${index}`
                const questionId = `material-faq-question-${index}`

                return (
                  <li
                    key={`material-faq-${index}`}
                    className={`material-faq-item${isOpen ? " is-open" : ""}`}
                  >
                    <button
                      type="button"
                      id={questionId}
                      className="material-faq-question"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() =>
                        setActiveIndex(isOpen ? -1 : index)
                      }
                    >
                      <span className="material-faq-question-text title">
                        {item.question || "-"}
                      </span>
                      <span className="material-faq-icon" aria-hidden="true">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="10"
                          viewBox="0 0 16 10"
                          fill="none"
                        >
                          <path
                            d="M0.465 0.486C0.765 0.186 1.17 0.0179998 1.593 0.0179998C2.016 0.0179998 2.421 0.186 2.721 0.486L7.98 5.745L13.239 0.486C13.386 0.333 13.563 0.213 13.758 0.129C13.953 0.0449995 14.163 0 14.373 0C14.586 0 14.796 0.0389999 14.991 0.12C15.186 0.201 15.366 0.318 15.516 0.468C15.666 0.618 15.786 0.795 15.864 0.993C15.945 1.188 15.984 1.401 15.984 1.611C15.984 1.824 15.939 2.034 15.855 2.226C15.771 2.418 15.651 2.598 15.498 2.745L9.111 9.132C8.811 9.432 8.406 9.6 7.983 9.6C7.56 9.6 7.155 9.432 6.855 9.132L0.468 2.745C0.168 2.445 0 2.04 0 1.617C0 1.194 0.168 0.789 0.468 0.489L0.465 0.486Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    </button>
                    <div
                      id={answerId}
                      role="region"
                      aria-labelledby={questionId}
                      className={`material-faq-answer${
                        isOpen ? " is-open" : ""
                      }`}
                      ref={node => {
                        answerRefs.current[index] = node
                      }}
                    >
                      <div className="material-faq-divider" />
                      <div className="material-faq-answer-content p--p1">
                        {renderFaqAnswer(item.answer)}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

export default MaterialFaqSection
