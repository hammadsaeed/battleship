import { motion } from "framer-motion";
import { shipTypes } from "../../constants";
import { SHIP, TILETYPE } from "../../types/index.d";
import Cross from "../Tile/cross";
import { SHIPIMAGES } from "./constants";

interface ShipDetails {
  ship: SHIP;
  available: number;
}

const ShipDetails = (props: ShipDetails) => {
  const { ship, available } = props;
  const { size, count } = shipTypes[ship];

  return (
    <div style={{ width: "50%", position: "relative" }} key={ship}>
      <motion.img
        src={SHIPIMAGES[ship]}
        style={{ width: "100%" }}
        alt={`ship-${ship}`}
      />
      {[...new Array(size).fill(1)].map((_x, i) => {
        if (available < i + 1) {
          return <Cross type={TILETYPE.HIT} key={`${ship}-${i}`} />;
        }
        return <Cross type={TILETYPE.MISS} key={`${ship}-${i}`} />;
      })}
    </div>
  );
};

export default ShipDetails;
