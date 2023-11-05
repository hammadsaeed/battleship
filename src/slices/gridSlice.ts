import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_COLUMNS, DEFAULT_ROWS, mockData } from "../constants";
import { RootState } from "../store";
import {
  PositionMap,
  ShipPosition,
  STATUS,
  TILE,
  TILETYPE,
} from "../types/index.d";
import { createEmptyGrid } from "../utils";

export interface CounterState {
  status: STATUS;
  tiles: TILE[][];
  shipPositions: ShipPosition[];
  positionMap: PositionMap;
}

const initialState: CounterState = {
  status: STATUS.START,
  tiles: createEmptyGrid(DEFAULT_ROWS, DEFAULT_COLUMNS),
  shipPositions: mockData as ShipPosition[],
  positionMap: {} as PositionMap,
};

export const gridReducer = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setPositions: (state, action: PayloadAction<PositionMap>) => {
      state.positionMap = action.payload;
    },
    setStatus: (state, action: PayloadAction<STATUS>) => {
      state.status = action.payload;
    },
    resetGrid: (state) => {
      state.tiles = createEmptyGrid(DEFAULT_ROWS, DEFAULT_COLUMNS);
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

export const { setPositions, updateTile, setStatus, resetGrid } =
  gridReducer.actions;

export const selectGrid = (state: RootState) => state.grid.tiles;
export const selectShipPositions = (state: RootState) =>
  state.grid.shipPositions;
export const setectStatus = (state: RootState) => state.grid.status;

export default gridReducer.reducer;
