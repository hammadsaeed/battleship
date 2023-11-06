import { selectWinner } from "../../slices/gridSlice";
import { useAppSelector } from "../../store/hooks";
import styles from "./index.module.scss";

const EndGame = (props: {
  handleRestart: () => void;
  handleResetWithRandomData: () => void;
}) => {
  const winner = useAppSelector(selectWinner);
  return (
    <div className={styles.endGameContainer}>
      <h1>{winner} Wins</h1>
      <button onClick={() => props.handleRestart()}>Restart</button>
      <button onClick={() => props.handleResetWithRandomData()}>
        Random Restart
      </button>
    </div>
  );
};

export default EndGame;
