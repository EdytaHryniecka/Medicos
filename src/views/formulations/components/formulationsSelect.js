import React, { useEffect, useRef, useState } from "react"
import { CheckIcon, ChevronIcon } from "../icons/formulationsIcons"

const FormulationsSelect = ({ id, labelId, value, options, onChange }) => {
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(0)
  const wrapperRef = useRef(null)
  const buttonRef = useRef(null)
  const listRef = useRef(null)
  const listId = `${id}-list`
  const selectedIndex = Math.max(
    0,
    options.findIndex(option => option.value === value)
  )
  const selected = options[selectedIndex]

  const openList = index => {
    setHighlighted(index ?? selectedIndex)
    setOpen(true)
  }

  const closeList = ({ focusButton = true } = {}) => {
    setOpen(false)
    if (focusButton && buttonRef.current) buttonRef.current.focus()
  }

  const choose = index => {
    const option = options[index]
    closeList()
    if (option && option.value !== value) onChange(option.value)
  }

  useEffect(() => {
    if (!open) return
    if (listRef.current) listRef.current.focus()
    const handlePointerDown = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [open])

  useEffect(() => {
    if (!open || !listRef.current) return
    const item = listRef.current.children[highlighted]
    if (item) item.scrollIntoView({ block: "nearest" })
  }, [open, highlighted])

  const handleButtonKeyDown = event => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault()
      openList()
    }
  }

  const handleListKeyDown = event => {
    const last = options.length - 1
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault()
        setHighlighted(index => Math.min(index + 1, last))
        break
      case "ArrowUp":
        event.preventDefault()
        setHighlighted(index => Math.max(index - 1, 0))
        break
      case "Home":
        event.preventDefault()
        setHighlighted(0)
        break
      case "End":
        event.preventDefault()
        setHighlighted(last)
        break
      case "Enter":
      case " ":
        event.preventDefault()
        choose(highlighted)
        break
      case "Escape":
        event.preventDefault()
        closeList()
        break
      case "Tab":
        closeList({ focusButton: false })
        break
      default:
    }
  }

  return (
    <div
      className={`formulations-dropdown${
        open ? " formulations-dropdown--open" : ""
      }`}
      ref={wrapperRef}
    >
      <button
        type="button"
        id={id}
        ref={buttonRef}
        className="formulations-dropdown-button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-labelledby={`${labelId} ${id}`}
        onClick={() => (open ? closeList() : openList())}
        onKeyDown={handleButtonKeyDown}
      >
        <span className="formulations-dropdown-value">{selected?.label}</span>
        <ChevronIcon className="formulations-dropdown-chevron" />
      </button>
      {open && (
        <ul
          ref={listRef}
          id={listId}
          className="formulations-dropdown-list"
          role="listbox"
          tabIndex={-1}
          aria-labelledby={labelId}
          aria-activedescendant={`${id}-option-${highlighted}`}
          onKeyDown={handleListKeyDown}
        >
          {options.map((option, index) => {
            const isSelected = index === selectedIndex
            return (
              <li
                key={option.value || "all"}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={isSelected}
                className={`formulations-dropdown-option${
                  index === highlighted
                    ? " formulations-dropdown-option--active"
                    : ""
                }${isSelected ? " formulations-dropdown-option--selected" : ""}`}
                onMouseEnter={() => setHighlighted(index)}
                onClick={() => choose(index)}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <CheckIcon className="formulations-dropdown-check" />
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default FormulationsSelect
