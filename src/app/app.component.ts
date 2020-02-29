import { DomSanitizer } from "@angular/platform-browser";
import { Component, ViewEncapsulation } from "@angular/core";
import { Store } from "@ngrx/store";
import * as colourActions from "./actions/filter.actions";
import { ElementArrayFinder } from "protractor";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = "Text Highlighter";
  selectedColour: any;
  listHighlightByColour: any;
  filterColour: any;
  userText: any;
  constructor(
    private store: Store<{
      state: any;
    }>,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit() {
    this.store.select("state").subscribe(state => {
      this.selectedColour = state.colourToHighlight;
      this.listHighlightByColour = this.sanitizer.bypassSecurityTrustHtml(
        this.mapFilteredHighlights(state.filteredSelectionList)
      );
      if (this.filterColour !== state.colourToFilterHighlights) {
        this.filterColour = state.colourToFilterHighlights;
        this.store.dispatch(
          new colourActions.FilterTextSelection(state.colourToFilterHighlights)
        );
      }
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
  }

  highlightText($event) {
    this.userText = this.sanitizer.bypassSecurityTrustHtml($event.htmlText);
    this.store.dispatch(
      new colourActions.AddedTextSelection({
        colourText: this.selectedColour,
        text: $event.storeText
      })
    );
  }

  mapFilteredHighlights(list) {
    let listString = "";
    list.forEach(element => {
      listString +=
        '<mark style="background:' +
        element.colourText +
        '">' +
        element.text +
        "</mark><br/>";
    });

    return listString;
  }
}
