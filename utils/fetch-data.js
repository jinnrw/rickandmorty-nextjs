const { createApolloFetch } = require("apollo-fetch");
const fetch = createApolloFetch({
  uri: "https://rickandmortyapi.com/graphql/",
});

export const getCharacters = async (query) => {
  const res = await fetch(query);
  return res.data.characters;
};
