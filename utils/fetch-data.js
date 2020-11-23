const { createApolloFetch } = require("apollo-fetch");
const fetch = createApolloFetch({
  uri: "https://rickandmortyapi.com/graphql/",
});

export const getStatus = async (query) => {
  const res = await fetch(query);
  return res.data.characters;
};

export const getSpecies = async (query) => {
  const res = await fetch(query);
  return res.data.characters;
};
