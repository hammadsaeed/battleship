import { motion } from "framer-motion";
import { Position, TILETYPE } from "../../types/index.d";
import Cross from "./cross";

interface Tile {
  x: number;
  y: number;
  type: TILETYPE;
  handleClick: (position: Position) => void;
}

const buttonVariants = {
  hover: { scale: 0.8, opacity: 0.5, cursor: "pointer" },
};

const Tile = (props: Tile) => {
  const { x, y, type, handleClick } = props;

  const canClick = () => {
    if (type !== TILETYPE.EMPTY) return;
    handleClick([x, y]);
  };
  return (
    <motion.div
      initial={{
        y: -100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{ delay: (x + y) * 0.1 }}
      style={{
        width: "3em",
        height: "3em",
      }}
      key={`${x} : ${y}`}
    >
      <motion.div
        whileHover={type === TILETYPE.EMPTY ? "hover" : ""}
        variants={buttonVariants}
        onClick={canClick}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "25%",
          backgroundColor: "#fff",
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {(type === TILETYPE.MISS || type === TILETYPE.HIT) && (
          <Cross type={type} />
        )}
      </motion.div>
      <span>{`${x} : ${y}`}</span>
    </motion.div>
  );
};

export default Tile;
