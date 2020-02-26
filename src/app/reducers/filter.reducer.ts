//import { createReducer, on } from "@ngrx/store";
import { ColourActions } from "../actions/filter.actions";

export interface ColourState {
  colour: string;
}

export const initialState = {};

export const initialStateApp = {
  state: {
    colour: ""
  }
};

export function colour(state = initialState, action: ColourActions): any {
  switch (action.type) {
    case "ChangeColour":
      return action.payload;
  }
}
