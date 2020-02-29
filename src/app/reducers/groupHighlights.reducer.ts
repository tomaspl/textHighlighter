export const initialState = "";

export function filterColour(state = initialState, action): any {
  switch (action.type) {
    case "ChangeFilter":
      return action.payload;
    default:
      return state;
  }
}
