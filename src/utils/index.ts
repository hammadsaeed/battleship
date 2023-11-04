import { Position, ShipPosition, TILE, TILETYPE } from "../types/index.d";

export const createEmptyGrid = (rows: number, columns: number) => {
  const grid: TILE[][] = [];

  for (let x = 0; x < rows; x++) {
    const row: TILE[] = [];
    for (let y = 0; y < columns; y++) {
      const tile: TILE = {
        type: TILETYPE.EMPTY,
        x,
        y,
      };
      row.push(tile);
    }
    grid.push(row);
  }

  return grid;
};

export const isHit = (position: Position, data: ShipPosition[]): boolean => {
  return data.some((shipData) => {
    return shipData.positions.find(
      (shipPosition) =>
        shipPosition[0] === position[0] && shipPosition[1] === position[1]
    );
  });
};
