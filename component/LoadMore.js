import styles from "../styles/LoadMore.module.scss";

function LoadMore(props) {
  const { fetchCharacters } = props;

  return (
    <div
      className={styles.loadMore}
      onClick={() => {
        {
          fetchCharacters();
        }
      }}
    >
      Load Characters
    </div>
  );
}

export default LoadMore;
