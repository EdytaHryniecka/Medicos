import React from "react"
import "./styles/miniTable.css"

const parseItems = raw => {
  if (typeof raw !== "string" || !raw.trim()) return []

  try {
    const parsed = JSON.parse(raw)
    const nodes = Array.isArray(parsed?.content) ? parsed.content : []
    const list = nodes.find(node => node?.nodeType === "unordered-list")
    const listItems = Array.isArray(list?.content) ? list.content : []

    return listItems
      .map(listItem => {
        const text = listItem?.content?.[0]?.content?.[0]?.value
        if (typeof text !== "string" || !text.trim()) return null

        const [titleLine, ...rest] = text.split("\n")
        const title = titleLine.trim()
        const description = rest.join(" ").trim()

        if (!title) return null

        return { title, description }
      })
      .filter(Boolean)
  } catch (error) {
    return []
  }
}

const chunkPairs = items => {
  const rows = []
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2))
  }
  return rows
}

const MiniTable = ({ listAdvantages }) => {
  const items = parseItems(listAdvantages?.raw)
  if (!items.length) return null

  const rows = chunkPairs(items)

  return (
    <div className="mini-table">
      {rows.map((row, rowIndex) => (
        <React.Fragment key={`mini-table-row-${rowIndex}`}>
          {rowIndex > 0 && <div className="mini-table-row-divider" />}
          <div className="mini-table-row">
            {row.map((item, columnIndex) => {
              const index = rowIndex * 2 + columnIndex
              return (
                <React.Fragment key={`mini-table-item-${index}`}>
                  {columnIndex > 0 && (
                    <div className="mini-table-column-divider" />
                  )}
                  <div className="mini-table-item">
                    <span className="mini-table-item-number">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    <h3 className="mini-table-item-title">{item.title}</h3>
                    {item.description && (
                      <p className="mini-table-item-description">
                        {item.description}
                      </p>
                    )}
                  </div>
                </React.Fragment>
              )
            })}
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export default MiniTable
