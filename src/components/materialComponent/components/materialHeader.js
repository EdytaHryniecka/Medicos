import React from "react"
import "../styles/materialHeader.css"

const MaterialHeader = ({
  backgroundHeader,
  titleHeader,
  descriptionHeader,
}) => {
  return (
    <>
      <div className={`material-h-container ${backgroundHeader}`}>
        <div className="container">
          <h1 className="h1-style">{titleHeader}</h1>
          {descriptionHeader}
        </div>
      </div>
    </>
  )
}

export default MaterialHeader
