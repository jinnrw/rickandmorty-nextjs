import { gql } from "@apollo/client";

export const queryCreator = (page = 1, type, name) => ({
  query: gql`
      query {
        characters(page: ${page}, filter: { ${[type]}: "${name}" }) {
          info {
            count
            next
          }
          results {
            id
            name
            status
            species
            origin {
              name
            }
            image
          }
        }
      }
    `,
});

export const queryAllCharacters = (page = 1) => ({
  query: gql`
    query {
      characters(page: ${page}) {
        info {
          count
          next
        }
        results {
          id
          name
          status
          species
          origin {
            name
          }
          image
        }
      }
    }
  `,
});
