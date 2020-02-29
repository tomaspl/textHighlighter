import { ActionReducerMap } from "@ngrx/store";
import * as highlightReducer from "./highlight.reducer";

export const reducers: ActionReducerMap<any> = {
  state: highlightReducer.reducer
};
