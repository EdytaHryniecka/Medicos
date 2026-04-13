import React from "react"
import Breadcrumbs from "../../breadcrumbs/breadcrumbs"
import "../styles/materialHeader.css"

const MaterialHeader = ({
  backgroundHeader,
  titleHeader,
  descriptionHeader,
  breadcrumbsItems,
}) => {
  return (
    <>
      <div className={`material-h-container ${backgroundHeader}`}>
        <div className="container">
          {breadcrumbsItems && (
            <Breadcrumbs
              className="breadcrumbs--hero"
              items={breadcrumbsItems}
            />
          )}
          <h1 className="h1-style">{titleHeader}</h1>
          {descriptionHeader}
        </div>
      </div>
    </>
  )
}

export default MaterialHeader
