export const normalizeText = value =>
  (value || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ł/g, "l")
    .replace(/\s+/g, " ")
    .trim()

export const contentfulImageUrl = (url, width, height) => {
  if (!url) return ""
  const params = new URLSearchParams({
    w: String(width),
    fm: "webp",
    q: "80",
  })
  if (height) {
    params.set("h", String(height))
    params.set("fit", "fill")
  }
  return `${url}${url.includes("?") ? "&" : "?"}${params.toString()}`
}

const CARD_IMAGE_WIDTHS = [304, 380, 456, 608, 760, 912]
const CARD_IMAGE_RATIO = 180 / 304

export const cardImageSrcSet = url =>
  CARD_IMAGE_WIDTHS.map(
    width =>
      `${contentfulImageUrl(
        url,
        width,
        Math.round(width * CARD_IMAGE_RATIO)
      )} ${width}w`
  ).join(", ")

export const CARD_IMAGE_SIZES =
  "(min-width: 1324px) 304px, (min-width: 1280px) 348px, (min-width: 1124px) 516px, (min-width: 650px) calc((100vw - 72px) / 2), (min-width: 568px) 90vw, calc(100vw - 72px)"

export const escapeHtml = value =>
  (value || "")
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
