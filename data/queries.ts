import gql from "graphql-tag";

export const HOME_QUERY = gql`
  query Home {
    page(id: "5", idType: DATABASE_ID) {
      title
      content(format: RENDERED)
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;
