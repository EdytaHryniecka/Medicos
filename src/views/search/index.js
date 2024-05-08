import React, { useEffect, useState, useContext } from "react"
import Seo from "../../components/seo"
import { useTranslation, I18nextContext } from "gatsby-plugin-react-i18next"
import Layout from "../../components/layout"
import SearchHeader from "./components/searchHeader"
import { useLocation } from "@reach/router"
import { graphql, useStaticQuery } from "gatsby"
import getCurrentTranslations from "../../components/contentful-translator"
import SearchContent from "./components/searchContent"
import moment from "moment"
import getLocaleTranslations from "../../components/locale-translator"

const Search = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchQuery = searchParams.get("query")
    ? decodeURIComponent(searchParams.get("query"))
    : ""
  const { language } = useContext(I18nextContext)
  // Uncomment blog
  // allContentfulArticle {
  //   edges {
  //     node {
  //       title
  //       node_locale
  //       slug
  //       author
  //       createdAt
  //       description {
  //         raw
  //       }
  //     }
  //   }
  // }
  const data = useStaticQuery(graphql`
    query {
      allContentfulMaterials {
        edges {
          node {
            title
            node_locale
            category
            color
            pH
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
      allContentfulContact {
        edges {
          node {
            email
            krs
            name
            nip
            node_locale
            purchaseNumber
            registration
            regon
            salesNumber
            street
            zipCode
          }
        }
      }
      allContentfulPrivacyPolicy {
        edges {
          node {
            title
            node_locale
            description {
              raw
            }
            updatedAt
          }
        }
      }
      allContentfulWebsiteRegulations {
        edges {
          node {
            title
            node_locale
            description {
              raw
            }
            updatedAt
          }
        }
      }
      allContentfulTeam {
        edges {
          node {
            node_locale
            name
            education
            role
            description {
              description
            }
          }
        }
      }
      allContentfulCooperationRulesFiles {
        edges {
          node {
            node_locale
            title
          }
        }
      }
      allContentfulQualityPolicyFiles {
        edges {
          node {
            node_locale
            title
          }
        }
      }
      allLocale {
        edges {
          node {
            ns
            language
            data
          }
        }
      }
    }
  `)

  const [searchedData, setSearchedData] = useState([])

  const isOnlyDots = str => {
    const dotPattern = /^[\s.]+$/
    return dotPattern.test(str)
  }

  useEffect(() => {
    setSearchedData([])

    // Uncomment blog
    // const processArticles = () => {
    //   const articles = getCurrentTranslations(
    //     data.allContentfulArticle.edges,
    //     language
    //   )
    //   if (
    //     searchQuery &&
    //     searchQuery.trim() !== "" &&
    //     !isOnlyDots(searchQuery)
    //   ) {
    //     const filteredArticles = articles
    //       .filter(article => {
    //         const descriptionContent = JSON.parse(
    //           article.node.description.raw
    //         ).content
    //         const descriptionText = getDescriptionText(descriptionContent)
    //         return articleMatchesQuery(article, descriptionText)
    //       })
    //       .map(article => mapArticleData(article))

    //     setSearchedData(prevData => [...prevData, ...filteredArticles])
    //   }
    // }

    const processMaterials = () => {
      const materials = getCurrentTranslations(
        data.allContentfulMaterials.edges,
        language
      )
      if (
        searchQuery &&
        searchQuery.trim() !== "" &&
        !isOnlyDots(searchQuery)
      ) {
        const filteredMaterials = materials
          .filter(material => {
            const generalInformationContent = JSON.parse(
              material.node.generalInformation.raw
            ).content
            const generalInformationText = getDescriptionText(
              generalInformationContent
            )
            const applicationContent = JSON.parse(
              material.node.application.raw
            ).content
            const applicationText = getDescriptionText(applicationContent)
            return materialMatchesQuery(
              material,
              generalInformationText,
              applicationText
            )
          })
          .map(material => mapMaterialData(material))

        setSearchedData(prevData => [...prevData, ...filteredMaterials])
      }
    }

    const processContact = () => {
      const contact = getCurrentTranslations(
        data.allContentfulContact.edges,
        language
      )
      if (
        searchQuery &&
        searchQuery.trim() !== "" &&
        !isOnlyDots(searchQuery)
      ) {
        const filteredContact = contact
          .filter(con => {
            return contactMatchesQuery(con)
          })
          .map(con => mapContactData(con))

        setSearchedData(prevData => [...prevData, ...filteredContact])
      }
    }
    const processPrivacyPolicy = () => {
      const privacyPolicy = getCurrentTranslations(
        data.allContentfulPrivacyPolicy.edges,
        language
      )
      if (
        searchQuery &&
        searchQuery.trim() !== "" &&
        !isOnlyDots(searchQuery)
      ) {
        const filteredPrivacyPolicy = privacyPolicy
          .filter(pp => {
            const descriptionContent = JSON.parse(
              pp.node.description.raw
            ).content
            const descriptionText = getDescriptionText(descriptionContent)
            return documentMatchesQuery(pp, descriptionText)
          })
          .map(pp => mapDocumentData(pp, "/privacy-policy"))

        setSearchedData(prevData => [...prevData, ...filteredPrivacyPolicy])
      }
    }

    const processWebsiteRegulations = () => {
      const websiteRegulations = getCurrentTranslations(
        data.allContentfulWebsiteRegulations.edges,
        language
      )
      if (
        searchQuery &&
        searchQuery.trim() !== "" &&
        !isOnlyDots(searchQuery)
      ) {
        const filteredWebsiteRegulations = websiteRegulations
          .filter(pp => {
            const descriptionContent = JSON.parse(
              pp.node.description.raw
            ).content
            const descriptionText = getDescriptionText(descriptionContent)
            return documentMatchesQuery(pp, descriptionText)
          })
          .map(pp => mapDocumentData(pp, "/website-regulations"))

        setSearchedData(prevData => [
          ...prevData,
          ...filteredWebsiteRegulations,
        ])
      }
    }

    const processTeam = () => {
      const team = getCurrentTranslations(
        data.allContentfulTeam.edges,
        language
      )
      if (
        searchQuery &&
        searchQuery.trim() !== "" &&
        !isOnlyDots(searchQuery)
      ) {
        const filteredTeam = team
          .filter(team => {
            return teamMatchesQuery(team)
          })
          .map(team => mapTeamData(team))

        setSearchedData(prevData => [...prevData, ...filteredTeam])
      }
    }

    const processRulesFiles = () => {
      const rulesFiles = getCurrentTranslations(
        data.allContentfulCooperationRulesFiles.edges,
        language
      )
      if (
        searchQuery &&
        searchQuery.trim() !== "" &&
        !isOnlyDots(searchQuery)
      ) {
        const filteredRulesFiles = rulesFiles
          .filter(con => {
            return filesMatchesQuery(con)
          })
          .map(con => mapFilesData(con))

        setSearchedData(prevData => [...prevData, ...filteredRulesFiles])
      }
    }

    const processPolicyFiles = () => {
      const policyFiles = getCurrentTranslations(
        data.allContentfulQualityPolicyFiles.edges,
        language
      )
      if (
        searchQuery &&
        searchQuery.trim() !== "" &&
        !isOnlyDots(searchQuery)
      ) {
        const filteredPolicyFiles = policyFiles
          .filter(con => {
            return filesMatchesQuery(con)
          })
          .map(con => mapFilesData(con))

        setSearchedData(prevData => [...prevData, ...filteredPolicyFiles])
      }
    }

    const processLocales = () => {
      const locales = getLocaleTranslations(data.allLocale.edges, language)

      if (
        searchQuery &&
        searchQuery.trim() !== "" &&
        !isOnlyDots(searchQuery)
      ) {
        const filteredLocales = locales
          .filter(locale => {
            const dataContent = JSON.parse(locale.node.data)
            const dataText = getDataText(dataContent)
            return localeMatchesQuery(locale, dataText)
          })
          .map(locale => mapLocaleData(locale))

        setSearchedData(prevData => [...prevData, ...filteredLocales])
      }
    }

    // Uncomment blog
    // processArticles()
    processMaterials()
    processContact()
    processPrivacyPolicy()
    processWebsiteRegulations()
    processTeam()
    processRulesFiles()
    processPolicyFiles()
    processLocales()
  }, [data, language, searchQuery])

  const getDescriptionText = content => {
    const extractText = nodes => {
      return nodes
        .map(node => {
          if (node.nodeType === "text") {
            return node.value
          } else if (
            ["paragraph", "list-item", "unordered-list"].includes(node.nodeType)
          ) {
            return extractText(node.content).join(" ")
          } else if (node.nodeType === "table-row") {
            return node.content
              .map(tableCell => extractText(tableCell.content))
              .join(" ")
          }
          return ""
        })
        .flat()
    }

    const filteredNodes = content.filter(node => {
      const firstContent = node?.content?.[0]
      return [
        "paragraph",
        "heading-1",
        "heading-2",
        "heading-3",
        "heading-4",
        "heading-5",
        "heading-6",
        "list-item",
        "unordered-list",
        "table-row",
      ].includes(firstContent?.nodeType)
    })

    return filteredNodes
      .map(node => extractText(node.content).join(" "))
      .join(" ")
  }

  const articleMatchesQuery = (article, descriptionText) => {
    return (
      article.node.title
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      article.node.author
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      moment(article.node.createdAt)
        .format("DD/MM/YYYY HH:MM")
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      descriptionText
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    )
  }

  const mapArticleData = article => {
    const descriptionContent = JSON.parse(article.node.description.raw).content
    const descriptionText = getDescriptionText(descriptionContent)
    let firstSentenceContainingQuery = descriptionText.slice(0, 100)
    let startIndex = 0
    let endIndex = descriptionText.length - 1

    const queryIndex = descriptionText
      ?.toLowerCase()
      .normalize("NFC")
      .indexOf(searchQuery?.toLowerCase().normalize("NFC"))
    if (queryIndex !== -1) {
      const queryLength = searchQuery.length
      startIndex = Math.max(0, queryIndex - 50)
      endIndex = Math.min(
        descriptionText.length - 1,
        queryIndex + queryLength + 50
      )
      firstSentenceContainingQuery =
        "..." + descriptionText.slice(startIndex, endIndex)
    }

    if (
      moment(article.node.createdAt)
        .format("DD/MM/YYYY HH:MM")
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      firstSentenceContainingQuery += `...${moment(
        article.node.createdAt
      ).format("DD/MM/YYYY HH:MM")}`
    }

    if (
      article.node.author
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      firstSentenceContainingQuery += `...${article.node.author}`
    }

    return {
      title: article.node.title.normalize("NFC"),
      description: firstSentenceContainingQuery.normalize("NFC") + "...",
      category: t("search.article"),
      slug: `/news/${article.node.slug}`,
    }
  }

  const materialMatchesQuery = (
    material,
    generalInformationText,
    applicationText
  ) => {
    return (
      material.node.title
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      material.node.color
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      material.node.pH
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      material.node.inci
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      material.node.cas
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      material.node.form
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      generalInformationText
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      applicationText
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    )
  }

  const mapMaterialData = material => {
    const generalInformationContent = JSON.parse(
      material.node.generalInformation.raw
    ).content
    const generalInformationText = getDescriptionText(generalInformationContent)

    let firstSentenceContainingQuery1 = generalInformationText.slice(0, 100)
    let startIndex1 = 0
    let endIndex1 = generalInformationText.length - 1

    const queryIndex1 = generalInformationText
      ?.toLowerCase()
      .normalize("NFC")
      .indexOf(searchQuery?.toLowerCase().normalize("NFC"))
    if (queryIndex1 !== -1) {
      const queryLength = searchQuery.length
      startIndex1 = Math.max(0, queryIndex1 - 50)
      endIndex1 = Math.min(
        generalInformationText.length - 1,
        queryIndex1 + queryLength + 50
      )
      firstSentenceContainingQuery1 =
        "..." + generalInformationText.slice(startIndex1, endIndex1)
    }

    const applicationContent = JSON.parse(material.node.application.raw).content
    const applicationText = getDescriptionText(applicationContent)

    let firstSentenceContainingQuery2 = applicationText.slice(0, 100)
    let startIndex2 = 0
    let endIndex2 = applicationText.length - 1

    const queryIndex2 = applicationText
      ?.toLowerCase()
      .normalize("NFC")
      .indexOf(searchQuery?.toLowerCase().normalize("NFC"))
    if (queryIndex2 !== -1) {
      const queryLength = searchQuery.length
      startIndex2 = Math.max(0, queryIndex2 - 50)
      endIndex2 = Math.min(
        applicationText.length - 1,
        queryIndex2 + queryLength + 50
      )
      firstSentenceContainingQuery2 =
        "..." + applicationText.slice(startIndex2, endIndex2)
    }

    let firstSentenceContainingQuery =
      firstSentenceContainingQuery1 + "..." + firstSentenceContainingQuery2

    if (
      material.node.color
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      firstSentenceContainingQuery += `...${material.node.color}`
    }
    if (
      material.node.pH
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      firstSentenceContainingQuery += `...${material.node.pH}`
    }
    if (
      material.node.inci
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      firstSentenceContainingQuery += `...${material.node.inci}`
    }
    if (
      material.node.cas
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      firstSentenceContainingQuery += `...${material.node.cas}`
    }
    if (
      material.node.form
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      firstSentenceContainingQuery += `...${material.node.form}`
    }

    const encodedSearchQuery = encodeURIComponent(material.node.title)

    return {
      title: material.node.title.normalize("NFC"),
      description: firstSentenceContainingQuery.normalize("NFC") + "...",
      category: t("search.material"),
      slug: `/materials?query=${encodedSearchQuery}`,
    }
  }

  const contactMatchesQuery = contact => {
    return (
      contact.node.name
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      contact.node.email
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      contact.node.krs
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      contact.node.nip
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      contact.node.purchaseNumber
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      contact.node.registration
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      contact.node.regon
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      contact.node.salesNumber
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      contact.node.street
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      contact.node.zipCode
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    )
  }

  const mapContactData = contact => {
    let firstSentenceContainingQuery = ""

    if (
      contact.node.email
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      firstSentenceContainingQuery += `...${contact.node.email}`
    }
    if (
      contact.node.krs
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      firstSentenceContainingQuery += `...${contact.node.krs}`
    }
    if (
      contact.node.nip
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      firstSentenceContainingQuery += `...${contact.node.nip}`
    }
    if (
      contact.node.purchaseNumber
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      firstSentenceContainingQuery += `...${contact.node.purchaseNumber}`
    }
    if (
      contact.node.registration
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      firstSentenceContainingQuery += `...${contact.node.registration}`
    }
    if (
      contact.node.regon
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      firstSentenceContainingQuery += `...${contact.node.regon}`
    }
    if (
      contact.node.salesNumber
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      firstSentenceContainingQuery += `...${contact.node.salesNumber}`
    }
    if (
      contact.node.street
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      firstSentenceContainingQuery += `...${contact.node.street}`
    }
    if (
      contact.node.zipCode
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      firstSentenceContainingQuery += `...${contact.node.zipCode}`
    }
    if (firstSentenceContainingQuery === "") {
      firstSentenceContainingQuery += `...${contact.node.email}`
      firstSentenceContainingQuery += `...${contact.node.krs}`
      firstSentenceContainingQuery += `...${contact.node.nip}`
      firstSentenceContainingQuery += `...${contact.node.purchaseNumber}`
      firstSentenceContainingQuery += `...${contact.node.registration}`
      firstSentenceContainingQuery += `...${contact.node.regon}`
      firstSentenceContainingQuery += `...${contact.node.salesNumber}`
      firstSentenceContainingQuery += `...${contact.node.street}`
      firstSentenceContainingQuery += `...${contact.node.zipCode}`
    }

    return {
      title: contact.node.name.normalize("NFC"),
      description: firstSentenceContainingQuery.normalize("NFC") + "...",
      category: t("search.page"),
      slug: `/contact`,
    }
  }

  const documentMatchesQuery = (document, descriptionText) => {
    return (
      document.node.title
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      moment(document.node.updatedAt)
        .format("DD/MM/YYYY HH:MM")
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      descriptionText
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    )
  }

  const mapDocumentData = (document, slug) => {
    const descriptionContent = JSON.parse(document.node.description.raw).content
    const descriptionText = getDescriptionText(descriptionContent)
    let firstSentenceContainingQuery = descriptionText.slice(0, 100)
    let startIndex = 0
    let endIndex = descriptionText.length - 1

    const queryIndex = descriptionText
      ?.toLowerCase()
      .normalize("NFC")
      .indexOf(searchQuery?.toLowerCase().normalize("NFC"))
    if (queryIndex !== -1) {
      const queryLength = searchQuery.length
      startIndex = Math.max(0, queryIndex - 50)
      endIndex = Math.min(
        descriptionText.length - 1,
        queryIndex + queryLength + 50
      )
      firstSentenceContainingQuery =
        "..." + descriptionText.slice(startIndex, endIndex)
    }

    if (
      moment(document.node.updatedAt)
        .format("DD/MM/YYYY HH:MM")
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      firstSentenceContainingQuery += `...${moment(
        document.node.updatedAt
      ).format("DD/MM/YYYY HH:MM")}`
    }

    return {
      title: document.node.title.normalize("NFC"),
      description: firstSentenceContainingQuery.normalize("NFC") + "...",
      category: t("search.page"),
      slug: `${slug}`,
    }
  }

  const teamMatchesQuery = team => {
    return (
      team.node.name
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      team.node.education
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      team.node.role
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) ||
      team.node.description.description
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    )
  }

  const mapTeamData = team => {
    const descriptionText = team.node.description.description
    let firstSentenceContainingQuery = descriptionText.slice(0, 100)
    let startIndex = 0
    let endIndex = descriptionText.length - 1

    const queryIndex = descriptionText
      ?.toLowerCase()
      .normalize("NFC")
      .indexOf(searchQuery?.toLowerCase().normalize("NFC"))
    if (queryIndex !== -1) {
      const queryLength = searchQuery.length
      startIndex = Math.max(0, queryIndex - 50)
      endIndex = Math.min(
        descriptionText.length - 1,
        queryIndex + queryLength + 50
      )
      firstSentenceContainingQuery =
        "..." + descriptionText.slice(startIndex, endIndex)
    }

    if (
      team.node.education
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      firstSentenceContainingQuery += `...${team.node.education}`
    }

    if (
      team.node.role
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      firstSentenceContainingQuery += `...${team.node.role}`
    }

    return {
      title: team.node.name.normalize("NFC"),
      description: firstSentenceContainingQuery.normalize("NFC") + "...",
      category: t("search.page"),
      slug: `/about`,
    }
  }

  const filesMatchesQuery = file => {
    return file.node.title
      ?.toLowerCase()
      .normalize("NFC")
      .includes(searchQuery?.toLowerCase().normalize("NFC"))
  }

  const mapFilesData = file => {
    let firstSentenceContainingQuery = ""

    if (
      file.node.title
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      firstSentenceContainingQuery += `...${file.node.title}`
    }

    return {
      title: file.node.title.normalize("NFC"),
      description: firstSentenceContainingQuery.normalize("NFC") + "...",
      category: t("search.page"),
      slug: `/about`,
    }
  }

  const getDataText = content => {
    let text = ""
    for (const key in content) {
      if (content.hasOwnProperty(key)) {
        text += content[key]
        text += "... "
      }
    }
    return text
  }

  const localeMatchesQuery = locale => {
    const dataContent = JSON.parse(locale.node.data)
    const dataText = getDataText(dataContent)

    return (
      dataText
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC")) &&
      locale.node.ns !== "search" &&
      locale.node.ns !== "seo" &&
      locale.node.ns !== "not-found" &&
      locale.node.ns !== "error" &&
      // Uncomment blog - delete news here if any news avaliable
      locale.node.ns !== "news"
    )
  }

  const mapLocaleData = locale => {
    const dataContent = JSON.parse(locale.node.data)
    const dataText = getDataText(dataContent)
    let firstSentenceContainingQuery = dataText.slice(0, 150)
    let startIndex = 0
    let endIndex = dataText.length - 1

    const queryIndex = dataText
      ?.toLowerCase()
      .normalize("NFC")
      .indexOf(searchQuery?.toLowerCase().normalize("NFC"))
    if (queryIndex !== -1) {
      const queryLength = searchQuery.length
      startIndex = Math.max(0, queryIndex - 75)
      endIndex = Math.min(dataText.length - 1, queryIndex + queryLength + 75)
      firstSentenceContainingQuery =
        "..." + dataText.slice(startIndex, endIndex)
    }

    if (
      locale.node.ns === "cookie-bar" ||
      locale.node.ns === "footer" ||
      locale.node.ns === "menu"
    ) {
      return {
        title: firstSentenceContainingQuery.slice(0, 50).normalize("NFC"),
        description: firstSentenceContainingQuery.normalize("NFC") + "...",
        category: t("search.others"),
        slug: `/`,
      }
    } else if (locale.node.ns === "home") {
      return {
        title: firstSentenceContainingQuery.slice(0, 50).normalize("NFC"),
        description: firstSentenceContainingQuery.normalize("NFC") + "...",
        category: t("search.page"),
        slug: `/`,
      }
    } else {
      return {
        title: firstSentenceContainingQuery.slice(0, 50).normalize("NFC"),
        description: firstSentenceContainingQuery.normalize("NFC") + "...",
        category: t("search.page"),
        slug: `/${locale.node.ns}`,
      }
    }
  }

  return (
    <Layout>
      <Seo
        title={t`seo.search.title`}
        description={t`seo.search.description`}
      />
      <SearchHeader searchData={searchQuery} />
      {searchedData && (
        <SearchContent searchContent={searchedData} searchData={searchQuery} />
      )}
    </Layout>
  )
}

export default Search
