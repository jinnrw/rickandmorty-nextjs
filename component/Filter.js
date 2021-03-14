import styles from "../styles/Filter.module.scss";
import { Fragment } from "react";

function Filter(props) {
  const {
    filterBy,
    filters,
    getMethods,
    setCharacters,
    selectedFilter,
    setSelectedFilter,
    setSelectedCategory,
    resultsCounter
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
                let result = await getMethods[index];
                // setState after Promise resolved
                setCharacters(result);
                setSelectedFilter(filter);
                setSelectedCategory();
              }}
            >
              {filter}
            </button>
            {selectedFilter === filter ? (
              <div className={styles.resultsCounter}>
                ({resultsCounter})
              </div>
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
