import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as colourActions from "./actions/filter.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Text Highlighter";
  selectedColour: any;
  filterColour: any;
  constructor(private store: Store<{ colour: string; filterColour: string }>) {}
  ngOnInit() {
    this.store.select("colour").subscribe(colour => {
      this.selectedColour = colour;
    });

    this.store.select("filterColour").subscribe(colour => {
      this.filterColour = colour;
    });
  }
  selectedColor(colour) {
    this.store.dispatch(new colourActions.ChangeColour(colour));
  }
  selectedFilter(colour) {
    this.store.dispatch(new colourActions.ChangeFilter(colour));
  }
}
