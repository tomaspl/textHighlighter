import { Action } from "@ngrx/store";
interface colourSelection {
  colourText: string;
  text: string;
}
export class ChangeColour implements Action {
  readonly type = "ChangeColour";
  constructor(public payload: string) {}
}

export class ChangeFilter implements Action {
  readonly type = "ChangeFilter";
  constructor(public payload: string) {}
}

export class AddedTextSelection implements Action {
  readonly type = "AddSelection";
  constructor(public payload: colourSelection) {}
}

export class FilterTextSelection implements Action {
  readonly type = "FilterSelection";
  constructor(public payload: string) {}
}

// Union the valid types
export type ColourActions =
  | ChangeColour
  | ChangeFilter
  | AddedTextSelection
  | FilterTextSelection;
