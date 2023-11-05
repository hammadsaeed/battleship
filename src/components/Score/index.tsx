import { shipTypes } from "../../constants";
import { PositionMap, SHIP, Score as ScoreType } from "../../types/index.d";
import ShipDetails from "./shipDetails";
import styles from "./index.module.scss";
import { useAppSelector } from "../../store/hooks";
import { motion } from "framer-motion";

interface IScore {
  positionsMap: PositionMap;
  allScores: ScoreType;
}

const addNumberPadding = (score: number) =>
  score > 9 ? `${score}` : `0${score}`;

const Player = (props: { player: number; playerScore: number }) => {
  return (
    <div className={styles.playerScore} data-player={props.player}>
      <h2>{addNumberPadding(props.playerScore)}</h2>
      <hr />
      <h5>Player {props.player}</h5>
    </div>
  );
};
const Score = (props: IScore) => {
  const { positionsMap, allScores } = props;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={styles.scoreboardContainer}
    >
      <div className={styles.playerScoreContainer}>
        <Player player={1} playerScore={allScores.player1} />
        <Player player={2} playerScore={allScores.player2} />
      </div>
      <div className={styles.shipsContainer}>
        {Object.keys(shipTypes).map((ship) => {
          const available = Object.values(positionsMap).filter(
            (data) => data === ship
          ).length;
          return (
            <ShipDetails ship={ship as SHIP} key={ship} available={available} />
          );
        })}
      </div>
    </motion.div>
  );
};

export default Score;
