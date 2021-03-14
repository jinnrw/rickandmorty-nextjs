export const getSpeciesQuery = (page, species) => {
  return {
    query: `query {
      characters(page: ${page}, filter: { species: "${species}" }) {
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
    }`,
  };
};

export const getStatusQuery = (page, status) => {
  return {
    query: `query {
      characters(page: ${page}, filter: { status: "${status}" }) {
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
    }`,
  };
};

export const getAllCharactersQuery = (page=1) => {
  return {
    query: `query {
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
    }`,
  };
};