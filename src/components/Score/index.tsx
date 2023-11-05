import { shipTypes } from "../../constants";
import { PositionMap, SHIP } from "../../types/index.d";
import ShipDetails from "./shipDetails";
import styles from "./index.module.scss";

interface IScore {
  positionsMap: PositionMap;
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
  const { positionsMap } = props;

  return (
    <div className={styles.scoreboardContainer}>
      <div className={styles.playerScoreContainer}>
        <Player player={1} playerScore={0} />
        <Player player={2} playerScore={0} />
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
    </div>
  );
};

export default Score;
