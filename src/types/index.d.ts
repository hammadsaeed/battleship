export enum SHIP {
  CARRIER = "carrier",
  BATTLESHIP = "battleship",
  CRUISER = "cruiser",
  SUBMARINE = "submarine",
  DESTROYER = "destroyer",
}

export enum STATUS {
  START = "start",
  INGAME = "inGame",
  ENDGAME = "endGame",
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

export type Score = {
  player1: number;
  player2: number;
};

export type PositionMap = Record<string, SHIP>;
