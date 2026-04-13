import React from "react"
import MaterialHeader from "./components/materialHeader"
import MaterialApplication from "./components/materialApplication"
import MaterialDiscover from "./components/materialDiscover"

const MaterialComponent = ({
  backgroundHeader,
  titleHeader,
  descriptionHeader,
  breadcrumbsItems,
  imageApplication,
  titleApplication,
  descriptionApplication,
  materialDiscover,
  titleDiscover,
  descriptionDiscover,
  t,
  materialQuery,
}) => {
  return (
    <>
      <MaterialHeader
        backgroundHeader={backgroundHeader}
        titleHeader={titleHeader}
        descriptionHeader={descriptionHeader}
        breadcrumbsItems={breadcrumbsItems}
      />
      <MaterialApplication
        imageApplication={imageApplication}
        titleApplication={titleApplication}
        descriptionApplication={descriptionApplication}
        backgroundHeader={backgroundHeader}
        titleHeader={titleHeader}
        descriptionHeader={descriptionHeader}
      />
      {materialDiscover && (
        <MaterialDiscover
          materialDiscover={materialDiscover}
          titleDiscover={titleDiscover}
          descriptionDiscover={descriptionDiscover}
          materialQuery={materialQuery}
          t={t}
        />
      )}
    </>
  )
}
export default MaterialComponent
