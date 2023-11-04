import { TILE, TILETYPE } from "../types/index.d";

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
