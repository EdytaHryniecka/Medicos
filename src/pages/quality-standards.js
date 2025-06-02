import QualityStandards from "../views/quality-standards"
import { graphql } from "gatsby"

export default QualityStandards

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
