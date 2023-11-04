import { motion } from "framer-motion";
import { shipTypes } from "../../constants";
import { PositionMap, SHIP } from "../../types/index.d";
import ShipDetails from "./shipDetails";

interface Score {
  positionsMap: PositionMap;
}
const Score = (props: Score) => {
  const { positionsMap } = props;

  return (
    <motion.div
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        borderRadius: "5%",
        padding: "1%",
      }}
    >
      {Object.keys(shipTypes).map((ship) => {
        const available = Object.values(positionsMap).filter(
          (data) => data === ship
        ).length;
        return (
          <ShipDetails ship={ship as SHIP} key={ship} available={available} />
        );
      })}
    </motion.div>
  );
};

export default Score;
