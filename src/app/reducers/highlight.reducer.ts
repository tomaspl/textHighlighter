import { HighlightState } from "../models/models";

export const initialState: HighlightState = {
  colourToHighlight: "",
  colourToFilterHighlights: "",
  selectionList: [],
  filteredSelectionList: []
};
export function reducer(state = initialState, action): any {
  switch (action.type) {
    case "ChangeColour":
      return { ...state, colourToHighlight: action.payload };
    case "ChangeFilter":
      return { ...state, colourToFilterHighlights: action.payload };
    case "AddSelection":
      return {
        ...state,
        selectionList: [...state.selectionList, action.payload]
      };
    case "FilterSelection":
      return {
        ...state,
        filteredSelectionList: state.selectionList.filter(
          elem => elem.colourText === action.payload
        )
      };
    default:
      return state;
  }
}
