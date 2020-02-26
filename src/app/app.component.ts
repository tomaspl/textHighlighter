import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import * as colourActions from "./actions/filter.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Text Highlighter";
  constructor(private store: Store<any>) {}

  selectedColor(colour) {
    const test = new colourActions.ChangeColour(colour);
    this.store.dispatch(test);
  }
}
