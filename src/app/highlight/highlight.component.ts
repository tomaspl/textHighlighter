import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {
  Component,
  ViewEncapsulation,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges
} from "@angular/core";
import { Store } from "@ngrx/store";
import * as colourActions from "./../actions/filter.actions";
import {
  HighlightState,
  ColourSelection,
  ColourConfiguration
} from "../models/models";
@Component({
  selector: "app-highlight",
  templateUrl: "./highlight.component.html",
  styleUrls: ["./highlight.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class HighlightComponent implements OnInit, OnChanges {
  @Input() coloursForHighlight: Array<ColourConfiguration>;
  @Input() listFilteredByHighlightColour: Array<ColourSelection>;
  @Output() addedHighlightSelection = new EventEmitter<ColourSelection>();
  @Output() filterByColour = new EventEmitter<string>();

  selectedColour: string;
  listHighlightByColour: any;
  userText: SafeHtml;
  constructor(
    private store: Store<{ state: HighlightState }>,
    private sanitizer: DomSanitizer
  ) {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.listFilteredByHighlightColour.currentValue) {
      this.listHighlightByColour = this.sanitizer.bypassSecurityTrustHtml(
        this.mapFilteredHighlights(
          simpleChanges.listFilteredByHighlightColour.currentValue
        )
      );
    }
  }

  ngOnInit() {
    document.addEventListener("dragstart", function(event) {
      event.preventDefault();
    });
  }

  onDragOver($event) {
    $event.preventDefault();
  }

  onDragLeave($event) {
    $event.preventDefault();
  }

  selectColor(colour) {
    this.selectedColour = colour;
  }
  selectedFilter(colour) {
    this.filterByColour.emit(colour);
  }

  highlightText($event) {
    this.userText = this.sanitizer.bypassSecurityTrustHtml($event.htmlText);
    this.addedHighlightSelection.emit({
      colourText: this.selectedColour,
      text: $event.storeText,
      htmlText: $event.htmlText
    });
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
