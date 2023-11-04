import { motion } from "framer-motion";
import { updateGrid } from "../../slices/gridSlice";
import { useAppDispatch } from "../../store/hooks";
import { TILETYPE } from "../../types/index.d";

interface Tile {
  x: number;
  y: number;
  type: TILETYPE;
}

const Tile = (props: Tile) => {
  const { x, y, type } = props;
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (type !== TILETYPE.EMPTY) return;
    dispatch(updateGrid([x, y]));
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
        whileHover={{ scale: 0.8, opacity: 0.5 }}
        onClick={handleClick}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "25%",
          backgroundColor: "#fff",
        }}
      />
      <span>{`${x} : ${y}`}</span>
    </motion.div>
  );
};

export default Tile;
