import styles from "../../styles/LoadMore.module.scss";

function LoadMore(props) {
  const { fetchMoreCharacters } = props;

  return (
    <div
      className={styles.loadMore}
      onClick={() => {
        {
          fetchMoreCharacters();
        }
      }}
    >
      Load More...
    </div>
  );
}

export default LoadMore;
