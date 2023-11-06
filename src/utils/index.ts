import { DEFAULT_COLUMNS, shipTypes } from "../constants";
import { Position, ShipPosition, TILE, TILETYPE, SHIP } from "../types/index.d";

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

const generateRandomPosition = (): Position => {
  const x = Math.floor(Math.random() * DEFAULT_COLUMNS);
  const y = Math.floor(Math.random() * DEFAULT_COLUMNS);
  return [x, y];
};

const isOverlap = (positions: Position[], existingPositions: Set<string>) => {
  for (const [x, y] of positions) {
    if (
      x < 0 ||
      x >= DEFAULT_COLUMNS ||
      y < 0 ||
      y >= DEFAULT_COLUMNS ||
      existingPositions.has(`${x}-${y}`)
    ) {
      return true;
    }
  }
  return false;
};

export const generateRandomData = (): {
  ship: SHIP;
  positions: Position[];
}[] => {
  const mockData: { ship: SHIP; positions: Position[] }[] = [];
  const usedPositions: Set<string> = new Set();

  for (const ship of Object.keys(shipTypes) as SHIP[]) {
    const { size, count } = shipTypes[ship];

    for (let i = 0; i < count; i++) {
      let positions: Position[];
      do {
        positions = [];
        const isVertical = Math.random() < 0.5;
        const [x, y] = generateRandomPosition();

        for (let j = 0; j < size; j++) {
          positions.push(isVertical ? [x, y + j] : [x + j, y]);
        }
      } while (isOverlap(positions, usedPositions));

      positions.forEach(([x, y]) => usedPositions.add(`${x}-${y}`));
      mockData.push({ ship, positions });
    }
  }

  return mockData;
};
