export const initialState = "";
export function colour(state = initialState, action): any {
  switch (action.type) {
    case "ChangeColour":
      return action.payload;
    default:
      return state;
  }
}

export function filterColour(state = initialState, action): any {
  switch (action.type) {
    case "ChangeFilter":
      return action.payload;
    default:
      return state;
  }
}
