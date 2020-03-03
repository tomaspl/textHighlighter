import { Component, ViewEncapsulation, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import * as colourActions from "./actions/filter.actions";
import { Subscription } from "rxjs";
import {
  HighlightState,
  ColourSelection,
  ColourConfiguration
} from "./models/models";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnDestroy {
  public listFilteredByHighlightColour: Array<ColourSelection>;
  public listenerFilteredHighlightByColour: Subscription;
  public coloursForHighlight: Array<ColourConfiguration> = [
    { colour: "red", caption: "Red" },
    { colour: "yellow", caption: "Yellow" },
    { colour: "green", caption: "Green" }
  ];
  constructor(private store: Store<{ state: HighlightState }>) {}

  ngOnInit() {
    this.listenerFilteredHighlightByColour = this.store
      .select(store => store.state.filteredSelectionList)
      .subscribe(filteredSelectionList => {
        if (filteredSelectionList) {
          this.listFilteredByHighlightColour = filteredSelectionList;
        }
      });
  }

  ngOnDestroy() {
    this.listenerFilteredHighlightByColour.unsubscribe();
  }

  public addedHighlightSelection($event) {
    this.store.dispatch(
      new colourActions.AddedTextSelection({
        colourText: $event.colourText,
        text: $event.text
      })
    );
  }

  public filterByColour(colourToFilterHighlights) {
    this.store.dispatch(
      new colourActions.FilterTextSelection(colourToFilterHighlights)
    );
  }
}
