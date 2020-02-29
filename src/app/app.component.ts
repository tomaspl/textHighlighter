import { DomSanitizer } from "@angular/platform-browser";
import { Component, ViewEncapsulation } from "@angular/core";
import { Store } from "@ngrx/store";
import * as colourActions from "./actions/filter.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = "Text Highlighter";
  selectedColour: any;
  filterColour: any;
  userText: any;
  constructor(
    private store: Store<{
      colourToHighlight: string;
      colourToFilterHighlights: string;
    }>,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit() {
    this.store.select("colourToHighlight").subscribe(colour => {
      this.selectedColour = colour;
    });

    this.store.select("colourToFilterHighlights").subscribe(colour => {
      this.filterColour = colour;
    });
    this.userText = this.sanitizer.bypassSecurityTrustHtml(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempor."
    );
  }
  selectedColor(colour) {
    this.store.dispatch(new colourActions.ChangeColour(colour));
  }
  selectedFilter(colour) {
    this.store.dispatch(new colourActions.ChangeFilter(colour));
    this.store.dispatch(new colourActions.FilterTextSelection(colour));
  }

  highlightText($event) {
    this.userText = this.sanitizer.bypassSecurityTrustHtml($event.htmlText);
    this.store.dispatch(
      new colourActions.AddedTextSelection({
        colourText: $event.colourText,
        text: $event.storeText
      })
    );
  }
}
