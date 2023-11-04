import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_COLUMNS, DEFAULT_ROWS, mockData } from "../constants";
import { RootState } from "../store";
import { Position, PositionMap, ShipPosition, TILE, TILETYPE } from "../types";
import { createEmptyGrid, isHit } from "../utils";

export interface CounterState {
  moves: number;
  status: "idle" | "loading" | "failed";
  tiles: TILE[][];
  shipPositions: ShipPosition[];
  positionMap: PositionMap;
}

const initialState: CounterState = {
  moves: 0,
  status: "idle",
  tiles: createEmptyGrid(DEFAULT_ROWS, DEFAULT_COLUMNS),
  shipPositions: mockData as ShipPosition[],
  positionMap: {} as PositionMap,
};

export const gridReducer = createSlice({
  name: "grid",
  initialState,
  reducers: {
    incrementMoves: (state, action: PayloadAction<number[]>) => {
      state.moves += 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.moves += action.payload;
    },
    createNewGrid: (state) => {
      state.tiles = createEmptyGrid(DEFAULT_ROWS, DEFAULT_COLUMNS);
    },
    setPositions: (state, action: PayloadAction<PositionMap>) => {
      state.positionMap = action.payload;
    },
    updateTile: (
      state,
      action: PayloadAction<{ row: number; column: number; value: TILETYPE }>
    ) => {
      const { row, column, value } = action.payload;
      state.tiles[row][column].type = value;
    },
  },
});

export const {
  incrementMoves,
  incrementByAmount,
  createNewGrid,
  setPositions,
  updateTile,
} = gridReducer.actions;

export const selectMoves = (state: RootState) => state.grid.moves;
export const selectGrid = (state: RootState) => state.grid.tiles;
export const selectShipPositions = (state: RootState) =>
  state.grid.shipPositions;

export default gridReducer.reducer;
