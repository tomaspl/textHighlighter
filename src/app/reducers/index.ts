import { ActionReducerMap } from "@ngrx/store";

import * as filterReducer from "./filter.reducer";

export const reducers: ActionReducerMap<any> = {
  colour: filterReducer.colour,
  filterColour: filterReducer.filterColour
};
