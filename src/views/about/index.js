import React, { useContext, useEffect, useState } from "react"
import Seo from "../../components/seo"
import { I18nextContext, useTranslation } from "gatsby-plugin-react-i18next"
import Layout from "../../components/layout"
import AboutHeader from "./components/aboutHeader"
import AboutFirm from "./components/aboutFirm"
import AboutMission from "./components/aboutMission"
import AboutPolicy from "./components/aboutPolicy"
import AboutPeople from "./components/aboutPeople"
import AboutRules from "./components/aboutRules"
import { graphql, useStaticQuery } from "gatsby"
import getCurrentTranslations from "../../components/contentful-translator"

const About = () => {
  const { t } = useTranslation()
  const { language } = useContext(I18nextContext)
  const data = useStaticQuery(graphql`
    query {
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
    }
  `)

  const [textData, setTextData] = useState()
  useEffect(() => {
    const getData = () => {
      const getTextData = getCurrentTranslations(
        data.allContentfulTextOnThePage.edges,
        language
      )
      setTextData(getTextData[0])
    }
    getData()
  }, [data.allContentfulTextOnThePage, language])

  return (
    <Layout>
      <Seo title={t`seo.about.title`} description={t`seo.about.description`} />
      <AboutHeader />
      {textData && <AboutFirm textData={textData} />}
      {textData && <AboutMission textData={textData} />}
      <AboutPolicy />
      <AboutPeople />
      <AboutRules />
    </Layout>
  )
}
export default About
