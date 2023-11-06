import styles from "./index.module.scss";

const EndGame = (props: {
  handleRestart: () => void;
  handleResetWithRandomData: () => void;
}) => {
  return (
    <div className={styles.endGameContainer}>
      <h1>Player Wins</h1>
      <button onClick={() => props.handleRestart()}>Restart</button>
      <button onClick={() => props.handleResetWithRandomData()}>
        Random Restart
      </button>
    </div>
  );
};

export default EndGame;
