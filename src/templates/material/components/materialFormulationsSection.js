import React, { useCallback, useEffect, useRef, useState } from "react"
import FormulationCard from "../../../views/formulations/components/formulationCard"
import { SliderArrowIcon } from "../../../views/formulations/icons/formulationsIcons"
import "./styles/materialFormulationsSection.css"

const SLIDE_GAP = 24
const SCROLL_ANIMATION_MS = 600

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

const MaterialFormulationsSection = ({ t, formulations }) => {
  const trackRef = useRef(null)
  const pendingTargetRef = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: true })

  const updateEdges = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const maxScroll = track.scrollWidth - track.clientWidth
    const start = track.scrollLeft <= 1
    const end = track.scrollLeft >= maxScroll - 1
    setEdges(prev =>
      prev.start === start && prev.end === end ? prev : { start, end }
    )
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    updateEdges()
    track.addEventListener("scroll", updateEdges, { passive: true })
    window.addEventListener("resize", updateEdges)
    return () => {
      track.removeEventListener("scroll", updateEdges)
      window.removeEventListener("resize", updateEdges)
    }
  }, [updateEdges, formulations.length])

  const scrollBySlide = direction => {
    const track = trackRef.current
    if (!track) return
    const slide = track.firstElementChild
    const step = slide
      ? slide.getBoundingClientRect().width + SLIDE_GAP
      : track.clientWidth
    const maxScroll = track.scrollWidth - track.clientWidth
    const pending = pendingTargetRef.current
    const from =
      pending && performance.now() - pending.time < SCROLL_ANIMATION_MS
        ? pending.left
        : track.scrollLeft
    const currentIndex = Math.round(from / step)
    const target = Math.min(
      Math.max((currentIndex + direction) * step, 0),
      maxScroll
    )
    pendingTargetRef.current = { left: target, time: performance.now() }
    track.scrollTo({
      left: target,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    })
  }

  const hasOverflow = !(edges.start && edges.end)

  return (
    <section className="material-formulations">
      <h2 className="h2-style">{t`materials.post.formulations-title`}</h2>
      <div className="material-formulations-track" ref={trackRef}>
        {formulations.map((formulation, index) => (
          <div className="material-formulations-slide" key={`${formulation.id}-${index}`}>
            <FormulationCard
              formulation={formulation}
              detailsHref={`/formulations/?f=${encodeURIComponent(
                formulation.id
              )}`}
              imageSizes="304px"
            />
          </div>
        ))}
      </div>
      {formulations.length > 1 && (
        <div
          className={`material-formulations-nav${
            hasOverflow ? "" : " material-formulations-nav--hidden"
          }`}
        >
          <button
            type="button"
            className="material-formulations-arrow"
            aria-label={t`materials.post.formulations-prev`}
            disabled={edges.start}
            onClick={() => scrollBySlide(-1)}
          >
            <SliderArrowIcon direction="left" />
          </button>
          <button
            type="button"
            className="material-formulations-arrow"
            aria-label={t`materials.post.formulations-next`}
            disabled={edges.end}
            onClick={() => scrollBySlide(1)}
          >
            <SliderArrowIcon direction="right" />
          </button>
        </div>
      )}
    </section>
  )
}

export default MaterialFormulationsSection
