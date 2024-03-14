import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IFilter {
  filter: string[];
}

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filter: [],
  } as IFilter,
  reducers: {
    setFilter: (state, { payload }: PayloadAction<any>) => {
      state.filter = payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
