import { Fragment, useState } from "react";
import Head from "next/head";
import Character from "../component/Character";
import Filter from "../component/Filter";
import LoadMore from "../component/LoadMore";
import styles from "../styles/Home.module.scss";
import { getCharacters } from "../utils/fetch-data";
import {
  getSpeciesQuery,
  getStatusQuery,
  getAllCharactersQuery,
} from "../utils/get-query";
import {
  CATEGORY_SHOWALL,
  CHAR_SPECIES,
  CHAR_STATUS,
  CATEGORY_SPECIES,
  CATEGORY_STATUS,
} from "../constants";

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
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_SHOWALL);
  const [selectedFilter, setSelectedFilter] = useState();

  const fetchCharacters = async (page = 1, filter) => {
    let res;
    if (selectedCategory === CATEGORY_SPECIES) {
      res = await getCharacters(getSpeciesQuery(page, filter));
    } else if (selectedCategory === CATEGORY_STATUS) {
      res = await getCharacters(getStatusQuery(page, filter));
    } else if (selectedCategory === CATEGORY_SHOWALL) {
      res = await getCharacters(getAllCharactersQuery(characters.info.next));
    }

    if (page > 1) {
      setCharacters({
        ...characters,
        info: res.info,
        results: [...characters.results, ...res.results],
      });
    } else {
      setCharacters(res);
    }
  };
  // TODO: Refactor setSelectedFilter & setSelectedCategory
  const fetchAllCharacters = async () => {
    let res = await getCharacters(getAllCharactersQuery(1));
    setCharacters(res);
    setSelectedFilter(CATEGORY_SHOWALL);
    setSelectedCategory(CATEGORY_SHOWALL);
  };

  const renderShowAll = () => {
    const selected = selectedCategory === CATEGORY_SHOWALL;

    return (
      <div className={styles.showall}>
        <button
          onClick={() => {
            fetchAllCharacters();
          }}
          className={`
          ${styles.filter__button} 
          ${selected ? `${styles.filter__button__selected}` : ""}
          `}
        >
          All
        </button>
        {selected ? (
          <div className={styles.resultsCounter}>({resultsCounter()})</div>
        ) : (
          <Fragment />
        )}
      </div>
    );
  };

  const resultsCounter = () => {
    return `${characters.results.length} / ${characters.info.count}`;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Rick and Morty Search</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Creepster&family=Oswald:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <header className={styles.header}>
        <div className={styles.logo}>Rick and Morty Search</div>
      </header>
      <main className={styles.main}>
        <aside className={styles.sidebar}>
          {renderShowAll()}
          <Filter
            filterBy={CATEGORY_SPECIES}
            filters={CHAR_SPECIES}
            getMethods={CHAR_SPECIES.map((species) =>
              getCharacters(getSpeciesQuery(1, species))
            )}
            setCharacters={setCharacters}
            setSelectedCategory={() => {
              setSelectedCategory(CATEGORY_SPECIES);
            }}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            resultsCounter={resultsCounter()}
          />
          <Filter
            filterBy={CATEGORY_STATUS}
            filters={CHAR_STATUS}
            getMethods={CHAR_STATUS.map((status) =>
              getCharacters(getStatusQuery(1, status))
            )}
            setCharacters={setCharacters}
            setSelectedCategory={() => {
              setSelectedCategory(CATEGORY_STATUS);
            }}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            resultsCounter={resultsCounter()}
          />
        </aside>
        <div className={styles.content}>
          {/* <div className={styles.content__header}>
            Results: {characters.results.length} / {characters.info.count}
          </div> */}
          <div className={styles.characterList}>
            {characters.results.map((result) => {
              const { id, name, status, origin, species, image } = result;
              return (
                <Character
                  key={id}
                  id={id}
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
              fetchCharacters={() => {
                fetchCharacters(characters.info.next, selectedFilter);
              }}
            />
          ) : (
            <Fragment />
          )}
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <p>Built with Next.js & GraphQL</p>
          <p>
            See{" "}
            <a href="https://github.com/jinnrw/rickandmorty-nextjs" target="_blank">Source</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
