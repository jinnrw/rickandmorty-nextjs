import styles from "../../styles/Character.module.scss";

function Character(props) {
  const { id, name, status, origin, species, image } = props;
  return (
    <div className={styles.character}>
      <div className={styles.characterImage}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.characterInfo}>
        <div className={styles.name}>{name}</div>
        <div className={styles.statusSpecies}>
          <div className={styles.status}>{status}</div>
          <div className={styles.species}>&nbsp;- {species}</div>
        </div>
        <div className={styles.origin}>
        <div>Origin:</div>
        <div>{origin.name}</div>
        </div>
      </div>
    </div>
  );
}

export default Character;
