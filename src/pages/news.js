import News from "../views/news"
import { graphql } from "gatsby"
import NotFound from "./404"

// Uncomment blog
// export default News

export default NotFound

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
