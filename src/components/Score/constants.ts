import { Position, PositionMap, SHIP, TILETYPE } from "../../types/index.d";

import carrier from "../../assets/Aircraft-Shape.png";
import battleship from "../../assets/Battleship-Shape.png";
import cruiser from "../../assets/Cruiser-Shape.png";
import submarine from "../../assets/Submarine-Shape.png";
import detroyer from "../../assets/Carrier-Shape.png";

export const SHIPIMAGES = {
  [SHIP.CARRIER]: carrier,
  [SHIP.BATTLESHIP]: battleship,
  [SHIP.CRUISER]: cruiser,
  [SHIP.SUBMARINE]: submarine,
  [SHIP.DESTROYER]: detroyer,
};
