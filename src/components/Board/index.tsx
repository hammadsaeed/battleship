import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  selectGrid,
  selectShipPositions,
  setPositions,
  updateTile,
} from "../../slices/gridSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Position, PositionMap, SHIP, TILETYPE } from "../../types/index.d";
import Score from "../Score";
import Tile from "../Tile";

const padding = "0.25em";

const Board = () => {
  const dispatch = useAppDispatch();
  const grid = useAppSelector(selectGrid);
  const shipPositions = useAppSelector(selectShipPositions);
  const [positionsMap, setPositionsMap] = useState<PositionMap>({});

  useEffect(() => {
    const positionMap: Record<string, SHIP> = {};

    if (shipPositions.length) {
      for (const shipData of shipPositions) {
        for (const position of shipData.positions) {
          const positionKey = position.join(",");
          positionMap[positionKey] = shipData.ship;
        }
      }
      setPositionsMap(positionMap);
    }
  }, [dispatch, shipPositions]);

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
  };

  useEffect(() => {
    const getLength = Object.keys(positionsMap)?.length;
    if (!getLength) {
      console.log("end game");
    }
  }, [positionsMap]);

  return (
    <div style={{ display: "flex" }}>
      <Score positionsMap={positionsMap} />
      <motion.div
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          background: "black",
          borderRadius: "5%",
          padding: "1%",
          gridGap: padding,
        }}
      >
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
