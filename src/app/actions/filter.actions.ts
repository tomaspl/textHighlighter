import { Action } from "@ngrx/store";

export class ChangeColour implements Action {
  readonly type = "ChangeColour";
  constructor(public payload: string) {}
}

export class ChangeFilter implements Action {
  readonly type = "ChangeFilter";
  constructor(public payload: string) {}
}

// Union the valid types
export type ColourActions = ChangeColour | ChangeFilter;
