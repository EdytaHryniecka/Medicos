import React from "react"

const MaterialParametersSection = ({ t, parameterRows }) => {
  return (
    <div className="material-parameters-table-wrap">
      <h2 className="h2-style js-acc-header">{t`materials.post.title1`}</h2>
      <div className="js-acc-body material-parameters-table-body">
        <table className="material-parameters-table">
          <tbody>
            {parameterRows.map((parameter, index) => {
              const leftValue = parameter?.key || "-"
              const rightValue = parameter?.value || "-"

              return (
                <tr
                  key={`material-parameter-${index}`}
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
  )
}

export default MaterialParametersSection
