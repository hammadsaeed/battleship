import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_COLUMNS, DEFAULT_ROWS } from "../constants";
import { RootState } from "../store";
import { TILE } from "../types";
import { createEmptyGrid } from "../utils";

export interface CounterState {
  moves: number;
  status: "idle" | "loading" | "failed";
  data: TILE[][];
}

const initialState: CounterState = {
  moves: 0,
  status: "idle",
  data: createEmptyGrid(DEFAULT_ROWS, DEFAULT_COLUMNS),
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
      state.data = createEmptyGrid(DEFAULT_ROWS, DEFAULT_COLUMNS);
    },
    updateGrid: (state, action: PayloadAction<number[]>) => {
      console.log(action.payload);
    },
  },
});

export const { incrementMoves, incrementByAmount, createNewGrid, updateGrid } =
  gridReducer.actions;

export const selectMoves = (state: RootState) => state.grid.moves;
export const selectGrid = (state: RootState) => state.grid.data;

export default gridReducer.reducer;
