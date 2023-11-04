export enum SHIP {
  CARRIER = "carrier",
  BATTLESHIP = "battleship",
  CRUISER = "cruiser",
  SUBMARINE = "submarine",
  DESTROYER = "destroyer",
}

export type ShipType = {
  size: number;
  count: number;
};

export enum TILETYPE {
  HIT = "hit",
  MISS = "miss",
  EMPTY = "empty",
}

export type TILE = {
  type: TILETYPE;
  x: number;
  y: number;
};

export type Position = [number, number];

export type ShipPosition = {
  ship: SHIP;
  positions: Position[];
};

export type PositionMap = Record<string, SHIP>;
