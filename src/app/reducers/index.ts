import { ActionReducerMap } from "@ngrx/store";

import * as selectionListReducer from "./selectionList.reducer";
import * as highlightReducer from "./highlight.reducer";
import * as groupHighlightsReducer from "./groupHighlights.reducer";

export const reducers: ActionReducerMap<any> = {
  colourToHighlight: highlightReducer.colour,
  selectionList: selectionListReducer.selectionList,
  colourToFilterHighlights: groupHighlightsReducer.filterColour
};
