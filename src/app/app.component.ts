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
  constructor(private store: Store<{ state: { colour: string } }>) {}
  ngOnInit() {
    this.store.select("state", "colour").subscribe(colour => {
      this.selectedColour = colour;
    });
  }
  selectedColor(colour) {
    this.store.dispatch(new colourActions.ChangeColour(colour));
  }
}
