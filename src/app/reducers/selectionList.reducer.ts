export const initialState = [];

export function selectionList(state = initialState, action): any {
  switch (action.type) {
    case "AddSelection":
      state.push(action.payload);
    default:
      return state;
  }
}
