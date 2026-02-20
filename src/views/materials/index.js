import React, { useEffect, useState, useContext } from "react"
import Seo from "../../components/seo"
import { useTranslation, I18nextContext } from "gatsby-plugin-react-i18next"
import MaterialsHeader from "./components/materialsHeader"
import Layout from "../../components/layout"
import MaterialsFilter from "./components/materialsFilter"
import { graphql, navigate, useStaticQuery } from "gatsby"
import getCurrentTranslations from "../../components/contentful-translator"
import MaterialsContent from "./components/materialsContent"
import MaterialsDontFind from "./components/materialsDontFind"
import "bootstrap/dist/css/bootstrap.min.css"
import { useLocation } from "@reach/router"
import { slugify } from "../../utils/slugify"

const Materials = () => {
  const { t } = useTranslation()
  const { language } = useContext(I18nextContext)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchQuery = searchParams.get("query")
    ? decodeURIComponent(searchParams.get("query"))
    : ""

  const data = useStaticQuery(graphql`
    query {
      allContentfulMaterials {
        edges {
          node {
            category
            color
            node_locale
            pH
            title
            inci
            cas
            form
            generalInformation {
              raw
            }
            application {
              raw
            }
          }
        }
      }
    }
  `)
  const [searchMaterial, setSearchMaterial] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState([
    "Chemia gospodarcza",
    "Kosmetyka",
    "Farmacja",
    "Żywność i suplementy diety",
    "Pozostałe branże",
  ])
  const [selectedSort, setSelectedSort] = useState("name-up")
  const [searchedData, setSearchedData] = useState([])

  const [dataFromSearch, setDataFromSearch] = useState("")

  useEffect(() => {
    if (searchQuery && searchQuery !== "" && searchQuery.trim() !== "") {
      if (searchQuery === "household-chemicals") {
        setSelectedIndustry(["Chemia gospodarcza"])
      }
      if (searchQuery === "cosmetology") {
        setSelectedIndustry(["Kosmetyka"])
      }
      if (searchQuery === "pharmacy") {
        setSelectedIndustry(["Farmacja"])
      }
      if (searchQuery === "food-and-supplements") {
        setSelectedIndustry(["Żywność i suplementy diety"])
      }
      if (searchQuery === "other-industries") {
        setSelectedIndustry(["Pozostałe branże"])
      } else {
        setDataFromSearch(searchQuery)
      }
    }
  }, [])

  useEffect(() => {
    if (!dataFromSearch) {
      return
    }

    const materials = getCurrentTranslations(
      data.allContentfulMaterials.edges,
      language
    )

    const foundMaterial = materials.find(material => {
      return material.node.title === dataFromSearch
    })

    if (!foundMaterial) {
      return
    }

    const targetSlug = slugify(foundMaterial.node.title)
    const targetPath =
      language === "pl"
        ? `/materials/${targetSlug}`
        : `/${language}/materials/${targetSlug}`

    navigate(targetPath, { replace: true })
  }, [dataFromSearch, data.allContentfulMaterials.edges, language])

  useEffect(() => {
    const getData = () => {
      const materials = getCurrentTranslations(
        data.allContentfulMaterials.edges,
        language
      )

      let filteredMaterials = materials.filter(material => {
        const titleMatches = material.node.title
          .toLowerCase()
          .includes(searchMaterial.toLowerCase())
        const inciMatches = material.node.inci
          .toLowerCase()
          .includes(searchMaterial.toLowerCase())
        const casMatches = material.node.cas
          .toLowerCase()
          .includes(searchMaterial.toLowerCase())
        const categoryMatches = material.node.category.some(category =>
          selectedIndustry.some(industry =>
            category.toLowerCase().includes(industry.toLowerCase())
          )
        )

        return (titleMatches || inciMatches || casMatches) && categoryMatches
      })

      const sortedMaterials = filteredMaterials.sort((a, b) => {
        if (selectedSort === "name-up") {
          return a.node.title.localeCompare(b.node.title)
        } else if (selectedSort === "name-down") {
          return b.node.title.localeCompare(a.node.title)
        } else if (selectedSort === "inci-up") {
          return a.node.inci.localeCompare(b.node.inci)
        } else if (selectedSort === "inci-down") {
          return b.node.inci.localeCompare(a.node.inci)
        }
      })

      setSearchedData(sortedMaterials)
    }

    getData()
  }, [
    data.allContentfulMaterials,
    language,
    searchMaterial,
    selectedIndustry,
    selectedSort,
  ])

  const handleSearchMaterialChange = value => {
    setSearchMaterial(value)
  }

  const handleSelectedIndustryChange = value => {
    setSelectedIndustry(value)
  }

  const handleSelectedSortChange = value => {
    setSelectedSort(value)
  }

  const resetFilters = () => {
    setSearchMaterial("")
    setSelectedIndustry([
      "Chemia gospodarcza",
      "Kosmetyka",
      "Farmacja",
      "Żywność i suplementy diety",
      "Pozostałe branże",
    ])
    setSelectedSort("name-up")
  }

  return (
    <Layout>
      <Seo
        title={t`seo.materials.title`}
        description={t`seo.materials.description`}
      />
      <MaterialsHeader />
      <MaterialsFilter
        onSearchMaterialChange={handleSearchMaterialChange}
        onSelectedIndustryChange={handleSelectedIndustryChange}
        onSelectedSortChange={handleSelectedSortChange}
        searchMaterial={searchMaterial}
        selectedIndustry={selectedIndustry}
        selectedSort={selectedSort}
        resetFilters={resetFilters}
      />
      <MaterialsContent
        materialsContent={searchedData}
        resetFilters={resetFilters}
      />
      <MaterialsDontFind />
    </Layout>
  )
}
export default Materials
