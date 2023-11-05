import { motion } from "framer-motion";
import { shipTypes } from "../../constants";
import { SHIP } from "../../types/index.d";
import { SHIPIMAGES } from "./constants";
import styles from "./index.module.scss";

import hit from "../../assets/Hit-small.png";
import empty from "../../assets/Miss-small.png";

interface IShipDetails {
  ship: SHIP;
  available: number;
}

const ShipDetails = (props: IShipDetails) => {
  const { ship, available } = props;
  const { size } = shipTypes[ship];

  return (
    <div className={styles.shipContainer} key={ship}>
      <motion.img
        className={styles.shipImg}
        src={SHIPIMAGES[ship]}
        alt={`ship-${ship}`}
      />
      <div className={styles.countContainer}>
        {[...new Array(size).fill(1)].map((_x, i) => {
          if (available < i + 1) {
            return <motion.img src={hit} alt="hit" key={`${ship}-${i}`} />;
          }
          return (
            <motion.img src={empty} alt="empty-hit" key={`${ship}-${i}`} />
          );
        })}
      </div>
    </div>
  );
};

export default ShipDetails;
