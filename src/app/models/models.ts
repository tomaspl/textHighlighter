export interface HighlightState {
  colourToHighlight: string;
  colourToFilterHighlights: string;
  selectionList: Array<ColourSelection>;
  filteredSelectionList: Array<ColourSelection>;
}

export interface ColourConfiguration {
  colour: string;
  caption: string;
}

export interface ColourSelection {
  colourText: string;
  text: string;
  htmlText?: string;
}
