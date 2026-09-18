import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import "../styles/cosmetologyStats.css"

const CosmetologyStats = () => {
  const { t } = useTranslation()

  const stats = [
    {
      value: t`cosmetology.stats.value1`,
      label: t`cosmetology.stats.label1`,
    },
    {
      value: t`cosmetology.stats.value2`,
      label: t`cosmetology.stats.label2`,
    },
    {
      value: t`cosmetology.stats.value3`,
      label: t`cosmetology.stats.label3`,
    },
  ]

  return (
    <div className="cosmetology-stats-container">
      <div className="container">
        <div className="cosmetology-stats-row">
          {stats.map(stat => (
            <div className="cosmetology-stats-item" key={stat.label}>
              <p className="h2-style cosmetology-stats-value">{stat.value}</p>
              <p className="p--p1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CosmetologyStats
