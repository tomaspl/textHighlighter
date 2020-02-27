import { Action } from "@ngrx/store";

export class ChangeColour implements Action {
  readonly type = "ChangeColour";
  constructor(public payload: string) {}
}

// Union the valid types
export type ColourActions = ChangeColour;
