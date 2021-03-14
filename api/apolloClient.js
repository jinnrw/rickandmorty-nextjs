import { ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
  cache: new InMemoryCache(),
});

export const fetchData = async (query) => {
  const res = await client.query(query).then((res) => res.data);
  return res.characters;
};
