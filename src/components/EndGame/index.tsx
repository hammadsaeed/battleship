import styles from "./index.module.scss";

const EndGame = (props: { handleRestart: () => void }) => {
  return (
    <div className={styles.endGameContainer}>
      <h1>Player Wins</h1>
      <button onClick={() => props.handleRestart()}>Restart</button>
    </div>
  );
};

export default EndGame;
