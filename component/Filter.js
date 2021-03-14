import styles from "../styles/Filter.module.scss";
import { Fragment } from "react";
import { fetchData } from "../api/apolloClient";

function Filter(props) {
  const {
    filterBy,
    filters,
    fetchQueries,
    setCharacters,
    selectedFilter,
    setSelectedFilter,
    setSelectedCategory,
    resultsCounter,
  } = props;

  return (
    <div className={styles.filterContainer}>
      <div className={styles.label}>{filterBy}</div>
      <div className={styles.filter}>
        {filters.map((filter, index) => (
          <div key={filter} className={styles.filter__item}>
            <button
              className={`${styles.filter__button} ${
                selectedFilter === filter
                  ? `${styles.filter__button__selected}`
                  : ""
              }`}
              onClick={async () => {
                let res = await fetchData(fetchQueries[index]);
                // setState after Promise resolved
                setCharacters(res);
                setSelectedFilter(filter);
                setSelectedCategory();
              }}
            >
              {filter}
            </button>
            {selectedFilter === filter ? (
              <div className={styles.resultsCounter}>({resultsCounter})</div>
            ) : (
              <Fragment />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
