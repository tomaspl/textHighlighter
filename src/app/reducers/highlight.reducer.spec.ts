import {
  ChangeColour,
  ChangeFilter,
  AddedTextSelection,
  FilterTextSelection
} from "../actions/filter.actions";
import { reducer, initialState } from "./highlight.reducer";

describe("Highlight Reducer", () => {
  describe("ChangeColour", () => {
    it("should update colourToHighlight state", () => {
      const action = new ChangeColour("red");
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        colourToHighlight: action.payload
      });
    });
  });

  describe("ChangeFilter", () => {
    it("should update colourToFilterHighlights state", () => {
      const action = new ChangeFilter("red");
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        colourToFilterHighlights: action.payload
      });
    });
  });

  describe("AddedTextSelection", () => {
    it("should update colourToFilterHighlights state", () => {
      const action = new AddedTextSelection({
        text: "test",
        colourText: "red"
      });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        selectionList: [action.payload]
      });
    });
  });

  describe("AddedTextSelection", () => {
    it("should update filteredSelectionList state", () => {
      const prevState = {
        colourToHighlight: "",
        colourToFilterHighlights: "",
        selectionList: [
          {
            text: "test1",
            colourText: "red"
          },
          {
            text: "test2",
            colourText: "green"
          },
          {
            text: "test3",
            colourText: "red"
          }
        ],
        filteredSelectionList: []
      };
      const action = new FilterTextSelection("red");
      const result = reducer(prevState, action);

      expect(result).toEqual({
        ...prevState,
        filteredSelectionList: [
          {
            text: "test1",
            colourText: "red"
          },
          {
            text: "test3",
            colourText: "red"
          }
        ]
      });
    });
  });

  describe("Default case", () => {
    it("should return same state when no match with any case of reducer", () => {
      const result = reducer(initialState, { type: "" });
      expect(result).toEqual({
        ...initialState
      });
    });
  });
});
