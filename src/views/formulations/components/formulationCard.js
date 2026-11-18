import React from "react"
import { Link, useTranslation } from "gatsby-plugin-react-i18next"
import { ArrowIcon } from "../icons/formulationsIcons"
import { CARD_IMAGE_SIZES, cardImageSrcSet, contentfulImageUrl } from "../utils"
import "../styles/formulationCard.css"

const FormulationCard = ({
  formulation,
  isOpen,
  panelId,
  onToggle,
  onPrefetch,
  detailsHref,
  imageSizes = CARD_IMAGE_SIZES,
}) => {
  const { t } = useTranslation()
  const {
    title,
    category,
    tags = [],
    shortDescription,
    image,
    ingredients = [],
  } = formulation

  return (
    <article
      className={`formulations-card${isOpen ? " formulations-card--open" : ""}`}
    >
      <div className="formulations-card-media">
        {image && (
          <img
            className="formulations-card-image"
            src={contentfulImageUrl(image.url, 608, 360)}
            srcSet={cardImageSrcSet(image.url)}
            sizes={imageSizes}
            width="304"
            height="180"
            alt={image.alt}
            loading="lazy"
            decoding="async"
          />
        )}
        {category && (
          <span className="formulations-card-category">{category}</span>
        )}
      </div>
      <div className="formulations-card-body">
        <div className="formulations-card-info">
          <div className="formulations-card-heading">
            {tags.length > 0 && (
              <p className="formulations-card-tags">
                {tags.map((tag, index) => (
                  <React.Fragment key={`${tag}-${index}`}>
                    {index > 0 && (
                      <span
                        className="formulations-card-tags-dot"
                        aria-hidden="true"
                      />
                    )}
                    <span>{tag}</span>
                  </React.Fragment>
                ))}
              </p>
            )}
            <h3 className="formulations-card-title">{title}</h3>
          </div>
          {shortDescription && (
            <p className="formulations-card-description">{shortDescription}</p>
          )}
        </div>
        {detailsHref ? (
          <div className="formulations-card-footer">
            <Link className="formulations-card-toggle" to={detailsHref}>
              {t`formulations.card.details`}
              <ArrowIcon className="formulations-card-toggle-arrow formulations-card-toggle-arrow--right" />
            </Link>
          </div>
        ) : (
          <>
        <div className="formulations-card-divider" aria-hidden="true" />
        <div className="formulations-card-footer">
          {ingredients.length > 0 && (
            <div className="formulations-card-materials">
              <p className="formulations-card-materials-title">{t`formulations.card.materials`}</p>
              <ul className="formulations-chips">
                {ingredients.map(ingredient =>
                  ingredient.href ? (
                    <li
                      className="formulations-chip formulations-chip--link"
                      key={ingredient.id}
                    >
                      <Link
                        className="formulations-chip-link formulations-focus"
                        to={ingredient.href}
                      >
                        {ingredient.name}
                      </Link>
                    </li>
                  ) : (
                    <li className="formulations-chip" key={ingredient.id}>
                      {ingredient.name}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
          <button
            type="button"
            className="formulations-card-toggle"
            aria-expanded={isOpen}
            aria-controls={isOpen ? panelId : undefined}
            onClick={onToggle}
            onMouseEnter={onPrefetch}
            onFocus={onPrefetch}
          >
            {t`formulations.card.show`}
            <ArrowIcon className="formulations-card-toggle-arrow" />
          </button>
        </div>
          </>
        )}
      </div>
    </article>
  )
}

export default FormulationCard
