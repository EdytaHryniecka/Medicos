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
  // comment blog

  const data = useStaticQuery(graphql`
    query {
      allContentfulArticle {
        edges {
          node {
            title
            node_locale
            slug
            author
            createdAt
            description {
              raw
            }
          }
        }
      }
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
            buttonText
            description {
              raw
            }
          }
        }
      }
      allContentfulTextOnThePage {
        edges {
          node {
            node_locale
            oNasTytu
            oNasOpis {
              raw
            }
            oNasNaszaWizjaTytu
            oNasNaszaWizjaOpis {
              raw
            }
            oNasNaszaMisjaTytu
            oNasNaszaMisjaOpis {
              raw
            }
            oNasZespTytu
            oNasZespOpis {
              raw
            }
            oNasZasadyWsppracyTytu
            oNasZasadyWsppracyOpis {
              raw
            }
          }
        }
      }
      allContentfulTextOnTheRawMaterialsPages {
        edges {
          node {
            node_locale
            householdChemicalsTytu1
            householdChemicalsOpis1 {
              raw
            }
            householdChemicalsTytu2
            householdChemicalsOpis2 {
              raw
            }
            cosmetologyTytu1
            cosmetologyOpis1 {
              raw
            }
            cosmetologyTytu2
            cosmetologyOpis2 {
              raw
            }
            pharmacyTytu1
            pharmacyOpis1 {
              raw
            }
            pharmacyTytu2
            pharmacyOpis2 {
              raw
            }
            foodAndSupplementsTytu1
            foodAndSupplementsOpis1 {
              raw
            }
            foodAndSupplementsTytu2
            foodAndSupplementsOpis2 {
              raw
            }
            otherIndustriesTytu1
            otherIndustriesOpis1 {
              raw
            }
            otherIndustriesTytu2
            otherIndustriesOpis2 {
              raw
            }
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

    // comment blog
    const processArticles = () => {
      const articles = getCurrentTranslations(
        data.allContentfulArticle.edges,
        language
      )
      if (
        searchQuery &&
        searchQuery.trim() !== "" &&
        !isOnlyDots(searchQuery)
      ) {
        const filteredArticles = articles
          .filter(article => {
            const descriptionContent = JSON.parse(
              article.node.description.raw
            ).content
            const descriptionText = getDescriptionText(descriptionContent)
            return articleMatchesQuery(article, descriptionText)
          })
          .map(article => mapArticleData(article))

        setSearchedData(prevData => [...prevData, ...filteredArticles])
      }
    }

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
            if (con.node.description) {
              const descriptionContent = JSON.parse(
                con.node.description.raw
              ).content
              const descriptionText = getDescriptionText(descriptionContent)
              return filesMatchesQuery(con, descriptionText)
            }
            return filesMatchesQuery(con)
          })
          .map(con => mapFilesData(con))

        setSearchedData(prevData => [...prevData, ...filteredPolicyFiles])
      }
    }

    const processTextOnThePage = () => {
      const textOnThePage = getCurrentTranslations(
        data.allContentfulTextOnThePage.edges,
        language
      )
      if (
        searchQuery &&
        searchQuery.trim() !== "" &&
        !isOnlyDots(searchQuery)
      ) {
        const filteredTextOnThePage = textOnThePage
          .filter(text => {
            const oNasOpisContent = JSON.parse(text.node.oNasOpis.raw).content
            const oNasNaszaWizjaOpisContent = JSON.parse(
              text.node.oNasNaszaWizjaOpis.raw
            ).content
            const oNasNaszaMisjaOpisContent = JSON.parse(
              text.node.oNasNaszaMisjaOpis.raw
            ).content
            const oNasZespOpisContent = JSON.parse(
              text.node.oNasZespOpis.raw
            ).content
            const oNasZasadyWsppracyOpisContent = JSON.parse(
              text.node.oNasZasadyWsppracyOpis.raw
            ).content

            const oNasOpisText = getDescriptionText(oNasOpisContent)
            const oNasNaszaWizjaOpisText = getDescriptionText(
              oNasNaszaWizjaOpisContent
            )
            const oNasNaszaMisjaOpisText = getDescriptionText(
              oNasNaszaMisjaOpisContent
            )
            const oNasZespOpisText = getDescriptionText(oNasZespOpisContent)
            const oNasZasadyWsppracyOpisText = getDescriptionText(
              oNasZasadyWsppracyOpisContent
            )

            return textOnThePageMatchesQuery(
              text,
              oNasOpisText,
              oNasNaszaWizjaOpisText,
              oNasNaszaMisjaOpisText,
              oNasZespOpisText,
              oNasZasadyWsppracyOpisText
            )
          })
          .map(text => textOnThePageData(text))
        setSearchedData(prevData => [...prevData, ...filteredTextOnThePage])
      }
    }

    //proces by allContentfulTextOnTheRawMaterialsPages
    const translatedMaterialsText = getCurrentTranslations(
      data.allContentfulTextOnTheRawMaterialsPages.edges,
      language
    )

    const processTextOnTheRawMaterialsPages = (
      title1,
      description1,
      title2,
      description2,
      materialsTextslug
    ) => {
      if (
        searchQuery &&
        searchQuery.trim() !== "" &&
        !isOnlyDots(searchQuery)
      ) {
        const filteredMaterialsText = translatedMaterialsText
          .filter(materialText => {
            const passedTitle1 = materialText.node[title1]
            const passedDescription1Content = JSON.parse(
              materialText.node[description1].raw
            ).content
            const passedDescription1Text = getDescriptionText(
              passedDescription1Content
            )
            const passedTitle2 = materialText.node[title2]
            const passedDescription2Content = JSON.parse(
              materialText.node[description2].raw
            ).content
            const passedDescription2Text = getDescriptionText(
              passedDescription2Content
            )
            return materialsTextMatchesQuery(
              passedTitle1,
              passedDescription1Text,
              passedTitle2,
              passedDescription2Text
            )
          })
          .map(materialText =>
            mapMaterialsTextData(
              materialText,
              title1,
              description1,
              title2,
              description2,
              materialsTextslug
            )
          )

        setSearchedData(prevData => [...prevData, ...filteredMaterialsText])
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

    // comment blog
    processArticles()
    processMaterials()
    processContact()
    processPrivacyPolicy()
    processWebsiteRegulations()
    processTeam()
    processRulesFiles()
    processPolicyFiles()
    processTextOnThePage()
    processTextOnTheRawMaterialsPages(
      "householdChemicalsTytu1",
      "householdChemicalsOpis1",
      "householdChemicalsTytu2",
      "householdChemicalsOpis2",
      "household-chemicals"
    )
    processTextOnTheRawMaterialsPages(
      "cosmetologyTytu1",
      "cosmetologyOpis1",
      "cosmetologyTytu2",
      "cosmetologyOpis2",
      "cosmetology"
    )
    processTextOnTheRawMaterialsPages(
      "pharmacyTytu1",
      "pharmacyOpis1",
      "pharmacyTytu2",
      "pharmacyOpis2",
      "pharmacy"
    )
    processTextOnTheRawMaterialsPages(
      "foodAndSupplementsTytu1",
      "foodAndSupplementsOpis1",
      "foodAndSupplementsTytu2",
      "foodAndSupplementsOpis2",
      "food-and-supplements"
    )
    processTextOnTheRawMaterialsPages(
      "otherIndustriesTytu1",
      "otherIndustriesOpis1",
      "otherIndustriesTytu2",
      "otherIndustriesOpis2",
      "other-industries"
    )
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
        "text",
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
      article.node.authorRep.authorName
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      firstSentenceContainingQuery += `...${article.node.authorRep.authorName}`
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
      checkMatchesQuery(material.node.title) ||
      checkMatchesQuery(material.node.color) ||
      checkMatchesQuery(material.node.pH) ||
      checkMatchesQuery(material.node.inci) ||
      checkMatchesQuery(material.node.cas) ||
      checkMatchesQuery(material.node.form) ||
      checkMatchesQuery(generalInformationText) ||
      checkMatchesQuery(applicationText)
    )
  }

  const mapMaterialData = material => {
    let firstSentenceContainingQuery = ""

    if (material.node.generalInformation) {
      const parsed = parseDataRaw(material.node.generalInformation.raw)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (material.node.application) {
      const parsed = parseDataRaw(material.node.application.raw)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (material.node.color) {
      const parsed = checkMatchesQueryAndReturnData(material.node.color)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (material.node.pH) {
      const parsed = checkMatchesQueryAndReturnData(material.node.pH)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (material.node.inci) {
      const parsed = checkMatchesQueryAndReturnData(material.node.inci)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (material.node.cas) {
      const parsed = checkMatchesQueryAndReturnData(material.node.cas)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (material.node.form) {
      const parsed = checkMatchesQueryAndReturnData(material.node.form)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
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
      checkMatchesQuery(contact.node.name) ||
      checkMatchesQuery(contact.node.email) ||
      checkMatchesQuery(contact.node.krs) ||
      checkMatchesQuery(contact.node.nip) ||
      checkMatchesQuery(contact.node.purchaseNumber) ||
      checkMatchesQuery(contact.node.registration) ||
      checkMatchesQuery(contact.node.regon) ||
      checkMatchesQuery(contact.node.salesNumber) ||
      checkMatchesQuery(contact.node.street) ||
      checkMatchesQuery(contact.node.zipCode)
    )
  }

  const mapContactData = contact => {
    let firstSentenceContainingQuery = ""

    if (contact.node.email) {
      const parsed = checkMatchesQueryAndReturnData(contact.node.email)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (contact.node.krs) {
      const parsed = checkMatchesQueryAndReturnData(contact.node.krs)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (contact.node.nip) {
      const parsed = checkMatchesQueryAndReturnData(contact.node.nip)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (contact.node.purchaseNumber) {
      const parsed = checkMatchesQueryAndReturnData(contact.node.purchaseNumber)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (contact.node.registration) {
      const parsed = checkMatchesQueryAndReturnData(contact.node.registration)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (contact.node.regon) {
      const parsed = checkMatchesQueryAndReturnData(contact.node.regon)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (contact.node.salesNumber) {
      const parsed = checkMatchesQueryAndReturnData(contact.node.salesNumber)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (contact.node.street) {
      const parsed = checkMatchesQueryAndReturnData(contact.node.street)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (contact.node.zipCode) {
      const parsed = checkMatchesQueryAndReturnData(contact.node.zipCode)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
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
      checkMatchesQuery(document.node.title) ||
      checkMatchesDateQuery(document.node.updatedAt) ||
      checkMatchesQuery(descriptionText)
    )
  }

  const mapDocumentData = (document, slug) => {
    let firstSentenceContainingQuery = ""

    if (document.node.description) {
      const parsed = parseDataRaw(document.node.description.raw)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (document.node.updatedAt) {
      const parsed = checkMatchesDateQueryAndReturnData(document.node.updatedAt)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
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
      checkMatchesQuery(team.node.name) ||
      checkMatchesQuery(team.node.education) ||
      checkMatchesQuery(team.node.role) ||
      checkMatchesQuery(team.node.description.description)
    )
  }

  const mapTeamData = team => {
    let firstSentenceContainingQuery = ""
    if (team.node.description) {
      const parsed = parseDataDescription(team.node.description.description)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (team.node.education) {
      const parsed = checkMatchesQueryAndReturnData(team.node.education)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (team.node.role) {
      const parsed = checkMatchesQueryAndReturnData(team.node.role)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    return {
      title: team.node.name.normalize("NFC"),
      description: firstSentenceContainingQuery.normalize("NFC") + "...",
      category: t("search.page"),
      slug: `/about`,
    }
  }

  const filesMatchesQuery = (file, descriptionText) => {
    return (
      checkMatchesQuery(file.node.title) ||
      checkMatchesQuery(file.node.buttonText) ||
      checkMatchesQuery(descriptionText)
    )
  }

  const mapFilesData = file => {
    let firstSentenceContainingQuery = ""

    if (file.node.title) {
      const parsed = checkMatchesQueryAndReturnData(file.node.title)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (file.node.buttonText) {
      const parsed = checkMatchesQueryAndReturnData(file.node.buttonText)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (file.node.description) {
      const parsed = parseDataRaw(file.node.description.raw)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    return {
      title: file.node.title.normalize("NFC"),
      description: firstSentenceContainingQuery.normalize("NFC") + "...",
      category: t("search.page"),
      slug: `/quality-standards`,
    }
  }

  const textOnThePageMatchesQuery = (
    text,
    oNasOpisText,
    oNasNaszaWizjaOpisText,
    oNasNaszaMisjaOpisText,
    oNasZespOpisText,
    oNasZasadyWsppracyOpisText
  ) => {
    return (
      checkMatchesQuery(text.node.oNasTytu) ||
      checkMatchesQuery(text.node.oNasNaszaWizjaTytu) ||
      checkMatchesQuery(text.node.oNasNaszaMisjaTytu) ||
      checkMatchesQuery(text.node.oNasZespTytu) ||
      checkMatchesQuery(text.node.oNasZasadyWsppracyTytu) ||
      checkMatchesQuery(oNasOpisText) ||
      checkMatchesQuery(oNasNaszaWizjaOpisText) ||
      checkMatchesQuery(oNasNaszaMisjaOpisText) ||
      checkMatchesQuery(oNasZespOpisText) ||
      checkMatchesQuery(oNasZasadyWsppracyOpisText)
    )
  }

  const textOnThePageData = text => {
    let firstSentenceContainingQuery = ""

    if (text.node.oNasTytu) {
      const parsed = checkMatchesQueryAndReturnData(text.node.oNasTytu)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (text.node.oNasNaszaWizjaTytu) {
      const parsed = checkMatchesQueryAndReturnData(
        text.node.oNasNaszaWizjaTytu
      )
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (text.node.oNasNaszaMisjaTytu) {
      const parsed = checkMatchesQueryAndReturnData(
        text.node.oNasNaszaMisjaTytu
      )
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (text.node.oNasZespTytu) {
      const parsed = checkMatchesQueryAndReturnData(text.node.oNasZespTytu)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (text.node.oNasZasadyWsppracyTytu) {
      const parsed = checkMatchesQueryAndReturnData(
        text.node.oNasZasadyWsppracyTytu
      )
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (text.node.oNasOpis) {
      const parsed = parseDataRaw(text.node.oNasOpis.raw)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (text.node.oNasNaszaWizjaOpis) {
      const parsed = parseDataRaw(text.node.oNasNaszaWizjaOpis.raw)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (text.node.oNasNaszaMisjaOpis) {
      const parsed = parseDataRaw(text.node.oNasNaszaMisjaOpis.raw)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (text.node.oNasZespOpis) {
      const parsed = parseDataRaw(text.node.oNasZespOpis.raw)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (text.node.oNasZasadyWsppracyOpis) {
      const parsed = parseDataRaw(text.node.oNasZasadyWsppracyOpis.raw)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    return {
      title: firstSentenceContainingQuery.slice(0, 50).normalize("NFC"),
      description: firstSentenceContainingQuery.normalize("NFC") + "...",
      category: t("search.page"),
      slug: `/about`,
    }
  }

  const materialsTextMatchesQuery = (
    passedTitle1,
    passedDescription1Text,
    passedTitle2,
    passedDescription2Text
  ) => {
    return (
      checkMatchesQuery(passedTitle1) ||
      checkMatchesQuery(passedDescription1Text) ||
      checkMatchesQuery(passedTitle2) ||
      checkMatchesQuery(passedDescription2Text)
    )
  }

  const mapMaterialsTextData = (
    materialText,
    title1,
    description1,
    title2,
    description2,
    materialsTextslug
  ) => {
    let firstSentenceContainingQuery = ""

    if (materialText.node[title1]) {
      const parsed = checkMatchesQueryAndReturnData(materialText.node[title1])
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (materialText.node[description1]) {
      const parsed = parseDataRaw(materialText.node[description1].raw)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (materialText.node[title2]) {
      const parsed = checkMatchesQueryAndReturnData(materialText.node[title2])
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    if (materialText.node[description2]) {
      const parsed = parseDataRaw(materialText.node[description2].raw)
      if (parsed) {
        firstSentenceContainingQuery += parsed
      }
    }

    return {
      title: firstSentenceContainingQuery.slice(0, 50).normalize("NFC"),
      description: firstSentenceContainingQuery.normalize("NFC") + "...",
      category: t("search.page"),
      slug: `/${materialsTextslug}`,
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
      // comment blog - delete news here if any news avaliable
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

  const parseDataRaw = dataRaw => {
    const dataContent = JSON.parse(dataRaw).content
    const dataText = getDescriptionText(dataContent)

    if (
      dataText
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      let firstSentenceContainingQuery = dataText.slice(0, 100)
      let startIndex = 0
      let endIndex = dataText.length - 1

      const queryIndex = dataText
        ?.toLowerCase()
        .normalize("NFC")
        .indexOf(searchQuery?.toLowerCase().normalize("NFC"))
      if (queryIndex !== -1) {
        const queryLength = searchQuery.length
        startIndex = Math.max(0, queryIndex - 50)
        endIndex = Math.min(dataText.length - 1, queryIndex + queryLength + 50)
        firstSentenceContainingQuery =
          "..." + dataText.slice(startIndex, endIndex)
      }
      return firstSentenceContainingQuery
    }
  }

  const parseDataDescription = dataDescription => {
    const dataText = dataDescription
    if (
      dataText
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      let firstSentenceContainingQuery = dataText.slice(0, 100)
      let startIndex = 0
      let endIndex = dataText.length - 1

      const queryIndex = dataText
        ?.toLowerCase()
        .normalize("NFC")
        .indexOf(searchQuery?.toLowerCase().normalize("NFC"))
      if (queryIndex !== -1) {
        const queryLength = searchQuery.length
        startIndex = Math.max(0, queryIndex - 50)
        endIndex = Math.min(dataText.length - 1, queryIndex + queryLength + 50)
        firstSentenceContainingQuery =
          "..." + dataText.slice(startIndex, endIndex)
        return firstSentenceContainingQuery
      }
    }
  }

  const checkMatchesQueryAndReturnData = data => {
    if (
      data
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      return `...${data}`
    }
  }

  const checkMatchesDateQueryAndReturnData = data => {
    if (
      moment(data)
        .format("DD/MM/YYYY HH:MM")
        ?.toLowerCase()
        .normalize("NFC")
        .includes(searchQuery?.toLowerCase().normalize("NFC"))
    ) {
      return `...${moment(data).format("DD/MM/YYYY HH:MM")}`
    }
  }

  const checkMatchesQuery = data => {
    if (!data) return false
    const check = data
      ?.toLowerCase()
      .normalize("NFC")
      .includes(searchQuery?.toLowerCase().normalize("NFC"))
    return check
  }

  const checkMatchesDateQuery = data => {
    if (!data) return false
    const check = moment(data)
      .format("DD/MM/YYYY HH:MM")
      ?.toLowerCase()
      .normalize("NFC")
      .includes(searchQuery?.toLowerCase().normalize("NFC"))
    return check
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
