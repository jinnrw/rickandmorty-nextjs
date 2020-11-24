import styles from "../styles/Filter.module.scss";
import { Fragment } from "react";

function Filter(props) {
  const {
    filterBy,
    filters,
    getMethods,
    setCharacters,
    setSelectedFilter,
    setSelectedCategory
  } = props;

  return (
    <div className={styles.filterContainer}>
      <div className={styles.label}>{filterBy}</div>
      <div className={styles.filter}>
        {filters.map((filter, index) => (
          <div key={filter} className={styles.filter__item}>
            <button
              className={styles.filter__button}
              onClick={async () => {
                let result = await getMethods[index];
                // setState after Promise resolved
                console.log(result);
                setCharacters(result);
                setSelectedFilter(filter);
                setSelectedCategory();
              }}
            >
              {filter}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
