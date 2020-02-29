export const initialState = "";
export function colour(state = initialState, action): any {
  switch (action.type) {
    case "ChangeColour":
      return action.payload;
    default:
      return state;
  }
}
