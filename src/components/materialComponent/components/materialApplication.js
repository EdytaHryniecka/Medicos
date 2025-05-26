import React from "react"
import "../styles/materialApplication.css"

const MaterialApplication = ({
  imageApplication,
  titleApplication,
  descriptionApplication,
}) => {
  return (
    <>
      <div className="material-a-container">
        <div className="container">
          <div className="material-grid">
            <div className="text-con">
              <h2 className="h2-style">{titleApplication}</h2>
              {descriptionApplication}
            </div>
            <div className="image-con">{imageApplication()}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MaterialApplication
