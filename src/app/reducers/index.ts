import { ActionReducerMap } from "@ngrx/store";

import * as highlightReducer from "./highlight.reducer";
import * as groupHighlightsReducer from "./groupHighlights.reducer";

export const reducers: ActionReducerMap<any> = {
  colourToHighlight: highlightReducer.colour,
  colourToFilterHighlights: groupHighlightsReducer.filterColour
};
