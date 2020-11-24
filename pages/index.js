import { Fragment, useState } from "react";
import Head from "next/head";
import Character from "../component/Character";
import Filter from "../component/Filter";
import LoadMore from "../component/LoadMore";
import styles from "../styles/Home.module.scss";
import { getStatus, getSpecies } from "../utils/fetch-data";
import {
  getSpeciesQuery,
  getStatusQuery,
  getAllCharactersQuery,
} from "../utils/get-query";

const { createApolloFetch } = require("apollo-fetch");
const fetch = createApolloFetch({
  uri: "https://rickandmortyapi.com/graphql/",
});

export async function getStaticProps() {
  const data = await fetch({
    query: `query {
      characters(page:1) {
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
      episodes(page:1) {
        info {
          count
        }
      }
    }`,
  }).then((res) => res.data);

  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  const defaultCharacters = { ...data.characters };
  const [characters, setCharacters] = useState(defaultCharacters);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFilter, setSelectedFilter] = useState();
  const SPECIES = ["human", "alien", "disease", "creature"];
  const STATUS = ["alive", "Dead", "Unknown"];

  const fetchMoreCharacters = async (page, filter) => {
    let res;
    if (selectedCategory === "Species") {
      res = await getSpecies(getSpeciesQuery(page, filter));
    } else if (selectedCategory === "Status") {
      res = await getStatus(getStatusQuery(page, filter));
    } else if (selectedCategory === "All") {
      res = await getStatus(getAllCharactersQuery(characters.info.next));
    }

    let newCharacters = {
      ...characters,
      info: res.info,
      results: [...characters.results, ...res.results],
    };
    setCharacters(newCharacters);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Rick and Morty Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <div className={styles.logo}>Rick and Morty Search</div>
      </header>
      <main className={styles.main}>
        <aside className={styles.sidebar}>
          {/* TODO: SHOW ALL */}
          <Filter
            filterBy="Species"
            filters={SPECIES}
            getMethods={SPECIES.map((species) =>
              getSpecies(getSpeciesQuery(1, species))
            )}
            setCharacters={setCharacters}
            setSelectedCategory={() => {
              setSelectedCategory("Species");
            }}
            setSelectedFilter={setSelectedFilter}
          />
          <Filter
            filterBy="Status"
            filters={STATUS}
            getMethods={STATUS.map((status) =>
              getStatus(getStatusQuery(1, status))
            )}
            setCharacters={setCharacters}
            setSelectedCategory={() => {
              setSelectedCategory("Status");
            }}
            setSelectedFilter={setSelectedFilter}
          />
        </aside>
        <div className={styles.content}>
          <div className={styles.content__header}>
            Results: {characters.results.length} / {characters.info.count}
          </div>
          <div className={styles.characterList}>
            {characters.results.map((result) => {
              const { id, name, status, origin, species, image } = result;
              return (
                <Character
                  key={id}
                  name={name}
                  status={status}
                  species={species}
                  origin={origin}
                  image={image}
                />
              );
            })}
          </div>
          {typeof characters.info.next === "number" ? (
            <LoadMore
              fetchMoreCharacters={() => {
                fetchMoreCharacters(characters.info.next, selectedFilter);
              }}
            />
          ) : (
            <Fragment />
          )}
        </div>
      </main>
      <footer className={styles.footer}>
        <p>Made with Next.js</p>
      </footer>
    </div>
  );
}
