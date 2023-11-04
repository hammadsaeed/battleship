import { motion } from "framer-motion";
import React from "react";
import { selectGrid } from "../../slices/gridSlice";
import { useAppSelector } from "../../store/hooks";
import Tile from "../Tile";

const padding = "0.25em";

const Board = () => {
  const grid = useAppSelector(selectGrid);
  return (
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
            />
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  );
};

export default Board;
