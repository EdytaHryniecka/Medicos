import { navigate } from "gatsby"

const QueryNavigate = (query, path, language, additionalParams = {}) => {
  const params = new URLSearchParams({
    query,
    ...additionalParams,
  })

  if (language === "pl") {
    navigate(`/${path}?${params.toString()}`)
  } else {
    navigate(`/${language}/${path}?${params.toString()}`)
  }
}

export default QueryNavigate
