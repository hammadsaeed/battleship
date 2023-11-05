import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  resetGrid,
  selectGrid,
  selectShipPositions,
  setectStatus,
  setStatus,
  updateTile,
} from "../../slices/gridSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  Position,
  PositionMap,
  SHIP,
  STATUS,
  TILETYPE,
} from "../../types/index.d";
import EndGame from "../EndGame";
import Score from "../Score";
import Tile from "../Tile";
import styles from "./index.module.scss";

const defaultScore = {
  player1: 0,
  player2: 0,
};

const Board = () => {
  const dispatch = useAppDispatch();
  const grid = useAppSelector(selectGrid);
  const shipPositions = useAppSelector(selectShipPositions);
  const status = useAppSelector(setectStatus);
  const [positionsMap, setPositionsMap] = useState<PositionMap>({});
  const [score, setScore] = useState(defaultScore);

  useEffect(() => {
    const positionMap: Record<string, SHIP> = {};

    if (shipPositions.length && status === STATUS.START) {
      for (const shipData of shipPositions) {
        for (const position of shipData.positions) {
          const positionKey = position.join(",");
          positionMap[positionKey] = shipData.ship;
        }
      }
      setPositionsMap(positionMap);
    }
  }, [dispatch, shipPositions, status]);

  useEffect(() => {
    const getLength = Object.keys(positionsMap)?.length;
    if (status === STATUS.START && getLength) {
      dispatch(setStatus(STATUS.INGAME));
    }
  }, [status, positionsMap, dispatch]);

  const handleClick = (position: Position) => {
    const positionKeyToFind = `${position[0]},${position[1]}`;
    let value = TILETYPE.MISS;
    if (positionsMap[positionKeyToFind]) {
      value = TILETYPE.HIT;
      setPositionsMap((prevState) => {
        const newState = { ...prevState };
        delete newState[positionKeyToFind];
        return newState;
      });
    }
    dispatch(
      updateTile({
        row: position[0],
        column: position[1],
        value,
      })
    );
    if (value === TILETYPE.HIT) {
      setScore((prev) => ({ ...prev, player1: prev.player1 + 1 }));
    } else {
      setScore((prev) => ({ ...prev, player2: prev.player2 + 1 }));
    }
  };

  const handleRestart = () => {
    dispatch(setStatus(STATUS.START));
    dispatch(resetGrid());
    setScore(defaultScore);
  };

  useEffect(() => {
    const getLength = Object.keys(positionsMap)?.length;

    if (!getLength && status === STATUS.INGAME) {
      dispatch(setStatus(STATUS.ENDGAME));
    }
  }, [positionsMap, status, dispatch]);

  return (
    <div className={styles.container}>
      {status === STATUS.ENDGAME && <EndGame handleRestart={handleRestart} />}
      <Score positionsMap={positionsMap} allScores={score} />
      <motion.div className={styles.tileGridContainer}>
        {grid.map((row, i) => (
          <React.Fragment key={`row-${i}`}>
            {row.map((tile) => (
              <Tile
                x={tile.x}
                y={tile.y}
                type={tile.type}
                key={`${tile.x} : ${tile.y}`}
                handleClick={handleClick}
              />
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default Board;
