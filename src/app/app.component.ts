import { BrowserModule, DomSanitizer } from "@angular/platform-browser";
import {
  Component,
  ViewChild,
  ElementRef,
  ViewEncapsulation
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as colourActions from "./actions/filter.actions";
import { SelectedTextDirective } from "./directives/selected-text.directive";

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
  text_test: any;
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
    this.text_test = this.sanitizer.bypassSecurityTrustHtml(
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
    this.text_test = this.sanitizer.bypassSecurityTrustHtml($event);
  }
}
