import React from "react"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import "./styles/materialApplicationSection.css"

const MaterialApplicationSection = ({
  t,
  material,
  renderOptions,
  hasApplicationDescription,
  applicationTableRows,
}) => {
  return (
    <div className="material-application article">
      <h2 className="h2-style js-acc-header">{t`materials.post.title4`}</h2>
      <div className="article-content js-acc-body">
        {hasApplicationDescription &&
          renderRichText(material.node.application, renderOptions)}
        {applicationTableRows.length > 0 && (
          <div className="material-application-table-wrap material-parameters-table-wrap">
            <div className="material-parameters-table-body">
              <table className="material-parameters-table material-application-table">
                <tbody>
                  <tr className="material-parameters-row material-application-table-head-row">
                    <th
                      scope="col"
                      className="material-parameters-key material-application-table-head-cell"
                    >
                      <span className="material-application-table-head-text">
                        {t`materials.post.application-industry`}
                      </span>
                    </th>
                    <td className="material-application-table-head-cell">
                      <span className="material-application-table-head-text">
                        {t`materials.post.application-examples`}
                      </span>
                    </td>
                  </tr>
                  {applicationTableRows.map((row, index) => {
                    const leftValue = row?.key || "-"
                    const rightValue = row?.value || "-"

                    return (
                      <tr
                        key={`material-application-${index}`}
                        className="material-parameters-row"
                      >
                        <th scope="row" className="p--p2 material-parameters-key">
                          {leftValue}
                        </th>
                        <td className="p--p1 material-parameters-value" data-label={leftValue}>
                          {rightValue}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MaterialApplicationSection
