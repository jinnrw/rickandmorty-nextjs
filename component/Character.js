import styles from "../styles/Character.module.scss";
// import Link from "next/link";

function Character(props) {
  const { id, name, status, origin, species, image } = props;

  const getStatusClassName = (status)=> {
    return (styles[`status__${status}`])
  }

  return (
    // <Link href="/character/[id]" as={`/character/${id}`}>
      // <a>
        <div className={styles.character}>
          <div className={styles.characterImage}>
            <img src={image} alt={name} />
          </div>
          <div className={styles.characterInfo}>
            <div className={styles.name}>{name}</div>
            <div className={styles.statusSpecies}>
              <div className={`${styles.status} ${getStatusClassName(status)}`} title={status}></div>
              <div className={styles.species}>{species}</div>
            </div>
            {/* <div className={styles.origin}>
              <div>Origin:</div>
              <div>{origin.name}</div>
            </div> */}
          </div>
        </div>
      // </a>
    // </Link>
  );
}

export default Character;
