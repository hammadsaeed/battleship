import { motion } from "framer-motion";
import { Position, TILETYPE } from "../../types/index.d";
import Cross from "./cross";
import styles from "./index.module.scss";

interface ITile {
  x: number;
  y: number;
  type: TILETYPE;
  handleClick: (position: Position) => void;
}

const buttonVariants = {
  hover: { scale: 0.8, opacity: 0.5, cursor: "pointer" },
  none: {},
};

const Tile = (props: ITile) => {
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
      className={styles.tileContainer}
      key={`${x} : ${y}`}
    >
      <motion.div
        whileHover={{ scale: 0.8, opacity: 0.5, cursor: "pointer" }}
        variants={buttonVariants}
        onClick={canClick}
        className={styles.tile}
        data-filled={type !== TILETYPE.EMPTY}
      >
        {(type === TILETYPE.MISS || type === TILETYPE.HIT) && (
          <Cross type={type} />
        )}
      </motion.div>
    </motion.div>
  );
};

export default Tile;
